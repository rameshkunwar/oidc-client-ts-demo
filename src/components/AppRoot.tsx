import { Log, User, WebStorageStateStore } from "oidc-client-ts"
import { AuthProvider, AuthProviderProps } from "react-oidc-context"
import { Route, Router, Routes } from "react-router"
import App from "../App"
import AuthCallback from "./AuthCallback"
import { saveCookie } from "./cookie"
import LayoutWithAuth from "./LayoutWithAuth"
import Login from "./Login"
import { Logout } from "./Logout"
Log.setLogger(console)
Log.setLevel(Log.DEBUG)

/**
 * Removes  page url code/state params after authentication
 */
const handleOnSignInCallback = (user: User | void): void => {
    /* 
    * if this callback is called twice, it can potentially throw 'readSigninResponseState:No matching state found in storage' error 
    * React render twice on the development environment
    * https://github.com/IdentityModel/oidc-client-js/issues/1044
    */
    window.history.replaceState({}, document.title, window.location.pathname);
    //saveCookie("spa-client", user?.expires_at as number, "localhost", user?.expires_at as number, "/")
}

const handleSignoutRedirect = () => {
    console.warn("handling sing out redirect")

}
const oidcConfig: AuthProviderProps = {
    authority: "https://localhost:44333",
    client_id: "Valg_SPA_Client",
    redirect_uri: "http://localhost:34452/valgapp/oidc/callback",
    post_logout_redirect_uri: "http://localhost:34452/valgapp/oidc/logout",
    popup_post_logout_redirect_uri: "https://ritzau.com",
    scope: "openid email",
    client_secret: "MySecret",
    automaticSilentRenew: true,
    revokeTokensOnSignout: true,
    prompt: "login",

    // acr_values: '.spaclientauth',
    //by default, uses sessionStorage. To persist state, store in localStorage.
    userStore: new WebStorageStateStore({ store: window.localStorage }),
    // includeIdTokenInSilentRenew: true,
    onSigninCallback: handleOnSignInCallback,
    onSignoutRedirect: handleSignoutRedirect

}

export const ProtectedRoute = () => {
    return (
        <AuthProvider {...oidcConfig}>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path='/oidc/callback' element={<AuthCallback />} />
                <Route element={<LayoutWithAuth />}>
                    <Route index path="/*" element={<App />} />
                </Route>
                <Route path='/oidc/logout' element={<Logout />} />
            </Routes>
        </AuthProvider>
    )
}