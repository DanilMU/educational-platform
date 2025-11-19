import Cookies from 'js-cookie'

export enum EnumTokens {
    ACCESS_TOKEN = 'accessToken',
    REFRESH_TOKEN = 'refreshToken'
}

export const getAccessToken = () => {
    const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)

    return accessToken ?? null
}

export const saveToken = (accessToken: string) => {
    Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
        domain: process.env.NEXT_PUBLIC_COOKIES_DOMAIN,
        sameSite: 'strict',
        expires: 1
    })
}

export const saveRefreshToken = (refreshToken: string) => {
    Cookies.set(EnumTokens.REFRESH_TOKEN, refreshToken, {
        domain: process.env.NEXT_PUBLIC_COOKIES_DOMAIN,
        sameSite: 'strict',
        expires: 1
    })
}

export const removeTokens = () => {
    Cookies.remove(EnumTokens.ACCESS_TOKEN)
    Cookies.remove(EnumTokens.REFRESH_TOKEN)
}