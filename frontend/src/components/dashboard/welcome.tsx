'use client'

import { useGetProfileQuery } from '@/src/api/hooks'
import { Skeleton } from '@/src/components/ui/skeleton'

export function WelcomeSection() {
    const { data: user, isLoading } = useGetProfileQuery()

    if (isLoading) {
        return (
            <div className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
                <Skeleton className="h-9 w-1/2 bg-white/20" />
                <Skeleton className="mt-2 h-7 w-3/4 bg-white/20" />
            </div>
        )
    }

    return (
        <div className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
            <h1 className="text-3xl font-bold">Добро пожаловать, {user?.firstName || 'студент'}!</h1>
            <p className="mt-2 text-lg text-blue-100">
                Продолжайте учиться и достигать новых высот.
            </p>
        </div>
    )
}
