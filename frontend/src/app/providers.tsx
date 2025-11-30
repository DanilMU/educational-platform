'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { removeTokens } from "@/src/lib/cookies";

interface ProvidersProps {
    children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
    const router = useRouter();
    const [client] = useState(new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: (failureCount, error) => {
                    // Проверяем, является ли ошибка ошибкой аутентификации
                    if (error && typeof error === 'object' && 'status' in error) {
                        const status = (error as { status?: number }).status;
                        if (status === 401 || status === 403 || status === 404) {
                            // Удаляем токены и перенаправляем на страницу входа
                            removeTokens();
                            router.push('/auth/login');
                            return false; // Не пытаемся повторить запрос
                        }
                    }
                    // Повторяем другие ошибки до 3 раз
                    return failureCount < 3;
                }
            }
        }
    }))

    return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}