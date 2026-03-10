import { Routes, Route } from 'react-router-dom'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { HowItWorks } from './components/HowItWorks'
import { Capabilities } from './components/Capabilities'
import { Stats } from './components/Stats'
import { ResumeScanner } from './components/ResumeScanner'
import { ContactForm } from './components/ContactForm'
import { Footer } from './components/Footer'
import { Toaster } from 'sonner'
import Auth from './pages/Auth'
import ResetPassword from './pages/ResetPassword'
import Profile from './pages/Profile'

function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Capabilities />
      <Stats />
      <ResumeScanner />
      <ContactForm />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<main className="relative" role="main"><HomePage /></main>} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}
