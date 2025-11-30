'use client'

import { Card } from '@/src/components/ui/card'
import { cn } from '@/src/lib/utils'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import React, { PropsWithChildren, useRef, useState } from 'react'

interface MagicCardProps extends PropsWithChildren {
  className?: string
  gradientColor?: string
  gradientOpacity?: number
  gradientSize?: number
}

export function MagicCard({
  className,
  children,
  gradientColor = '#3b82f6', // Default to blue
  gradientOpacity = 0.3,
  gradientSize = 200,
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const { left, top, width, height } = cardRef.current.getBoundingClientRect()
      mouseX.set(event.clientX - left)
      mouseY.set(event.clientY - top)
      setIsHovered(true)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const gradientX = useTransform(mouseX, (x) => `${x - gradientSize / 2}px`)
  const gradientY = useTransform(mouseY, (y) => `${y - gradientSize / 2}px`)

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative overflow-hidden rounded-lg p-0', // Remove default padding
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Card className="h-full w-full rounded-lg">
        {isHovered && (
          <motion.div
            className="absolute z-10 rounded-full bg-gradient-radial"
            style={{
              left: gradientX,
              top: gradientY,
              width: gradientSize,
              height: gradientSize,
              background: `radial-gradient(circle, ${gradientColor} ${gradientOpacity * 100}%, transparent 70%)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
        <div className="relative z-20 h-full">{children}</div>
      </Card>
    </motion.div>
  )
}
