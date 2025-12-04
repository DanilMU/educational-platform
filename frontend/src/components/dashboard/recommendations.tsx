'use client'

import { SubjectCard } from '@/src/components/subjects/subject-card'
import { useGetRecommendationsQuery } from '@/src/api/hooks/useGetRecommendationsQuery'
import { useGetEnrolledSubjectsQuery } from '@/src/api/hooks'
import { useAuth } from '@/src/hooks/useAuth'
import { Skeleton } from '@/src/components/ui/skeleton'
import { BookOpen } from 'lucide-react'

export function RecommendationsSection() {
    const { user } = useAuth()
    const { data: recommendationsData, isLoading: isLoadingRecommendations, isError: isRecommendationsError } = useGetRecommendationsQuery()
    const { data: enrolledSubjects = [], isLoading: isLoadingEnrolled, isError: isEnrolledError } = useGetEnrolledSubjectsQuery(user?.id || '', { enabled: !!user?.id });

    const isLoading = isLoadingRecommendations || isLoadingEnrolled;
    const isError = isRecommendationsError || isEnrolledError;

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
    const enrolledSubjectIds = new Set(enrolledSubjects.map(s => s.id));

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
                        .map((rec, index) => {
                            const isEnrolled = enrolledSubjectIds.has(rec.id as string);
                            return (
                                <SubjectCard
                                    key={`${rec.id}-${index}`}
                                    subject={{
                                        id: rec.id as string,
                                        title: rec.title as string,
                                        description: rec.reason as string,
                                        lessons: 0,
                                        progress: 0,
                                        category: rec.subject,
                                        isEnrolled: isEnrolled,
                                    }}
                                />
                            );
                        })
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