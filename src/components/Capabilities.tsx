import { motion } from 'framer-motion'
import { useState } from 'react'
import { FileText, Layers, TrendingUp, Eye, Zap, Users } from 'lucide-react'

const capabilities = [
  {
    icon: FileText,
    title: 'Multi-Format Resume Parsing',
    description: 'Handles PDF, DOCX, and plain text resumes. Extracts skills, work history, education, certifications, and projects into structured JSON.',
    color: 'accent-blue',
  },
  {
    icon: Layers,
    title: 'Semantic Embedding Engine',
    description: 'Uses transformer-based models to create dense vector representations, enabling contextual understanding beyond surface-level keywords.',
    color: 'accent-indigo',
  },
  {
    icon: TrendingUp,
    title: 'Contextual Scoring Algorithm',
    description: 'Computes cosine similarity between resume and job description embeddings, weighted by role priority factors.',
    color: 'accent-purple',
  },
  {
    icon: Eye,
    title: 'Bias & Fairness Auditing',
    description: 'Detects gendered language, age-related bias, and other exclusionary patterns in job descriptions and evaluation criteria.',
    color: 'accent-emerald',
  },
  {
    icon: Zap,
    title: 'Resume Improvement Suggestions',
    description: 'Provides AI-driven recommendations for candidates to optimize their resumes for specific roles and industries.',
    color: 'accent-orange',
  },
  {
    icon: Users,
    title: 'Batch Processing & Analytics',
    description: 'Process hundreds of resumes simultaneously with detailed analytics dashboards and exportable ranking reports.',
    color: 'accent-teal',
  },
]

export function Capabilities() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="capabilities" className="relative py-24 bg-background">
      <div className="absolute inset-0 mesh-gradient" />
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent-purple/10 text-accent-purple px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            Technical Capabilities
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-foreground">
            Built for <span className="gradient-text">Enterprise Scale</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Production-ready AI capabilities powered by state-of-the-art NLP and machine learning infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative bg-card rounded-2xl clean-border p-8 gentle-animation cursor-default ${
                hoveredIndex === i ? 'card-shadow -translate-y-1' : ''
              }`}
            >
              {/* Top accent line */}
              <div className={`absolute top-0 left-8 right-8 h-0.5 rounded-full bg-${cap.color} gentle-animation ${
                hoveredIndex === i ? 'opacity-100' : 'opacity-0'
              }`} />
              
              <div className={`w-12 h-12 rounded-xl bg-${cap.color}/10 flex items-center justify-center mb-5`}>
                <cap.icon className={`w-6 h-6 text-${cap.color}`} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">{cap.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{cap.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
