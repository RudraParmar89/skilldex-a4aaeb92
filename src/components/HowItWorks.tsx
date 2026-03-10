import { motion } from 'framer-motion'
import { Upload, Cpu, ListOrdered, CheckCircle2 } from 'lucide-react'
import { BlurReveal, GradientBorder, TextShimmer } from './reactbits'

const steps = [
  {
    icon: Upload,
    number: '01',
    title: 'Upload Resumes & Job Description',
    description: 'Upload candidate resumes in any format (PDF, DOCX) along with the target job description.',
    color: 'bg-accent-blue',
  },
  {
    icon: Cpu,
    number: '02',
    title: 'AI Parses & Embeds',
    description: 'NLP extracts structured data from resumes and converts both documents into semantic vector embeddings.',
    color: 'bg-accent-indigo',
  },
  {
    icon: ListOrdered,
    number: '03',
    title: 'Score & Rank Candidates',
    description: 'Contextual similarity scores are computed, and candidates are ranked by overall relevance to the role.',
    color: 'bg-accent-purple',
  },
  {
    icon: CheckCircle2,
    number: '04',
    title: 'Review & Take Action',
    description: 'Explore rankings, skill gaps, AI suggestions, and generated interview questions for each candidate.',
    color: 'bg-accent-emerald',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 bg-secondary/30">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <BlurReveal>
            <div className="inline-flex items-center gap-2 bg-accent-emerald/10 text-accent-emerald px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              How It Works
            </div>
          </BlurReveal>
          <BlurReveal delay={0.1}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-foreground">
              From Upload to{' '}
              <TextShimmer className="text-4xl sm:text-5xl lg:text-6xl font-extrabold" duration={5}>
                Insight
              </TextShimmer>
            </h2>
          </BlurReveal>
          <BlurReveal delay={0.2}>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Four simple steps to transform your hiring pipeline with AI-driven intelligence.
            </p>
          </BlurReveal>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <GradientBorder animate borderWidth={1} className="h-full">
                  <div className="relative p-8 group">
                    {/* Step number */}
                    <div className={`absolute -top-4 -left-4 w-12 h-12 ${step.color} rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg z-10`}>
                      {step.number}
                    </div>
                    
                    <div className="pt-4">
                      <div className={`w-12 h-12 ${step.color}/10 rounded-xl flex items-center justify-center mb-4`}>
                        <step.icon className={`w-6 h-6`} style={{ color: `var(--${step.color.replace('bg-', '')})` }} />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>

                    {i < steps.length - 1 && i % 2 === 0 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-border" />
                    )}
                  </div>
                </GradientBorder>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
