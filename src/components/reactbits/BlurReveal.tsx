import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface BlurRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  blur?: number
}

export function BlurReveal({ children, className = '', delay = 0, direction = 'up', blur = 10 }: BlurRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const offsets = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { y: 0, x: 30 },
    right: { y: 0, x: -30 },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, filter: `blur(${blur}px)`, ...offsets[direction] }}
      animate={isInView ? { opacity: 1, filter: 'blur(0px)', x: 0, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}
