import { useEffect } from "react";
import { hasAuthParams, useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";

const Login = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!hasAuthParams() &&
            !auth.isAuthenticated && !auth.activeNavigator && !auth.isLoading) {
            auth.signinRedirect();
        }
    }, [auth.isAuthenticated, auth.activeNavigator, auth.isLoading, auth.signinRedirect]);

    if (auth.isLoading) {
        return (<h3>Loading....</h3>)
    }
    if (auth.isAuthenticated) {
        // return (<h3>I am authenticateed with email = {auth.user?.profile.email} </h3>)
        navigate("/");
    }
    return (
        <span>i never come here</span>
    )
}
export default Login;