'use client'

import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'

interface TimerProps {
  initialTime: number // in seconds
  onTimeUp: () => void
}

export function Timer({ initialTime, onTimeUp }: TimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime)

  useEffect(() => {
    if (timeRemaining <= 0) {
      onTimeUp()
      return
    }

    const intervalId = setInterval(() => {
      setTimeRemaining(prev => prev - 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [timeRemaining, onTimeUp])

  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60

  return (
    <div className="flex items-center gap-2 font-mono text-lg">
      <Clock className="size-5" />
      <span>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  )
}
