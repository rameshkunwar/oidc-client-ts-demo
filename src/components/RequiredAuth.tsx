import { useAuth } from "react-oidc-context";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireAuth() {

    const auth = useAuth();
    return auth.isAuthenticated ? <Outlet /> : <Navigate to={'/login'} replace={true} />
}