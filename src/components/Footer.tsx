import { Brain } from 'lucide-react'

export function Footer() {
  const techStack = [
    'Natural Language Processing',
    'Transformer Models',
    'Semantic Embeddings',
    'Cosine Similarity',
    'Python / FastAPI',
    'React / TypeScript',
    'PostgreSQL',
    'scikit-learn',
  ]

  return (
    <footer className="relative py-16 bg-foreground text-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-12 md:col-span-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-extrabold text-background text-xl tracking-tight">SkillDex</span>
            </div>
            <p className="text-background/70 leading-relaxed mb-6 max-w-md">
              AI-powered Resume Intelligence and Candidate Ranking Platform. 
              Transforming recruitment with NLP, semantic analysis, and transparent scoring.
            </p>
          </div>

          <div className="col-span-12 md:col-span-3">
            <h4 className="font-bold text-background text-lg mb-4">Platform</h4>
            <div className="space-y-3">
              {['Features', 'How It Works', 'Capabilities', 'Pricing'].map(item => (
                <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                  className="block text-background/60 hover:text-background gentle-animation text-sm">
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-12 md:col-span-4">
            <h4 className="font-bold text-background text-lg mb-4">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {techStack.map(tech => (
                <span key={tech} className="text-xs bg-background/10 text-background/70 px-3 py-1.5 rounded-lg border border-background/10">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-background/15 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-background/50">
              © {new Date().getFullYear()} SkillDex. All rights reserved.
            </div>
            <div className="text-sm text-background/50">
              AI-Powered Recruitment Intelligence
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
