import { useEffect, useRef } from 'react'

interface ParticlesProps {
  className?: string
  count?: number
  color?: string
  speed?: number
}

export function Particles({ className = '', count = 40, color = 'var(--accent-indigo)', speed = 0.3 }: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    const init = () => {
      resize()
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Get computed color
      const tempEl = document.createElement('div')
      tempEl.style.color = color
      document.body.appendChild(tempEl)
      const computedColor = getComputedStyle(tempEl).color
      document.body.removeChild(tempEl)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = computedColor.replace(')', `, ${p.opacity})`).replace('rgb(', 'rgba(')
        ctx.fill()
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            const lineOpacity = (1 - dist / 120) * 0.15
            ctx.strokeStyle = computedColor.replace(')', `, ${lineOpacity})`).replace('rgb(', 'rgba(')
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    init()
    draw()

    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [count, color, speed])

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} />
}
