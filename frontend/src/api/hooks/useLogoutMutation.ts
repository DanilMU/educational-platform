import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { logout } from '../requests/auth'

export function useLogoutMutation(
	options?: Omit<UseMutationOptions<void, unknown, void>, 'mutationFn'>
) {
	const router = useRouter()

	return useMutation({
		mutationFn: logout,
		onSuccess: () => {
			router.push('/auth/login')
		},
		...options,
	})
}
