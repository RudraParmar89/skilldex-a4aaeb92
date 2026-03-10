import { motion } from 'framer-motion'
import { Clock, Target, TrendingDown, Scale } from 'lucide-react'
import { AnimatedCounter, BlurReveal, Particles } from './reactbits'

const stats = [
  { icon: Clock, value: 75, suffix: '%', label: 'Reduction in Screening Time', description: 'Automate hours of manual resume review with AI-powered analysis.' },
  { icon: Target, value: 95, suffix: '%', label: 'Matching Accuracy', description: 'Semantic similarity outperforms keyword matching in identifying qualified candidates.' },
  { icon: TrendingDown, value: 60, suffix: '%', label: 'Lower Cost-per-Hire', description: 'Streamlined screening reduces recruiter workload and accelerates decisions.' },
  { icon: Scale, value: 100, suffix: '%', label: 'Transparent Scoring', description: 'Every ranking is explainable with detailed skill breakdowns and gap analysis.' },
]

export function Stats() {
  return (
    <section id="stats" className="relative py-24 bg-foreground text-background overflow-hidden">
      {/* Particles background */}
      <Particles count={25} speed={0.15} color="rgba(255,255,255,0.6)" />
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <BlurReveal>
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              Impact & Results
            </div>
          </BlurReveal>
          <BlurReveal delay={0.1}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Hiring Intelligence{' '}
              <span className="text-accent-teal">That Delivers</span>
            </h2>
          </BlurReveal>
          <BlurReveal delay={0.2}>
            <p className="text-lg text-background/70 max-w-3xl mx-auto">
              SkillDex transforms recruitment metrics across the board.
            </p>
          </BlurReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-background/5 backdrop-blur-sm border border-background/10 rounded-2xl p-8 text-center hover:bg-background/10 gentle-animation"
            >
              <div className="w-14 h-14 bg-accent-teal/20 rounded-xl flex items-center justify-center mx-auto mb-5">
                <stat.icon className="w-7 h-7 text-accent-teal" />
              </div>
              <div className="text-4xl font-extrabold mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2.5} />
              </div>
              <div className="font-semibold text-background/90 mb-2">{stat.label}</div>
              <p className="text-sm text-background/60 leading-relaxed">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
