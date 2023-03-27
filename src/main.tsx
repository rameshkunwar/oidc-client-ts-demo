import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRoutesFromElements, Route, RouterProvider } from 'react-router'
import ErrorPage from "./components/Errorpage"
import './index.css'
import { createBrowserRouter } from 'react-router-dom'
import { NotProtectedLayout } from './components/NotProtected/Layout'
import { NotProtectedPage } from './components/NotProtected/Page'
import { ProtectedRoute } from './components/AppRoot'
import { NotFoundPage } from './components/NotProtected/NotFound'
import 'bootstrap/dist/css/bootstrap.min.css'


/** Old oidc config  */

// Log.setLogger(console)
// Log.setLevel(Log.DEBUG)

// /**
//  * Removes  page url code/state params after authentication
//  */
// const handleOnSignInCallback = (user: User | void): void => {
//   window.history.replaceState({}, document.title, window.location.pathname);
//   saveCookie("spa-client", user?.expires_at as number, "localhost", user?.expires_at as number, "/")
// }

// const oidcConfig: AuthProviderProps = {
//   authority: "https://localhost:44333",
//   client_id: "spa-client",
//   redirect_uri: "http://localhost:34452/oidc/callback",
//   post_logout_redirect_uri: "http://localhost:34452/oidc/logout",
//   popup_post_logout_redirect_uri: "https://ritzau.com",
//   scope: "openid email",
//   client_secret: "MySecret",
//   automaticSilentRenew: true,
//   revokeTokensOnSignout: true,
//   prompt: "login",
//   // acr_values: '.spaclientauth',
//   //by default, uses sessionStorage. To persist state, store in localStorage.
//   userStore: new WebStorageStateStore({ store: window.localStorage }),
//   // includeIdTokenInSilentRenew: true,
//   onSigninCallback: handleOnSignInCallback,
//   onSignoutRedirect: handleSignoutRedirect

// }

const createRoute = createRoutesFromElements(
  <>
    <Route path='/*' element={<ProtectedRoute />} errorElement={<ErrorPage />} />
    <Route element={<NotProtectedLayout />} errorElement={<ErrorPage />}>
      <Route path='/unprotected' element={<NotProtectedPage />} />
    </Route>
    <Route path='*' element={<NotFoundPage />} />
  </>
)

// const router = createBrowserRouter(createRoute);
const router = createBrowserRouter(createRoute, {
  basename: '/valgapp'
});

/** Old solution having both protected & un-protected routing under AuthProvider context
 * The new solution excludes not-protected route
 */
// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <AuthProvider {...oidcConfig}>
//       <RouterProvider router={router} />
//     </AuthProvider>
//   </React.StrictMode>,
// )

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

