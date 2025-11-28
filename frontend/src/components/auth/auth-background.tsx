'use client'

import { ParticleBackground } from '../particles/ParticleBackground'

export function AuthBackground() {
	return (
		<div className='absolute inset-0'>
			<div className='animated-gradient absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900' />
			<ParticleBackground />
		</div>
	)
}
