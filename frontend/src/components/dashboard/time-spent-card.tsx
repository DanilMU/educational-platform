'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Clock } from 'lucide-react'

export function TimeSpentCard({ timeSpent }: { timeSpent?: number }) {
    const hours = timeSpent !== undefined ? Math.floor(timeSpent / 60) : 0;
    const minutes = timeSpent !== undefined ? timeSpent % 60 : 0;
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Время в обучении</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    {hours}ч {minutes}м
                </div>
            </CardContent>
        </Card>
    )
}