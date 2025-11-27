'use client'

import { Progress } from '@/src/components/ui/progress'
import { useCallback, useEffect, useState } from 'react'

interface FloatingProgressProps {
  // The target element to track scroll progress against
  targetRef: React.RefObject<HTMLElement | null>
}

export function FloatingProgress({ targetRef }: FloatingProgressProps) {
  const [progress, setProgress] = useState(0)

  const handleScroll = useCallback(() => {
    const mainElement = targetRef.current;
    if (!mainElement) return

    const { top, height } = mainElement.getBoundingClientRect()
    const scrollableHeight = height - window.innerHeight
    
    // consider the part of the element that is scrolled past the top of the viewport
    const scrollPosition = -top;

    if (scrollableHeight > 0) {
      const currentProgress = (scrollPosition / scrollableHeight) * 100
      setProgress(Math.min(100, Math.max(0, currentProgress)))
    } else if (top < 0) {
      // If content is smaller than viewport, it's fully visible when it has been scrolled past
      setProgress(100);
    } else {
      setProgress(0);
    }
  }, [targetRef])

  useEffect(() => {
    const mainElement = targetRef.current;
    if (!mainElement) return;

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll(); // initial calculation

    return () => window.removeEventListener('scroll', handleScroll)
  }, [targetRef, handleScroll])

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20">
      <Progress value={progress} className="h-1 rounded-none" />
    </div>
  )
}
