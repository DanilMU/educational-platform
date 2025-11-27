import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { AxiosError } from 'axios'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

interface ErrorWithMessage {
	message: string | string[]
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
	return (
		typeof error === 'object' &&
		error !== null &&
		'message' in error &&
		(typeof (error as Record<string, unknown>).message === 'string' ||
			Array.isArray((error as Record<string, unknown>).message))
	)
}

export function errorCatch(error: unknown): string {
	if (error instanceof AxiosError) {
		const errorData = error.response?.data
		if (isErrorWithMessage(errorData)) {
			if (Array.isArray(errorData.message)) {
				return errorData.message[0]
			}
			return errorData.message
		}
	}

	if (error instanceof Error) {
		return error.message
	}

	return 'Произошла неизвестная ошибка'
}

export function formatDate(dateString: string) {
	return new Date(dateString).toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	})
}