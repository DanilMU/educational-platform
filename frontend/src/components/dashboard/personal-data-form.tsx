import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { useEffect } from 'react'
import { toast } from 'sonner'

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
import { useGetProfileQuery, useUpdateProfileMutation } from '@/src/api/hooks'
import { FileUpload } from '../ui/file-upload'
import { uploadFile } from '@/src/api/requests/file'

const personalDataSchema = z.object({
	firstName: z.string().min(1, 'Имя обязательно').max(100, 'Имя слишком длинное'),
	lastName: z.string().min(1, 'Фамилия обязательна').max(100, 'Фамилия слишком длинная'),
	email: z.string().email('Введите корректный адрес электронной почты').max(255, 'Email слишком длинный'),
	avatarUrl: z.string().optional(),
})

type PersonalDataFormValues = z.infer<typeof personalDataSchema>

export function PersonalDataForm() {
	const { data: profile, refetch } = useGetProfileQuery()
	const updateProfileMutation = useUpdateProfileMutation()

	const form = useForm<PersonalDataFormValues>({
		resolver: zodResolver(personalDataSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			avatarUrl: '',
		},
	})

	useEffect(() => {
		if (profile) {
			form.reset({
				firstName: profile.firstName ?? '',
				lastName: profile.lastName ?? '',
				email: profile.email ?? '',
				avatarUrl: profile.avatarUrl ?? '',
			})
		}
	}, [profile, form])

	const onSubmit = (values: PersonalDataFormValues) => {
		updateProfileMutation.mutate(values, {
			onSuccess: () => {
				toast.success('Профиль успешно обновлён');
				refetch(); // Обновляем данные профиля после успешного обновления
			},
			onError: (error: Error | { response?: { status?: number; data?: { message?: string; error?: string } } } | unknown) => {
				console.error('Полная ошибка при обновлении профиля:', error);
				
				if (error && typeof error === 'object' && 'response' in error) {
					const axiosError = error as { response?: { status?: number; data?: { message?: string; error?: string } } };
					const status = axiosError.response?.status;
					const message = axiosError.response?.data?.message;
					const errorType = axiosError.response?.data?.error;
					
					console.log('Детали ошибки:', {
						status,
						message,
						errorType,
						fullResponse: axiosError.response?.data
					});

					if (status === 400) {
						toast.error('Ошибка валидации данных', {
							description: message || 'Проверьте правильность введенных данных'
						});
					} else if (status === 401) {
						toast.error('Ошибка аутентификации', {
							description: 'Пожалуйста, войдите в систему снова'
						});
					} else if (status === 403) {
						toast.error('Ошибка доступа', {
							description: 'У вас нет прав для обновления профиля'
						});
					} else if (status === 409) {
						toast.error('Конфликт данных', {
							description: message || 'Пользователь с такими данными уже существует'
						});
					} else {
						toast.error('Ошибка сервера', {
							description: message || errorType || 'Произошла ошибка при обновлении профиля'
						});
					}
				} else {
					const errorMessage = error instanceof Error ? error.message : 'Произошла неизвестная ошибка';
					console.log('Обычная ошибка:', errorMessage);
					toast.error('Ошибка при обновлении профиля', {
						description: errorMessage
					});
				}
			}
		});
	}

	return (
		<div className='rounded-lg bg-card p-6 shadow-sm'>
			<h2 className='mb-4 text-xl font-semibold'>Личные данные</h2>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					<FormField
						control={form.control}
						name='avatarUrl'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Аватар</FormLabel>
								<FormControl>
									<FileUpload
										value={field.value}
										onChange={field.onChange}
										uploadFile={async (file) => {
											const res = await uploadFile(file);
											// Assuming the backend returns the path in `filePath`
											const fullUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${res.filePath}`;
											return { url: fullUrl };
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
						<FormField
							control={form.control}
							name='firstName'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Имя</FormLabel>
									<FormControl>
										<Input className='bg-input' {...field} />
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
										<Input className='bg-input' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input type='email' className='bg-input' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit' disabled={updateProfileMutation.isPending}>
						{updateProfileMutation.isPending ? 'Сохранение...' : 'Сохранить изменения'}
					</Button>
				</form>
			</Form>
		</div>
	)
}
