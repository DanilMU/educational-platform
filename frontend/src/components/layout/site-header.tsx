'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '../ui/button'
import { useAuth } from '@/src/hooks'
import { UserNav } from './user-nav'

export function SiteHeader() {
	const { isAuthorized } = useAuth()

	return (
		<header className='fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='container flex h-14 max-w-screen-2xl items-center justify-between'>
				<div className="flex items-center space-x-4">
					<Link href='/' className='flex items-center gap-x-2'>
						<Image
							src='/images/logo/logo3.svg'
							alt='Образовательная платформа'
							width={40}
							height={40}
						/>
						<span className='hidden font-bold sm:inline-block'>
							Образовательная платформа
						</span>
					</Link>
					<nav className="flex items-center space-x-6 text-sm font-medium">
						<Link href="/subjects" className="transition-colors hover:text-foreground/80 text-foreground/60">
							Курсы
						</Link>
					</nav>
				</div>


				<div className='flex items-center gap-x-2'>
					{isAuthorized ? (
						<UserNav />
					) : (
						<>
							<Button variant='ghost' size='sm' asChild>
								<Link href='/auth/login'>Войти</Link>
							</Button>
							<Button size='sm' asChild>
								<Link href='/auth/register'>Регистрация</Link>
							</Button>
						</>
					)}
				</div>
			</div>
		</header>
	)
}
