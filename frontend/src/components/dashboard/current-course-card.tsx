'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Button } from '@/src/components/ui/button'
import Link from 'next/link'
import { Skeleton } from '@/src/components/ui/skeleton'

export function CurrentCourseCard({ currentCourse, isLoading, error }: {
  currentCourse?: { id: string, title: string },
  isLoading?: boolean,
  error?: boolean
}) {
    if (isLoading) {
        return (
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Текущий курс</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (error) {
        return (
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Текущий курс</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center text-muted-foreground pt-4">
                        <p>Не удалось загрузить текущий курс</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Текущий курс</CardTitle>
            </CardHeader>
            <CardContent>
                {currentCourse ? (
                    <>
                        <div className="text-lg font-bold mb-2">{currentCourse.title}</div>
                        <Button asChild size="sm" className="w-full">
                            <Link href={`/subjects/${currentCourse.id}`}>Продолжить</Link>
                        </Button>
                    </>
                ) : (
                    <div className="text-center text-muted-foreground pt-4">
                        <p>Нет активных курсов</p>
                        <Button asChild size="sm" variant="outline" className="mt-2">
                            <Link href="/subjects">Выбрать курс</Link>
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}