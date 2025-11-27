'use client'

import { useInView, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface AnimatedCounterProps {
  value: number
}

export function AnimatedCounter({ value }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  
  const motionValue = useSpring(0, {
    damping: 50,
    stiffness: 200
  })
  
  useEffect(() => {
    if (inView) {
      motionValue.set(value)
    }
  }, [motionValue, inView, value])
  
  useEffect(() => {
    const unsubscribe = motionValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toString()
      }
    })
    return () => unsubscribe()
  }, [motionValue])
  
  return <span ref={ref}>0</span>
}
