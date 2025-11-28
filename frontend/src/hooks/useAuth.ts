import { useEffect, useState } from "react";
import { getAccessToken, removeTokens } from "../lib/cookies";

export function useAuth() {
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const token = getAccessToken();
        setIsAuthorized(Boolean(token && typeof token !== 'undefined'));
    }, [])

    const logout = () => {
        removeTokens();
        setIsAuthorized(false);
    }

    return { isAuthorized, logout }
}