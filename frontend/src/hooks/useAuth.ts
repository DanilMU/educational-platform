import { useEffect, useState } from "react";
import { getAccessToken, removeTokens } from "../lib/cookies";
import { useGetMeQuery } from "../api/hooks/useGetMeQuery";

export function useAuth() {
    const { data: user, isLoading, isError } = useGetMeQuery();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const token = getAccessToken();
        setIsAuthorized(Boolean(token && typeof token !== 'undefined' && user));
    }, [user])

    const logout = () => {
        removeTokens();
        setIsAuthorized(false);
    }

    return { isAuthorized, user, logout }
}