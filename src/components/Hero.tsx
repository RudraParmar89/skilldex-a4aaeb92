import { motion } from 'framer-motion'
import { Menu, X, ArrowRight, Brain, FileSearch, BarChart3, Headphones } from 'lucide-react'
import { useState, useEffect } from 'react'
import { AuthDropdown } from './AuthDropdown'

export function Hero() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isMobileMenuOpen])

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Stats', href: '#stats' },
    { label: 'Scanner', href: '#scanner' },
  ]

  const handleSignOut = async () => {
    await signOut()
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 dot-pattern opacity-30" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 right-[15%] w-72 h-72 bg-accent-indigo/10 rounded-full blur-3xl float-gentle" />
      <div className="absolute bottom-20 left-[10%] w-96 h-96 bg-accent-teal/8 rounded-full blur-3xl float-gentle" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-[5%] w-48 h-48 bg-accent-purple/8 rounded-full blur-2xl float-gentle" style={{ animationDelay: '4s' }} />

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 w-full z-[110]"
      >
        <div className={`w-full px-6 sm:px-8 lg:px-12 py-4 transition-all duration-300 ${
          isScrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border' : 'bg-transparent'
        }`}>
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center cursor-pointer gap-2"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-extrabold text-foreground text-xl tracking-tight">SkillDex</span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map(link => (
                <a key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground font-medium gentle-animation text-sm">
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {/* Contact/Support Icon */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('mailto:support@skilldex.ai', '_blank')}
                className="p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary gentle-animation cursor-pointer"
                title="Contact Support"
              >
                <Headphones className="w-5 h-5" />
              </motion.button>

              {/* Auth Button */}
              {user ? (
                <div className="hidden sm:flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary">
                    <div className="w-6 h-6 gradient-bg rounded-full flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                    <span className="text-sm font-medium text-foreground max-w-[120px] truncate">
                      {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSignOut}
                    className="p-2.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 gentle-animation cursor-pointer"
                    title="Sign Out"
                  >
                    <LogOut className="w-5 h-5" />
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/auth')}
                  className="hidden sm:flex items-center gap-2 gradient-bg text-primary-foreground font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 gentle-animation cursor-pointer text-sm"
                >
                  <LogIn className="w-4 h-4" /> Login
                </motion.button>
              )}

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2.5 rounded-lg text-foreground hover:bg-secondary gentle-animation cursor-pointer"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="md:hidden fixed inset-0 bg-foreground/20 backdrop-blur-sm z-[80]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isMobileMenuOpen ? '0%' : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="md:hidden fixed top-0 right-0 h-full w-72 bg-card border-l border-border z-[90]"
      >
        <div className="flex flex-col p-6 pt-20 space-y-4">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-foreground hover:bg-secondary rounded-lg font-medium text-lg">
              {link.label}
            </a>
          ))}
          <a
            href="mailto:support@skilldex.ai"
            className="px-4 py-3 text-foreground hover:bg-secondary rounded-lg font-medium text-lg flex items-center gap-2"
          >
            <Headphones className="w-5 h-5" /> Support
          </a>
          {user ? (
            <button
              onClick={handleSignOut}
              className="px-4 py-3 text-destructive hover:bg-destructive/10 rounded-lg font-medium text-lg flex items-center gap-2"
            >
              <LogOut className="w-5 h-5" /> Sign Out
            </button>
          ) : (
            <button
              onClick={() => { navigate('/auth'); setIsMobileMenuOpen(false) }}
              className="gradient-bg text-primary-foreground font-semibold px-6 py-3 rounded-lg mt-4 cursor-pointer flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" /> Login
            </button>
          )}
        </div>
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center min-h-screen px-6 sm:px-8 lg:px-12 pt-24">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 bg-accent-indigo/10 text-accent-indigo px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <Brain className="w-4 h-4" />
              AI-Powered Recruitment
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] mb-6 text-foreground tracking-tight">
              Resume Intelligence,{' '}
              <span className="gradient-text">Reimagined</span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl">
              SkillDex uses NLP and semantic analysis to intelligently screen resumes, rank candidates, 
              and identify skill gaps — moving beyond simple keyword matching.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('scanner')?.scrollIntoView({ behavior: 'smooth' })}
                className="gradient-bg text-primary-foreground font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 gentle-animation cursor-pointer flex items-center justify-center gap-2"
              >
                Try Scanner Free <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-card text-foreground font-semibold px-8 py-3.5 rounded-xl clean-border hover:bg-secondary gentle-animation cursor-pointer"
              >
                See How It Works
              </motion.button>
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-8 mt-10 pt-8 border-t border-border">
              <div>
                <div className="text-2xl font-bold text-foreground">95%</div>
                <div className="text-sm text-muted-foreground">Screening Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">10x</div>
                <div className="text-sm text-muted-foreground">Faster Hiring</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">Zero</div>
                <div className="text-sm text-muted-foreground">Bias Tolerance</div>
              </div>
            </div>
          </motion.div>

          {/* Right - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:block relative"
          >
            <div className="relative">
              <div className="bg-card rounded-2xl clean-border card-shadow p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <div className="w-3 h-3 rounded-full bg-accent-orange" />
                  <div className="w-3 h-3 rounded-full bg-accent-emerald" />
                  <span className="ml-2 text-sm text-muted-foreground font-mono">candidate_analysis.py</span>
                </div>
                
                <div className="space-y-4">
                  {[
                    { name: 'Sarah Chen', score: 94, skills: ['Python', 'NLP', 'TensorFlow'], color: 'bg-accent-emerald' },
                    { name: 'James Wilson', score: 87, skills: ['React', 'Node.js', 'AWS'], color: 'bg-accent-blue' },
                    { name: 'Maria Garcia', score: 81, skills: ['Java', 'Spring', 'Docker'], color: 'bg-accent-purple' },
                  ].map((candidate, i) => (
                    <motion.div
                      key={candidate.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + i * 0.2 }}
                      className="bg-secondary/50 rounded-xl p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${candidate.color} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                          #{i + 1}
                        </div>
                        <div>
                          <div className="font-semibold text-foreground text-sm">{candidate.name}</div>
                          <div className="flex gap-1.5 mt-1">
                            {candidate.skills.map(s => (
                              <span key={s} className="text-xs bg-background px-2 py-0.5 rounded-md text-muted-foreground border border-border">{s}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-foreground">{candidate.score}%</div>
                        <div className="text-xs text-muted-foreground">match</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8 }}
                className="absolute -top-4 -right-4 bg-accent-emerald text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg"
              >
                <FileSearch className="w-4 h-4 inline mr-1.5" />
                NLP Analyzed
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.1 }}
                className="absolute -bottom-4 -left-4 bg-accent-indigo text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg"
              >
                <BarChart3 className="w-4 h-4 inline mr-1.5" />
                Ranked by Relevance
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
