import { useEffect, useState } from "react";
import { getAccessToken, removeTokens } from "../lib/cookies";

export function useAuth() {
    const token = getAccessToken();
    const [isAuthorized, setIsAuthorized] = useState(Boolean(token));

    // Обновляем состояние авторизации при изменении токена
    useEffect(() => {
        setIsAuthorized(Boolean(token));
    }, [token]);

    const logout = () => {
        removeTokens();
        setIsAuthorized(false);
    }

    // Возвращаем только isAuthorized и функцию logout, без данных пользователя
    // Данные пользователя можно получить отдельно в компонентах, где они нужны
    return { isAuthorized, logout };
}