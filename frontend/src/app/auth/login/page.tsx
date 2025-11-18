import { LoginForm } from '@/src/components/auth/login-form'
import type { Metadata } from 'next'


export const metadata: Metadata = {
    title: 'Авторизация'
}

export default function LoignPage() {
    return <LoginForm />
}
