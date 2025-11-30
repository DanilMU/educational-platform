'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/src/components/ui/button'
import { Checkbox } from '@/src/components/ui/checkbox'
import { Switch } from '@/src/components/ui/switch'
import { Label } from '@/src/components/ui/label'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/src/components/ui/form'
import { Input } from '@/src/components/ui/input'
import z from 'zod'
import { useUpdatePasswordMutation } from '@/src/api/hooks'
import { toast } from 'sonner'

const passwordChangeSchema = z.object({
	currentPassword: z.string().min(6, 'Текущий пароль должен содержать не менее 6 символов'),
	newPassword: z.string().min(6, 'Новый пароль должен содержать не менее 6 символов'),
	confirmNewPassword: z.string().min(6, 'Подтверждение пароля должно содержать не менее 6 символов'),
}).refine(data => data.newPassword === data.confirmNewPassword, {
	message: 'Новый пароль и подтверждение пароля не совпадают',
	path: ['confirmNewPassword'],
})

type PasswordChangeFormValues = z.infer<typeof passwordChangeSchema>

export function SecuritySettings() {
	const updatePasswordMutation = useUpdatePasswordMutation()

	const passwordForm = useForm<PasswordChangeFormValues>({
		resolver: zodResolver(passwordChangeSchema),
		defaultValues: {
			currentPassword: '',
			newPassword: '',
			confirmNewPassword: '',
	},
	})

	const handlePasswordChange = (values: PasswordChangeFormValues) => {
	updatePasswordMutation.mutate({
			currentPassword: values.currentPassword,
			newPassword: values.newPassword
		}, {
			onSuccess: () => {
				toast.success('Пароль успешно изменён');
				passwordForm.reset();
			},
			onError: (error: unknown) => {
				toast.error('Ошибка при изменении пароля', {
					description: error instanceof Error ? error.message : 'Произошла неизвестная ошибка'
				});
				console.error('Ошибка при изменении пароля:', error);
			}
		});
	}

	return (
		<div className='rounded-lg bg-card p-6 shadow-sm'>
			<h2 className='mb-4 text-xl font-semibold'>Настройки безопасности</h2>
			<div className='space-y-6'>
				<div className='flex items-start space-x-3'>
					<Checkbox id='notifications' className='mt-1' />
					<div className='grid gap-1.5 leading-none'>
						<Label htmlFor='notifications'>Получать уведомления о новых курсах</Label>
						<p className='text-muted-foreground text-sm'>
							Мы будем отправлять вам письма о новых курсах
						</p>
					</div>
				</div>
				<div className='flex items-start space-x-3'>
					<Checkbox id='reminders' className='mt-1' />
					<div className='grid gap-1.5 leading-none'>
						<Label htmlFor='reminders'>Получать напоминания о пропущенных уроках</Label>
						<p className='text-muted-foreground text-sm'>
							Напоминания помогут не забросить обучение
						</p>
					</div>
				</div>
				<div className='flex items-start space-x-3'>
					<Switch id='share-progress' />
					<div className='grid gap-1.5 leading-none'>
						<Label htmlFor='share-progress'>Показывать мой прогресс другим пользователям</Label>
						<p className='text-muted-foreground text-sm'>
							Другие студенты смогут видеть ваш прогресс
						</p>
					</div>
				</div>
				
				<div className='pt-4 border-t border-border'>
					<h3 className='mb-3 font-medium'>Изменить пароль</h3>
					<Form {...passwordForm}>
						<form onSubmit={passwordForm.handleSubmit(handlePasswordChange)} className='space-y-4'>
							<FormField
								control={passwordForm.control}
								name='currentPassword'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Текущий пароль</FormLabel>
										<FormControl>
											<Input type='password' className='bg-input' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={passwordForm.control}
								name='newPassword'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Новый пароль</FormLabel>
										<FormControl>
											<Input type='password' className='bg-input' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={passwordForm.control}
								name='confirmNewPassword'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Подтвердите новый пароль</FormLabel>
										<FormControl>
											<Input type='password' className='bg-input' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type='submit' disabled={updatePasswordMutation.isPending} className='w-full'>
								{updatePasswordMutation.isPending ? 'Смена пароля...' : 'Сменить пароль'}
							</Button>
						</form>
					</Form>
				</div>
				
				<Button variant='outline' className='w-full text-destructive border-destructive hover:bg-destructive/10'>
					Удалить аккаунт
				</Button>
			</div>
		</div>
	)
}
