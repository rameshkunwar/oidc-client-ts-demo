import { Log, User, WebStorageStateStore } from 'oidc-client-ts'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRoutesFromElements, Route, RouterProvider } from 'react-router'
import App from './App'
import AuthCallback from './components/AuthCallback'
import LayoutWithAuth from './components/LayoutWithAuth'
import Login from './components/Login'
import ErrorPage from "./components/Errorpage"
import './index.css'
import { createBrowserRouter } from 'react-router-dom'
import { AuthProvider, AuthProviderProps } from 'react-oidc-context'
import { saveCookie } from './components/cookie'
import { Logout } from './components/Logout'

Log.setLogger(console)
Log.setLevel(Log.DEBUG)

/**
 * Removes  page url code/state params after authentication
 */
const handleOnSignInCallback = (user: User | void): void => {
  window.history.replaceState({}, document.title, window.location.pathname);
  saveCookie("spa-client", user?.expires_at as number, "localhost", user?.expires_at as number, "/")
}

const handleSignoutRedirect = () => {
  console.warn("handling sing out redirect")

}

const oidcConfig: AuthProviderProps = {
  authority: "https://localhost:44333",
  client_id: "spa-client",
  redirect_uri: "http://localhost:34452/oidc/callback",
  post_logout_redirect_uri: "http://localhost:34452/oidc/logout",
  scope: "openid email",
  client_secret: "MySecret",
  automaticSilentRenew: true,
  revokeTokensOnSignout: true,
  prompt: "login",
  //by default, uses sessionStorage. To persist state, store in localStorage.
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  // includeIdTokenInSilentRenew: true,
  onSigninCallback: handleOnSignInCallback,
  onSignoutRedirect: handleSignoutRedirect

}


const createRoute = createRoutesFromElements(
  <>
    <Route path='/login' element={<Login />} />
    <Route path='/oidc/callback' element={<AuthCallback />} />
    <Route element={<LayoutWithAuth />}>
      <Route index element={<App />} />
    </Route>
    <Route path='/oidc/logout' element={<Logout />} />
    <Route path='*' element={<ErrorPage />} />
  </>
)

const router = createBrowserRouter(createRoute);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
