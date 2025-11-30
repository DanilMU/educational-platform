'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'

interface PopularCoursesData {
  title: string;
  enrollments: number;
  completions: number;
}

export function PopularCoursesChart({ data }: { data: PopularCoursesData[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Популярные курсы</CardTitle>
        <CardDescription>Регистрации и завершения по курсам</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="enrollments" fill="#3b82f6" />
            <Bar dataKey="completions" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
