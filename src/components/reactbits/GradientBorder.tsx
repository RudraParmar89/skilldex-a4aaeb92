import { cn } from '@/lib/utils'

interface GradientBorderProps {
  children: React.ReactNode
  className?: string
  borderWidth?: number
  gradient?: string
  animate?: boolean
}

export function GradientBorder({
  children,
  className,
  borderWidth = 1,
  gradient = 'linear-gradient(135deg, var(--accent-indigo), var(--accent-purple), var(--accent-teal))',
  animate = true,
}: GradientBorderProps) {
  return (
    <div
      className={cn('relative rounded-2xl', className)}
      style={{ padding: borderWidth }}
    >
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          background: gradient,
          animation: animate ? 'gradientRotate 8s linear infinite' : undefined,
          backgroundSize: animate ? '200% 200%' : undefined,
        }}
      />
      <div className="relative bg-card rounded-[inherit] h-full">
        {children}
      </div>
    </div>
  )
}
