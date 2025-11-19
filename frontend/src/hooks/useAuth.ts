import { useState } from "react";
import { getAccessToken, removeTokens } from "../lib/cookies";

export function useAuth() {
    const [isAuthorized, setIsAuthorized] = useState(() => {
        const token = getAccessToken();
        return Boolean(token && typeof token !== 'undefined');
    });

    const logout = () => {
        removeTokens();
        setIsAuthorized(false);
    }

    return { isAuthorized, logout }
}