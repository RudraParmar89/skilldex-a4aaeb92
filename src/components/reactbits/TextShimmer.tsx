import { cn } from '@/lib/utils'

interface TextShimmerProps {
  children: string
  className?: string
  duration?: number
}

export function TextShimmer({ children, className, duration = 4 }: TextShimmerProps) {
  return (
    <span
      className={cn('inline-block bg-clip-text text-transparent', className)}
      style={{
        backgroundImage: 'linear-gradient(110deg, var(--accent-indigo), var(--accent-purple), var(--accent-teal), var(--accent-indigo))',
        backgroundSize: '250% 100%',
        animation: `shimmer ${duration}s ease-in-out infinite`,
      }}
    >
      {children}
    </span>
  )
}
