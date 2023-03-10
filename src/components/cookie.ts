import { setCookie } from "react-use-cookie"

export const saveCookie = (cookieName: string, cookieVal: string | number, domain: string, expiry: number, path: string) => {
    if (typeof cookieVal === "number") cookieVal = cookieVal.toString();
    setCookie(cookieName, cookieVal, {
        days: 1,
        path: path,
        domain: domain,
        Secure: true,
        SameSite: 'Strict',
    })
} 