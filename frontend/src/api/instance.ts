import axios, { type CreateAxiosDefaults } from 'axios'

import { errorCatch } from '../lib/utils'
import { getAccessToken, removeTokens, saveToken, saveRefreshToken } from '../lib/cookies'
import type { AuthResponse } from '../api/types/authResponse'

const options: CreateAxiosDefaults = {
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
}

const uninterceptedAxios = axios.create(options);

export const instance = axios.create(options)

const refresh = async () =>
    await uninterceptedAxios.post<AuthResponse>('/auth/refresh').then(res => {
        if (res.data.accessToken) saveToken(res.data.accessToken)
        if (res.data.refreshToken) saveRefreshToken(res.data.refreshToken)

        return res.data
    })


instance.interceptors.request.use(config => {
    const accessToken = getAccessToken()

    if (config.headers && accessToken)
        config.headers.Authorization = `Bearer ${accessToken}`

    return config
})

instance.interceptors.response.use(
    config => config,
    async (error) => {
        const originalRequest = error.config

        if (
            (error.response.status === 401 ||
                errorCatch(error) === 'jwt expired' ||
                errorCatch(error) === 'jwt must be provided') &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true

            try {
                await refresh()

                return instance.request(originalRequest)
            } catch (error) {
                if (
                    errorCatch(error) === 'jwt expired' ||
                    errorCatch(error) === 'Не удалось получить куки авторизации'
                ) 
                    removeTokens()
            }
        }

        throw error 
    }
)
