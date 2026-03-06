import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { HowItWorks } from './components/HowItWorks'
import { Capabilities } from './components/Capabilities'
import { Stats } from './components/Stats'
import { ResumeScanner } from './components/ResumeScanner'
import { Footer } from './components/Footer'
import { Toaster } from 'sonner'

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-right" richColors />
      <main className="relative" role="main">
        <Hero />
        <Features />
        <HowItWorks />
        <Capabilities />
        <Stats />
        <ResumeScanner />
      </main>
      <Footer />
    </div>
  )
}
