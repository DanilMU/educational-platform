'use client'

import { SubjectCard } from '@/src/components/subjects/subject-card'
import { useGetRecommendationsQuery } from '@/src/api/hooks/useGetRecommendationsQuery'
import { Skeleton } from '@/src/components/ui/skeleton'
import { BookOpen } from 'lucide-react'

export function RecommendationsSection() {
    const { data: recommendationsData, isLoading, isError } = useGetRecommendationsQuery()

    if (isLoading) {
        return (
            <div>
                <h2 className="mb-4 text-2xl font-bold">Рекомендации для вас</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="rounded-lg border p-4">
                            <Skeleton className="h-32 w-full" />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div>
                <h2 className="mb-4 text-2xl font-bold">Рекомендации для вас</h2>
                <div className="text-center py-8 text-muted-foreground">
                    Не удалось загрузить рекомендации
                </div>
            </div>
        )
    }

    const recommendations = recommendationsData?.recommendations || []

    return (
        <div>
            <h2 className="mb-4 text-2xl font-bold">Рекомендации для вас</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {recommendations.length > 0 ? (
                    recommendations
                        .filter((rec, index, self) =>
                            index === self.findIndex(r =>
                                r.id === rec.id &&
                                r.title === rec.title &&
                                r.subject === rec.subject &&
                                r.topic === rec.topic
                            )
                        )
                        .map((rec, index) => (
                        <SubjectCard
                            key={`${rec.id}-${index}`}
                            subject={{
                                id: rec.id as string,
                                title: rec.title as string,
                                description: rec.reason as string,
                                // Assuming these are not directly available in RecommendationsDtoRecommendationsItem and might need to be fetched or derived
                                lessons: 0, // Placeholder
                                progress: 0, // Placeholder
                                category: rec.subject // Using subject as category
                            }}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center py-8">
                        <BookOpen className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                        <p className="text-muted-foreground">Нет рекомендаций для вас.</p>
                    </div>
                )}
            </div>
        </div>
    )
}