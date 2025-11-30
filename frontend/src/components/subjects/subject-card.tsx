'use client'

import { memo } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/src/components/ui/card' // Explicitly import CardFooter
import { Badge } from '@/src/components/ui/badge'
import { Button } from '@/src/components/ui/button'
import { 
  Clock, 
  Users, 
  Star,
  BookOpen,
  PlayCircle
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Progress } from '@/src/components/ui/progress'
import { Skeleton } from '@/src/components/ui/skeleton'
import { MagicCard } from '@/src/components/ui/magic-card' // Import MagicCard

// I'll assume the subject type based on the usage in the card.
// This should be replaced with the actual type from the API client later.
import type { SubjectDescription } from '@/src/api/types'

type Subject = {
  id: string
  title: string
  description?: string | SubjectDescription
  progress?: number
  lessons?: number | string
  category?: string
  studentCount?: number
  rating?: number
}

interface SubjectCardProps {
  subject: Subject
}

const SubjectCard = memo(({ subject }: SubjectCardProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'programming':
        return 'bg-blue-100 text-blue-800'
      case 'design':
        return 'bg-purple-100 text-purple-800'
      case 'data-science':
        return 'bg-green-100 text-green-800'
      case 'business':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'programming':
        return 'Программирование'
      case 'design':
        return 'Дизайн'
      case 'data-science':
        return 'Data Science'
      case 'business':
        return 'Бизнес'
      default:
        return 'Другое'
    }
  }

  const description = String(subject.description || '').length > 100
    ? String(subject.description || '').slice(0, 100) + '...'
    : String(subject.description || '')

  return (
    <MagicCard
      className="group relative h-full overflow-hidden rounded-xl border"
      gradientColor="#3b82f6" // Example gradient color
      gradientOpacity={0.3}
      gradientSize={200}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-2">{subject.title}</CardTitle>
            <CardDescription className="mt-1 line-clamp-2">
              {description}
            </CardDescription>
          </div>
        </div>
        
        {subject.category && (
          <Badge className={getCategoryColor(subject.category)}>
            {getCategoryName(subject.category)}
          </Badge>
        )}
      </CardHeader>
      
      <CardContent className="flex-grow space-y-3">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{subject.lessons || 0} уроков</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{subject.studentCount || 0} студентов</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          {subject.rating !== undefined && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span>{subject.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        
        {subject.progress !== undefined && (
          <Progress value={subject.progress} className="h-2" />
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full" 
          asChild
          size="sm"
        >
          <Link href={`/subjects/${subject.id}`}>
            <PlayCircle className="w-4 h-4 mr-2" />
            Начать обучение
          </Link>
        </Button>
      </CardFooter>
    </MagicCard>
  )
})

SubjectCard.displayName = 'SubjectCard'

export { SubjectCard }

export function SubjectCardSkeleton() {
	return (
	  <div className="overflow-hidden rounded-xl border bg-card shadow-lg">
			<div className="p-6">
				<div className="flex-row items-start gap-4 flex">
					<Skeleton className="h-12 w-12 rounded-lg" />
					<div className="flex-grow">
						<Skeleton className="h-5 w-3/4" />
						<div className="mt-2 flex items-center gap-2">
							<Skeleton className="h-4 w-1/4" />
							<Skeleton className="h-4 w-1/2" />
						</div>
					</div>
				</div>
				<div className="mt-4 space-y-4">
					<Skeleton className="h-2 w-full" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-5/6" />
				</div>
				<div className="mt-6">
					<Skeleton className="h-10 w-full" />
				</div>
			</div>
	  </div>
	)
}