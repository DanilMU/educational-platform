'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { useEffect } from 'react'

import { Button } from '@/src/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/src/components/ui/form'
import { Input } from '@/src/components/ui/input'
import { useGetProfileQuery } from '@/src/api/hooks'

const personalDataSchema = z.object({
	firstName: z.string().min(1, 'Имя обязательно'),
	lastName: z.string().min(1, 'Фамилия обязательна'),
	email: z.string().email('Введите корректный адрес электронной почты'),
	phone: z.string().optional(),
	dob: z.string().optional(), // Date of Birth
	city: z.string().optional(),
})

type PersonalDataFormValues = z.infer<typeof personalDataSchema>

export function PersonalDataForm() {
	const { data: profile } = useGetProfileQuery()

	const form = useForm<PersonalDataFormValues>({
		resolver: zodResolver(personalDataSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			dob: '',
			city: '',
		},
	})

	// Helper function to extract string value from potentially wrapped types
	const extractStringValue = <T extends { [key: string]: unknown } | string | undefined>(value: T | undefined): string => {
	if (typeof value === 'string') {
			return value;
		} else if (value && typeof value === 'object') {
			// Try common property names that might contain the actual string value
			const obj = value as { [key: string]: unknown };
			return (obj.value as string) || (obj.data as string) || (obj.name as string) || (obj.number as string) || (obj.date as string) || '';
		}
		return '';
	};

	useEffect(() => {
		if (profile) {
			form.reset({
				firstName: extractStringValue(profile.firstName),
				lastName: extractStringValue(profile.lastName),
				email: profile.email || '',
				phone: extractStringValue(profile.phone),
				dob: extractStringValue(profile.dob),
				city: extractStringValue(profile.city),
			})
		}
	}, [profile, form])

	const onSubmit = (values: PersonalDataFormValues) => {
		console.log(values)
		// Here you would typically send data to an API
	}

	return (
		<div className='rounded-lg bg-white p-6 shadow-sm'>
			<h2 className='mb-4 text-xl font-semibold'>Личные данные</h2>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
						<FormField
							control={form.control}
							name='firstName'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Имя</FormLabel>
									<FormControl>
										<Input className='bg-gray-100' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='lastName'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Фамилия</FormLabel>
									<FormControl>
										<Input className='bg-gray-100' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input type='email' className='bg-gray-100' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='phone'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Номер телефона</FormLabel>
									<FormControl>
										<Input className='bg-gray-100' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
						<FormField
							control={form.control}
							name='dob'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Дата рождения</FormLabel>
									<FormControl>
										<Input type='date' className='bg-gray-100' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='city'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Город</FormLabel>
									<FormControl>
										<Input className='bg-gray-100' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button type='submit'>Сохранить изменения</Button>
				</form>
			</Form>
		</div>
	)
}
