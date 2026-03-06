import { motion } from 'framer-motion'
import { Brain, FileSearch, BarChart3, ShieldCheck, Lightbulb, MessageSquareText } from 'lucide-react'

const features = [
  {
    icon: FileSearch,
    title: 'Intelligent Resume Parsing',
    description: 'Extracts structured data — skills, experience, education, certifications — from any resume format using advanced NLP.',
    color: 'bg-accent-blue/10 text-accent-blue',
  },
  {
    icon: Brain,
    title: 'Semantic Similarity Matching',
    description: 'Converts resumes and job descriptions into semantic embeddings for deep contextual comparison beyond keywords.',
    color: 'bg-accent-indigo/10 text-accent-indigo',
  },
  {
    icon: BarChart3,
    title: 'Candidate Ranking Engine',
    description: 'Automatically scores and ranks candidates by relevance, giving recruiters a prioritized shortlist instantly.',
    color: 'bg-accent-emerald/10 text-accent-emerald',
  },
  {
    icon: Lightbulb,
    title: 'Skill Gap Analysis',
    description: 'Identifies missing skills and qualifications, helping both recruiters evaluate fit and candidates improve.',
    color: 'bg-accent-orange/10 text-accent-orange',
  },
  {
    icon: ShieldCheck,
    title: 'Bias Detection',
    description: 'Flags potential bias in job descriptions and screening criteria to promote fair, inclusive hiring practices.',
    color: 'bg-accent-purple/10 text-accent-purple',
  },
  {
    icon: MessageSquareText,
    title: 'Interview Question Generation',
    description: "AI generates role-specific interview questions based on the candidate's profile and identified gaps.",
    color: 'bg-accent-teal/10 text-accent-teal',
  },
]

export function Features() {
  return (
    <section id="features" className="relative py-24 bg-background">
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent-indigo/10 text-accent-indigo px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            Core Features
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-foreground">
            Smarter Screening,{' '}
            <span className="gradient-text">Better Hires</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            SkillDex combines NLP, semantic embeddings, and machine learning to transform how you evaluate candidates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-card rounded-2xl clean-border p-8 hover:card-shadow gentle-animation hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-5`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
