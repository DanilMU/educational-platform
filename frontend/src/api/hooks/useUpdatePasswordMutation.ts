import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import { updatePassword } from '../requests/user'

interface UpdatePasswordResponse {
	message?: string;
}

export function useUpdatePasswordMutation(
	options?: Omit<UseMutationOptions<UpdatePasswordResponse, unknown, { currentPassword: string; newPassword: string }>, 'mutationFn'>
) {
	return useMutation({
		mutationFn: ({ currentPassword, newPassword }) => updatePassword(currentPassword, newPassword),
		...options
	})
}
