'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import type { LucideIcon } from 'lucide-react'
import { AnimatedCounter } from './animated-counter' 

interface LearningStatsCardProps {
    title: string
    value: number
    total?: number
    icon: LucideIcon
}

export function LearningStatsCard({ title, value, total, icon: Icon }: LearningStatsCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    <AnimatedCounter value={value} />
                    {total !== undefined && <span className="text-sm text-muted-foreground"> / {total}</span>}
                </div>
            </CardContent>
        </Card>
    )
}