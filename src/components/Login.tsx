import { useEffect } from "react";
import { hasAuthParams, useAuth } from "react-oidc-context";

const Login = () => {
    const auth = useAuth();

    useEffect(() => {
        if (!hasAuthParams() &&
            !auth.isAuthenticated && !auth.activeNavigator && !auth.isLoading) {
            auth.signinRedirect();
        }
    }, [auth.isAuthenticated, auth.activeNavigator, auth.isLoading, auth.signinRedirect]);

    if (auth.isLoading) {
        return (<h3>Loading....</h3>)
    }
    return (
        <span>i never come here</span>
    )
}
export default Login;