'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Award } from 'lucide-react'

export function AchievementsCard({ achievements }: { achievements: number }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Достижения</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{achievements}</div>
            </CardContent>
        </Card>
    )
}