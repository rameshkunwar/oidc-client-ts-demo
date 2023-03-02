import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
    const auth = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate("/")
        }
    }, [auth]);

    return (
        <div>Processing.............</div>
    )
}
export default AuthCallback