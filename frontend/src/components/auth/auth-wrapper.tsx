import Link from 'next/link'
import Image from 'next/image'
import type { ReactNode } from 'react'
import { AuthBackground } from './auth-background'

interface AuthWrapperProps {
	title: string
	description: string
	bottomText?: string
	bottomTextLink?: string
	bottomLinkHref?: string
	children: ReactNode
}

export function AuthWrapper({
	title,
	description,
	bottomText,
	bottomTextLink,
	bottomLinkHref,
	children,
}: AuthWrapperProps) {
	return (
		<div className='flex min-h-screen'>
			<div className='relative hidden lg:flex lg:w-1/2'>
				<AuthBackground />
				<div className='relative z-10 flex h-full w-full flex-col items-center justify-center p-12'>
					{/* Замените на реальный логотип. Текущий является временным решением. */}
					<Image
						src='/images/logo/logo3.svg'
						alt='Auth'
						width={150}
						height={150}
					/>
				</div>
			</div>

			<div className='flex w-full items-center justify-center bg-background p-8 lg:w-1/2'>
				<div className='mx-auto w-full max-w-md'>
					<div className='text-center lg:text-left'>
						<h1 className='text-3xl font-bold'>{title}</h1>
						<p className='text-muted-foreground mt-2'>{description}</p>
					</div>

					<div className='my-5 p-0'>{children}</div>

					{bottomText && bottomTextLink && bottomLinkHref && (
						<p className='text-muted-foreground text-center text-[15px]'>
							{bottomText}{' '}
							<Link
								href={bottomLinkHref}
								className='font-medium text-primary hover:underline'
							>
								{bottomTextLink}
							</Link>
						</p>
					)}
				</div>
			</div>
		</div>
	)
}
