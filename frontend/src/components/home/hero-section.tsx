'use client'

import { motion } from 'framer-motion'
import { Button } from '@/src/components/ui/button' // Keep regular Button for asChild prop if MagicButton doesn't support it directly
import Link from 'next/link'
import { HeroParallax } from './hero-parallax'
import { MagicButton } from '@/src/components/ui/magic-button' // Import MagicButton

function AnimatedTitle() {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-6 text-4xl font-bold text-white md:text-5xl leading-tight"
    >
      Добро пожаловать на
      <br />
      <span className="text-blue-300">Образовательную платформу</span>
    </motion.h1>
  )
}

function AnimatedDescription() {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mx-auto mb-12 max-w-2xl text-lg text-gray-200"
    >
      Раскройте свой потенциал с нашими интерактивными курсами, созданными для
      эффективного обучения и развития навыков.
    </motion.p>
  )
}

function AnimatedButtons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="flex justify-center gap-4"
    >
      <MagicButton asChild size="lg">
        <Link href="/auth/register">Начать обучение</Link>
      </MagicButton>
      <MagicButton asChild variant="outline" size="lg" className="text-white border-white bg-transparent hover:bg-white/10">
        <Link href="/subjects">Просмотреть курсы</Link>
      </MagicButton>
    </motion.div>
  )
}

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <HeroParallax />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <AnimatedTitle />
        <AnimatedDescription />
        <AnimatedButtons />
      </div>
    </section>
  )
}