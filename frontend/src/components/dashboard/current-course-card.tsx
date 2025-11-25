'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Button } from '@/src/components/ui/button'
import Link from 'next/link'

export function CurrentCourseCard({ currentCourse }: { currentCourse?: { id: string, title: string } }) {
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