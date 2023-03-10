import { UserManager } from "oidc-client-ts";
import React from "react";
import { useAuth } from "react-oidc-context";
import { Navigate, Outlet } from "react-router";
import RequireAuth from "./RequiredAuth";


const LayoutWithAuth = () => {
    const auth = useAuth();
    var userManager = new UserManager(auth.settings);
    React.useEffect(() => {
        const getUser = async () => {
            return await userManager.getUser();
        }
        getUser().then(usr => {
            auth.user = usr;
            console.table(auth.user);
            if (usr) {
                auth.isAuthenticated = true;
            }
            console.info(auth.isAuthenticated);
        }).catch(err => console.error(err))
        userManager.events.addUserSignedIn(() => {
            debugger;
            console.log("hov! user has just signed in");
            const usrs = auth.user;
        })
    }, []);

    return auth.isAuthenticated ? <Outlet /> : <Navigate to={'/login'} replace={true} />


}
export default LayoutWithAuth

function useEffect(arg0: () => void, arg1: never[]) {
    throw new Error("Function not implemented.");
}
