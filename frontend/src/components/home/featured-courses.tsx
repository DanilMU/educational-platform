'use client'

import { motion } from 'framer-motion'
import { Card3D } from '@/src/components/parallax/3d-card'
import { GlassCard } from '@/src/components/ui/glass-card'
import { SubjectCard } from '@/src/components/subjects/subject-card'

const courses = [
  {
    id: '1',
    title: 'Безопасность труда',
    description: 'Изучите основы охраны труда и промышленной безопасности',
    category: 'Охрана труда',
    lessons: 12,
    progress: 75,
  },
  {
    id: '2',
    title: 'Программирование',
    description: 'Современные языки программирования и фреймворки',
    category: 'IT',
    lessons: 25,
    progress: 30,
  },
  {
    id: '3',
    title: 'Менеджмент',
    description: 'Развивайте навыки управления проектами и командами',
    category: 'Бизнес',
    lessons: 8,
    progress: 90,
  },
]

export function FeaturedCourses() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-bold text-gray-900"
          >
            Популярные курсы
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-gray-600"
          >
            Выберите из широкого ассортимента курсов, разработанных экспертами
            в своей области
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card3D className="h-full">
                <GlassCard className="h-full">
                  <SubjectCard subject={course} />
                </GlassCard>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}