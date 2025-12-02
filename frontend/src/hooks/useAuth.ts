import { useGetMeQuery } from '../api/hooks'
import { getAccessToken, removeTokens } from '../lib/cookies'

export function useAuth() {
	const { data: user, isLoading } = useGetMeQuery()

	const token = getAccessToken()
	const isAuthorized = !!token

	const logout = () => {
		removeTokens()
		// Возможно, здесь потребуется перезагрузка страницы или редирект
	}

	return { user, isAuthorized, isLoading, logout }
}