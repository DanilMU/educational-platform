import { cn } from '@/src/lib/utils'
import { ComponentProps } from 'react'



function Card({ className, ...props }: ComponentProps<'div'>) {
	return (
		<div
			className={cn(
				'rounded-xl border bg-card text-card-foreground shadow',
				className
			)}
			{...props}
		/>
	)
}

function CardHeader({ className, ...props }: ComponentProps<'div'>) {
	return (
		<div
			className={cn('flex flex-col space-y-1.5 p-6', className)}
			{...props}
		/>
	)
}

function CardTitle({ className, ...props }: ComponentProps<'div'>) {
	return (
		<div
			className={cn(
				'font-semibold leading-none tracking-tight',
				className
			)}
			{...props}
		/>
	)
}

function CardContent({ className, ...props }: ComponentProps<'div'>) {
	return <div className={cn('p-6 pt-0', className)} {...props} />
}

function CardFooter({ className, ...props }: ComponentProps<'div'>) {
	return (
		<div
			className={cn('flex items-center p-6 pt-0', className)}
			{...props}
		/>
	)
}

function CardDescription({ className, ...props }: ComponentProps<'div'>) {
	return (
		<div
			className={cn(
				'text-sm text-gray-500',
				className
			)}
			{...props}
		/>
	)
}

export { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription }