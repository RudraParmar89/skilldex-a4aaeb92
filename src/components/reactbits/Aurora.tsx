interface AuroraProps {
  className?: string
  intensity?: 'subtle' | 'medium' | 'strong'
}

export function Aurora({ className = '', intensity = 'subtle' }: AuroraProps) {
  const opacityMap = { subtle: 0.15, medium: 0.25, strong: 0.4 }
  const opacity = opacityMap[intensity]

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%]"
        style={{
          opacity,
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, var(--accent-indigo), transparent),
            radial-gradient(ellipse 60% 40% at 70% 60%, var(--accent-purple), transparent),
            radial-gradient(ellipse 50% 60% at 50% 30%, var(--accent-teal), transparent)
          `,
          animation: 'auroraMove 20s ease-in-out infinite alternate',
        }}
      />
    </div>
  )
}
