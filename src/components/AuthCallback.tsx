import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { Navigate, useNavigate } from "react-router-dom";

const AuthCallback = () => {
    const auth = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate("/")
        }
    }, []);

    return (
        <>
            <div>Processing.............</div>
            {
                auth.isAuthenticated ? <Navigate replace to={'/'} /> : (<Navigate to={'/'} />)
            }
        </>

    )
}
export default AuthCallback