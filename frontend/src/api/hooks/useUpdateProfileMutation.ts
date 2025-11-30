import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import { updateProfile } from '../requests/user'
import type { User } from '../types/user'
import type { UpdateUserDto } from '../types/updateUserDto'

export function useUpdateProfileMutation(
	options?: Omit<UseMutationOptions<User, unknown, UpdateUserDto>, 'mutationFn'>
) {
	return useMutation({
		mutationFn: updateProfile,
		...options
	})
}
