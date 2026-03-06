import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, Loader2, CheckCircle2, XCircle, Lightbulb, Award, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'

interface AnalysisResult {
  overallScore: number
  summary: string
  advantages: { point: string; detail: string }[]
  disadvantages: { point: string; detail: string }[]
  improvements: { point: string; detail: string }[]
  skillsDetected: string[]
  experienceLevel: string
}

export function ResumeScanner() {
  const [resumeText, setResumeText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [expandedSection, setExpandedSection] = useState<string | null>('advantages')

  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      setUploadedFile(file)
      setResumeText('')
      toast.success(`PDF loaded: ${file.name}`)
    } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      const text = await file.text()
      setResumeText(text)
      setUploadedFile(null)
      toast.success('Resume text loaded!')
    } else {
      toast.error('Please upload a PDF or .txt file.')
    }
  }, [])

  const analyzeResume = useCallback(async () => {
    if (!uploadedFile && resumeText.trim().length < 20) {
      toast.error('Please upload a PDF or enter at least 20 characters of resume content.')
      return
    }

    setIsAnalyzing(true)
    setResult(null)

    try {
      let invokeOptions: any;

      if (uploadedFile) {
        const formData = new FormData()
        formData.append('file', uploadedFile)
        invokeOptions = { body: formData }
      } else {
        invokeOptions = { body: { resumeText: resumeText.trim() } }
      }

      const { data, error } = await supabase.functions.invoke('analyze-resume', invokeOptions)

      if (error) {
        throw new Error(error.message || 'Analysis failed')
      }

      if (data?.error) {
        throw new Error(data.error)
      }

      setResult(data as AnalysisResult)
      toast.success('Resume analysis complete!')
    } catch (err: any) {
      console.error('Analysis error:', err)
      toast.error(err.message || 'Failed to analyze resume. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }, [resumeText, uploadedFile])

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-accent-emerald'
    if (score >= 60) return 'text-accent-orange'
    return 'text-destructive'
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-accent-emerald'
    if (score >= 60) return 'bg-accent-orange'
    return 'bg-destructive'
  }

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <section id="scanner" className="relative py-24 bg-secondary/30">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent-indigo/10 text-accent-indigo px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <FileText className="w-4 h-4" />
            AI Resume Scanner
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-foreground">
            Scan Your <span className="gradient-text">Resume Now</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Paste your resume text below and get instant AI-powered analysis with scores, strengths, weaknesses, and improvement suggestions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Input Area */}
          <div className="bg-card rounded-2xl clean-border card-shadow p-8 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground">Resume Content</h3>
              <label className="flex items-center gap-2 text-sm text-accent-indigo font-medium cursor-pointer hover:opacity-80 gentle-animation">
                <Upload className="w-4 h-4" />
                Upload PDF / TXT
                <input type="file" accept=".pdf,.txt" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>

            {uploadedFile ? (
              <div className="w-full h-64 bg-secondary/50 rounded-xl p-4 border border-accent-indigo/30 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 bg-accent-indigo/10 rounded-2xl flex items-center justify-center">
                  <FileText className="w-8 h-8 text-accent-indigo" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground">{uploadedFile.name}</p>
                  <p className="text-sm text-muted-foreground">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
                </div>
                <button
                  onClick={() => setUploadedFile(null)}
                  className="text-sm text-destructive hover:underline cursor-pointer"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume text here, or upload a PDF above...&#10;&#10;Example:&#10;John Doe&#10;Software Engineer&#10;5 years experience in Python, React, AWS...&#10;Education: B.S. Computer Science..."
                className="w-full h-64 bg-secondary/50 rounded-xl p-4 text-foreground placeholder:text-muted-foreground/50 border border-border focus:border-accent-indigo focus:ring-1 focus:ring-accent-indigo/20 outline-none resize-none font-mono text-sm leading-relaxed gentle-animation"
              />
            )}

            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-muted-foreground">
                {uploadedFile ? `PDF ready: ${uploadedFile.name}` : `${resumeText.length} characters`}
              </span>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={analyzeResume}
                disabled={isAnalyzing || (!uploadedFile && resumeText.trim().length < 20)}
                className="gradient-bg text-primary-foreground font-semibold px-8 py-3 rounded-xl hover:opacity-90 gentle-animation cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    Analyze Resume
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Results */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Score Card */}
                <div className="bg-card rounded-2xl clean-border card-shadow p-8">
                  <div className="flex flex-col sm:flex-row items-center gap-8">
                    {/* Score Circle */}
                    <div className="relative w-36 h-36 flex-shrink-0">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="8" className="text-secondary" />
                        <circle
                          cx="60" cy="60" r="52" fill="none"
                          strokeWidth="8"
                          strokeLinecap="round"
                          className={getScoreBg(result.overallScore)}
                          stroke="currentColor"
                          strokeDasharray={`${(result.overallScore / 100) * 327} 327`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-4xl font-extrabold ${getScoreColor(result.overallScore)}`}>
                          {result.overallScore}
                        </span>
                        <span className="text-xs text-muted-foreground font-medium">/ 100</span>
                      </div>
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex items-center gap-3 justify-center sm:justify-start mb-2">
                        <Award className="w-5 h-5 text-accent-indigo" />
                        <span className="text-sm font-semibold bg-accent-indigo/10 text-accent-indigo px-3 py-1 rounded-full">
                          {result.experienceLevel}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">Overall Resume Score</h3>
                      <p className="text-muted-foreground leading-relaxed">{result.summary}</p>
                    </div>
                  </div>

                  {/* Skills */}
                  {result.skillsDetected?.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <h4 className="text-sm font-semibold text-muted-foreground mb-3">Skills Detected</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.skillsDetected.map((skill) => (
                          <span key={skill} className="text-xs bg-accent-indigo/10 text-accent-indigo px-3 py-1.5 rounded-lg font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Advantages */}
                <div className="bg-card rounded-2xl clean-border overflow-hidden">
                  <button
                    onClick={() => toggleSection('advantages')}
                    className="w-full flex items-center justify-between p-6 hover:bg-secondary/30 gentle-animation cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent-emerald/10 rounded-xl flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-accent-emerald" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-bold text-foreground">Advantages</h3>
                        <p className="text-sm text-muted-foreground">{result.advantages?.length || 0} strengths found</p>
                      </div>
                    </div>
                    {expandedSection === 'advantages' ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                  </button>
                  <AnimatePresence>
                    {expandedSection === 'advantages' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 space-y-3">
                          {result.advantages?.map((adv, i) => (
                            <div key={i} className="bg-accent-emerald/5 border border-accent-emerald/10 rounded-xl p-4">
                              <h4 className="font-semibold text-foreground mb-1">{adv.point}</h4>
                              <p className="text-sm text-muted-foreground">{adv.detail}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Disadvantages */}
                <div className="bg-card rounded-2xl clean-border overflow-hidden">
                  <button
                    onClick={() => toggleSection('disadvantages')}
                    className="w-full flex items-center justify-between p-6 hover:bg-secondary/30 gentle-animation cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-destructive/10 rounded-xl flex items-center justify-center">
                        <XCircle className="w-5 h-5 text-destructive" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-bold text-foreground">Disadvantages</h3>
                        <p className="text-sm text-muted-foreground">{result.disadvantages?.length || 0} areas of concern</p>
                      </div>
                    </div>
                    {expandedSection === 'disadvantages' ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                  </button>
                  <AnimatePresence>
                    {expandedSection === 'disadvantages' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 space-y-3">
                          {result.disadvantages?.map((dis, i) => (
                            <div key={i} className="bg-destructive/5 border border-destructive/10 rounded-xl p-4">
                              <h4 className="font-semibold text-foreground mb-1">{dis.point}</h4>
                              <p className="text-sm text-muted-foreground">{dis.detail}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Improvements */}
                <div className="bg-card rounded-2xl clean-border overflow-hidden">
                  <button
                    onClick={() => toggleSection('improvements')}
                    className="w-full flex items-center justify-between p-6 hover:bg-secondary/30 gentle-animation cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent-orange/10 rounded-xl flex items-center justify-center">
                        <Lightbulb className="w-5 h-5 text-accent-orange" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-bold text-foreground">Improvements</h3>
                        <p className="text-sm text-muted-foreground">{result.improvements?.length || 0} suggestions</p>
                      </div>
                    </div>
                    {expandedSection === 'improvements' ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                  </button>
                  <AnimatePresence>
                    {expandedSection === 'improvements' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 space-y-3">
                          {result.improvements?.map((imp, i) => (
                            <div key={i} className="bg-accent-orange/5 border border-accent-orange/10 rounded-xl p-4">
                              <h4 className="font-semibold text-foreground mb-1">{imp.point}</h4>
                              <p className="text-sm text-muted-foreground">{imp.detail}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
