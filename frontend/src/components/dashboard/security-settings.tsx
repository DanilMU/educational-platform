'use client'

import { Button } from '@/src/components/ui/button'
import { Checkbox } from '@/src/components/ui/checkbox'
import { Switch } from '@/src/components/ui/switch'
import { Label } from '@/src/components/ui/label'

export function SecuritySettings() {
	return (
		<div className='rounded-lg bg-white p-6 shadow-sm'>
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
				<Button variant='outline' className='w-full'>
					Изменить пароль
				</Button>
				<Button variant='destructive' className='w-full'>
					Удалить аккаунт
				</Button>
			</div>
		</div>
	)
}
