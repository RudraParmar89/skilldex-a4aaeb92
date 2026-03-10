import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useSpring, useTransform } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  className?: string
  duration?: number
}

export function AnimatedCounter({ value, suffix = '', prefix = '', className = '', duration = 2.5 }: AnimatedCounterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const spring = useSpring(0, { duration: duration * 1000, bounce: 0 })
  const display = useTransform(spring, (current) => `${prefix}${Math.round(current)}${suffix}`)
  const [displayValue, setDisplayValue] = useState(`${prefix}0${suffix}`)

  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [isInView, spring, value])

  useEffect(() => {
    const unsubscribe = display.on('change', (v) => setDisplayValue(v))
    return unsubscribe
  }, [display])

  return (
    <motion.span ref={ref} className={className}>
      {displayValue}
    </motion.span>
  )
}
