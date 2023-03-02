import { useAuth } from "react-oidc-context";
import { Navigate, Outlet } from "react-router";
import RequireAuth from "./RequiredAuth";


const LayoutWithAuth = () => {
    const auth = useAuth();
    return auth.isAuthenticated ? <Outlet /> : <Navigate to={'/login'} replace={true} />


}
export default LayoutWithAuth