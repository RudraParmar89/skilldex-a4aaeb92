import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { HowItWorks } from './components/HowItWorks'
import { Capabilities } from './components/Capabilities'
import { Stats } from './components/Stats'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="relative" role="main">
        <Hero />
        <Features />
        <HowItWorks />
        <Capabilities />
        <Stats />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
