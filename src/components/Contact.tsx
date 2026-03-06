import { useEffect } from 'react'
import { Calendar, MessageSquare, Rocket } from 'lucide-react'

export function Contact() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script)
    }
  }, [])

  return (
    <section id="contact" className="relative py-24 bg-secondary/30">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent-indigo/10 text-accent-indigo px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            Get Started
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-foreground">
            Ready to Transform{' '}
            <span className="gradient-text">Your Hiring?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Book a demo to see SkillDex in action and learn how AI-powered screening can accelerate your recruitment.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-card clean-border rounded-2xl overflow-hidden card-shadow">
            <div className="bg-secondary/50 px-8 py-5 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">SkillDex Demo Call</h3>
                  <p className="text-muted-foreground text-sm">30 minutes • Video call • Free consultation</p>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-accent-emerald rounded-full animate-pulse" />
                  <span className="text-sm text-muted-foreground font-medium">Available now</span>
                </div>
              </div>
            </div>
            
            <div className="p-0 bg-white">
              <div 
                className="calendly-inline-widget"
                data-url="https://calendly.com/d/cvb4-btv-mxp/introduction-with-zeroqode"
                style={{ width: '100%', height: '660px', overflow: 'hidden' }} 
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
          {[
            { icon: Calendar, title: 'Live Demo', desc: 'See SkillDex analyze real resumes in real-time.', color: 'accent-blue' },
            { icon: MessageSquare, title: 'Custom Q&A', desc: 'Discuss your specific recruitment challenges.', color: 'accent-emerald' },
            { icon: Rocket, title: 'Implementation Plan', desc: 'Get a tailored roadmap for your organization.', color: 'accent-purple' },
          ].map(item => (
            <div key={item.title} className="bg-card clean-border rounded-xl p-6 text-center subtle-shadow">
              <div className={`w-12 h-12 bg-${item.color}/10 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <item.icon className={`w-6 h-6 text-${item.color}`} />
              </div>
              <h4 className="font-bold text-foreground mb-2">{item.title}</h4>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
