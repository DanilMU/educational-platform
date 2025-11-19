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

import { AuthWrapper } from './auth-wrapper'
import { useRegisterMutation } from '@/src/api/hooks'

const registerSchema = z.object({
	name: z.string().min(1, { message: 'Имя обязательно' }),
	email: z.string().email({ message: 'Введите корректный адрес электронной почты' }),
	password: z
		.string()
		.min(6, { message: 'Пароль должен содержать хотя бы 6 символов' })
		.max(128, { message: 'Пароль должен содержать не более 128 символов' }),
})

type RegisterFormValues = z.infer<typeof registerSchema>

export function RegisterForm() {
	const router = useRouter()
	const queryClient = useQueryClient()
	const { mutate, isPending } = useRegisterMutation({
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			router.push('/dashboard')
		},
	})
	const [showPassword, setShowPassword] = useState(false)

	const form = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	})

	const onSubmit = (values: RegisterFormValues) => {
		mutate(values)
	}

	return (
		<AuthWrapper
			title='Регистрация'
			description='Заполните форму ниже, чтобы создать аккаунт'
			bottomText='Уже есть аккаунт?'
			bottomTextLink='Войти'
			bottomLinkHref='/auth/login'
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Имя</FormLabel>
								<FormControl>
									<Input
										placeholder='Тайлер Дерден'
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
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Почта</FormLabel>
								<FormControl>
									<Input
										placeholder='tyler.derden@fightclub.com'
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

					<Button
						type='submit'
						size='lg'
						className='w-full bg-blue-600 text-white hover:bg-blue-700'
						disabled={isPending}
					>
						Создать аккаунт
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
