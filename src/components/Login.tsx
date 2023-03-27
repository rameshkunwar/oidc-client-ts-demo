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
    }, [auth]);

    if (auth.isLoading) {
        return (<h3>Loading....</h3>)
    }

    if (auth.error) {
        return (
            <>
                <span className="text-secondary"> Error on Authentication </span>
                <span className="text-danger"> <>{auth.error}</> </span>
                <span className="mt-3"> Now redirecting to login after 1000 ms </span>
            </>
        )

    }

    if (auth.isAuthenticated) {
        // return (<h3>I am authenticateed with email = {auth.user?.profile.email} </h3>)
        navigate("/");
    }
    return (
        <span>this span should never be rendered</span>
    )
}
export default Login;