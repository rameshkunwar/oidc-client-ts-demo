import { Log, User } from 'oidc-client-ts'
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

Log.setLogger(console)
Log.setLevel(Log.DEBUG)

/**
 * Removes  page url code/state params after authentication
 */
const handleOnSignInCallback = (user: User | void): void => {
  window.history.replaceState({}, document.title, window.location.pathname);
}

const oidcConfig: AuthProviderProps = {
  authority: "https://localhost:44333",
  client_id: "spa-client",
  redirect_uri: "http://localhost:34452/oidc/callback",
  scope: "openid email",
  client_secret: "MySecret",
  automaticSilentRenew: true,
  revokeTokensOnSignout: true,
  prompt: "login",
  // includeIdTokenInSilentRenew: true,
  onSigninCallback: handleOnSignInCallback
}


const createRoute = createRoutesFromElements(
  <>
    <Route path='/login' element={<Login />} />
    <Route path='/oidc/callback' element={<AuthCallback />} />
    <Route element={<LayoutWithAuth />}>
      <Route index element={<App />} />
    </Route>
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
