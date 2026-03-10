import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  staggerDelay?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export function SplitText({ text, className = '', delay = 0, staggerDelay = 0.035, as: Tag = 'span' }: SplitTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const words = text.split(' ')

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => {
            const totalIndex = words.slice(0, wordIndex).join(' ').length + charIndex + (wordIndex > 0 ? 1 : 0)
            return (
              <motion.span
                key={`${wordIndex}-${charIndex}`}
                className="inline-block"
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{
                  duration: 0.6,
                  delay: delay + totalIndex * staggerDelay,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                aria-hidden
              >
                {char}
              </motion.span>
            )
          })}
          {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  )
}
