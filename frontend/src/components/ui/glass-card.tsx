import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

import { cn } from '@/src/lib/utils'

interface GlassCardProps {
  children: ReactNode
  className?: string
  blur?: 'sm' | 'md' | 'lg'
  border?: boolean
}

export function GlassCard({
  children,
  className = '',
  blur = 'md',
  border = true,
}: GlassCardProps) {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
  }

  return (
    <motion.div
      className={cn(
        'relative bg-white/10 dark:bg-black/10',
        'border border-white/20 dark:border-white/10',
        'rounded-2xl p-6',
        blurClasses[blur],
        border && 'border border-white/20',
        className
      )}
      whileHover={{
        y: -4,
        boxShadow:
          '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}
