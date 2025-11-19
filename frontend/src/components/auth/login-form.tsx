'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { Button } from '../ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { useLoginMutation } from '@/src/api/hooks'
import { AuthWrapper } from './auth-wrapper'
import Link from 'next/link'

const loginSchema = z.object({
	email: z.string().email({ message: 'Введите корректный адрес электронной почты' }),
	password: z
		.string()
		.min(1, 'Пароль не может быть пустым')
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
	const router = useRouter()
	const queryClient = useQueryClient()
	const { mutate, isPending } = useLoginMutation({
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			router.push('/dashboard')
		},
	})
	const [showPassword, setShowPassword] = useState(false)

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = (values: LoginFormValues) => {
		mutate(values)
	}

	return (
		<AuthWrapper
			title='Вход в аккаунт'
			description='Введите свои данные для входа в аккаунт'
			bottomText='Нет аккаунта?'
			bottomTextLink='Зарегистрироваться'
			bottomLinkHref='/auth/register'
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder='your@email.com'
										disabled={isPending}
										{...field}
										className='bg-gray-100'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Пароль</FormLabel>
								<FormControl>
									<div className='relative'>
										<Input
											type={showPassword ? 'text' : 'password'}
											placeholder='••••••••'
											disabled={isPending}
											{...field}
											className='bg-gray-100'
										/>
										<button
											type='button'
											onClick={() => setShowPassword(!showPassword)}
											className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400'
										>
											{showPassword ? (
												<EyeOff className='h-5 w-5' />
											) : (
												<Eye className='h-5 w-5' />
											)}
										</button>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='text-right'>
						<Link
							href='#'
							className='text-sm text-blue-600 hover:underline'
						>
							Забыли пароль?
						</Link>
					</div>

					<Button
						type='submit'
						className='w-full bg-blue-600 text-white hover:bg-blue-700'
						disabled={isPending}
					>
						Войти
					</Button>
				</form>
			</Form>

			<div className='my-6 flex items-center'>
				<div className='flex-grow border-t border-gray-300'></div>
				<span className='mx-4 text-sm text-gray-500'>ИЛИ</span>
				<div className='flex-grow border-t border-gray-300'></div>
			</div>

			<div className='space-y-4'>
				<Button variant='outline' className='w-full'>
					{/* Здесь должны быть иконки */}
					Войти через Google
				</Button>
				<Button variant='outline' className='w-full'>
					{/* Здесь должны быть иконки */}
					Войти через GitHub
				</Button>
			</div>
		</AuthWrapper>
	)
}
