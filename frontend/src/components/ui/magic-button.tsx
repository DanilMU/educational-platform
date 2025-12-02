'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { Button, ButtonProps } from '@/src/components/ui/button' // Re-import Button to extend its props
import { cn } from '@/src/lib/utils'

export const MagicButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block" // Ensure motion.div doesn't break layout
      >
        <Button
          ref={ref}
          className={cn(
            "relative",
            className
          )}
          {...props}
        >
          {children}
        </Button>
      </motion.div>
    )
  }
)

MagicButton.displayName = 'MagicButton'