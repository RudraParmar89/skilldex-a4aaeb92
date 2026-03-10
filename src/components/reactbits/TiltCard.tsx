import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  tiltAmount?: number
  glare?: boolean
}

export function TiltCard({ children, className, tiltAmount = 8, glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setTilt({
      rotateX: (0.5 - y) * tiltAmount,
      rotateY: (x - 0.5) * tiltAmount,
    })
    setGlarePos({ x: x * 100, y: y * 100 })
  }

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={tilt}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn('relative', className)}
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      {children}
      {glare && (
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
            opacity: tilt.rotateX !== 0 || tilt.rotateY !== 0 ? 1 : 0,
          }}
        />
      )}
    </motion.div>
  )
}
