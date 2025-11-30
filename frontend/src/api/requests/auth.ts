import { removeTokens, saveToken, saveRefreshToken } from "@/src/lib/cookies"
import { api } from "../api"
import type { AuthResponse, LoginRequest, RegisterRequest } from "../types"

export const register = async (data: RegisterRequest) =>
    await api.post<AuthResponse>('/auth/register', data).then(res => {
        if (res.data.accessToken) saveToken(res.data.accessToken)
        if (res.data.refreshToken) saveRefreshToken(res.data.refreshToken)

        return res.data
    })

export const login = async (data: LoginRequest) =>
    await api.post<AuthResponse>('/auth/login', data).then(res => {
        if (res.data.accessToken) saveToken(res.data.accessToken)
        if (res.data.refreshToken) saveRefreshToken(res.data.refreshToken)

        return res.data
    })

export const logout = async () => {
    await api.post('/auth/logout')
    removeTokens()
}
