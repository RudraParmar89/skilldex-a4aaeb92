import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function extractTextFromPdfBytes(bytes: Uint8Array): string {
  const decoder = new TextDecoder("latin1");
  const raw = decoder.decode(bytes);

  const textParts: string[] = [];

  // Extract text between BT and ET operators (text blocks)
  const btEtRegex = /BT\s([\s\S]*?)ET/g;
  let match;
  while ((match = btEtRegex.exec(raw)) !== null) {
    const block = match[1];
    // Extract strings in parentheses (literal strings)
    const parenRegex = /\(([^)]*)\)/g;
    let strMatch;
    while ((strMatch = parenRegex.exec(block)) !== null) {
      textParts.push(strMatch[1]);
    }
    // Extract hex strings
    const hexRegex = /<([0-9A-Fa-f]+)>/g;
    let hexMatch;
    while ((hexMatch = hexRegex.exec(block)) !== null) {
      const hex = hexMatch[1];
      let str = "";
      for (let i = 0; i < hex.length; i += 2) {
        const code = parseInt(hex.substring(i, i + 2), 16);
        if (code >= 32) str += String.fromCharCode(code);
      }
      if (str.trim()) textParts.push(str);
    }
  }

  // Clean up extracted text
  let text = textParts.join(" ");
  // Fix common PDF encoding issues
  text = text.replace(/\\n/g, "\n").replace(/\\r/g, "").replace(/\\\(/g, "(").replace(/\\\)/g, ")").replace(/\\\\/g, "\\");
  // Collapse excessive whitespace
  text = text.replace(/\s+/g, " ").trim();

  return text;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let resumeText = "";

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const text = formData.get("resumeText") as string | null;

      if (file) {
        if (file.type === "application/pdf") {
          const arrayBuffer = await file.arrayBuffer();
          const bytes = new Uint8Array(arrayBuffer);
          resumeText = extractTextFromPdfBytes(bytes);

          if (resumeText.trim().length < 20) {
            // Fallback: try to use AI to extract text from base64
            const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
            if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

            const base64 = btoa(String.fromCharCode(...bytes));
            const extractResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${LOVABLE_API_KEY}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model: "google/gemini-2.5-flash",
                messages: [
                  {
                    role: "user",
                    content: [
                      { type: "text", text: "Extract ALL text content from this PDF document. Return only the raw text, preserving structure where possible. No commentary." },
                      { type: "image_url", image_url: { url: `data:application/pdf;base64,${base64}` } },
                    ],
                  },
                ],
              }),
            });

            if (extractResponse.ok) {
              const extractData = await extractResponse.json();
              resumeText = extractData.choices?.[0]?.message?.content || "";
            }
          }
        } else if (file.type === "text/plain" || file.name.endsWith(".txt")) {
          resumeText = await file.text();
        } else {
          return new Response(
            JSON.stringify({ error: "Unsupported file type. Please upload a PDF or TXT file." }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      } else if (text) {
        resumeText = text;
      }
    } else {
      const body = await req.json();
      resumeText = body.resumeText || "";
    }

    if (!resumeText || typeof resumeText !== "string" || resumeText.trim().length < 20) {
      return new Response(
        JSON.stringify({ error: "Could not extract enough text from the file. Please try pasting your resume text directly." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are SkillDex, an expert AI Resume Analyst. Analyze the given resume text and return a JSON response with this exact structure. Do NOT include markdown code fences — return raw JSON only.

{
  "overallScore": <number 0-100>,
  "summary": "<1-2 sentence summary of the candidate>",
  "advantages": [
    { "point": "<strength title>", "detail": "<brief explanation>" }
  ],
  "disadvantages": [
    { "point": "<weakness title>", "detail": "<brief explanation>" }
  ],
  "improvements": [
    { "point": "<suggestion title>", "detail": "<actionable advice>" }
  ],
  "skillsDetected": ["<skill1>", "<skill2>", ...],
  "experienceLevel": "<Entry Level | Mid Level | Senior | Executive>"
}

Rules:
- Provide 3-5 items each for advantages, disadvantages, and improvements
- Be specific and constructive, not generic
- Score based on: content quality, structure, clarity, quantifiable achievements, skill relevance, formatting
- Detect all technical and soft skills mentioned
- Be honest but encouraging`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analyze this resume:\n\n${resumeText.substring(0, 8000)}` },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI analysis failed");
    }

    const data = await response.json();
    let content = data.choices?.[0]?.message?.content || "";

    content = content.replace(/```json\s*/gi, "").replace(/```\s*/gi, "").trim();

    let analysis;
    try {
      analysis = JSON.parse(content);
    } catch {
      console.error("Failed to parse AI response:", content);
      throw new Error("AI returned invalid format. Please try again.");
    }

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-resume error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
