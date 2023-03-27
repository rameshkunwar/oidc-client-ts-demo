import { UserManager } from "oidc-client-ts";
import React, { useRef, useState } from "react";
import { useAuth } from "react-oidc-context";
import { Navigate, Outlet } from "react-router";
import { Link } from "react-router-dom";
import RequireAuth from "./RequiredAuth";


const LayoutWithAuth = () => {
    // const auth = useAuth();
    // const userManager = new UserManager(auth.settings);
    // React.useEffect(() => {
    //     const getUser = async () => {
    //         return await userManager.getUser();
    //     }
    //     getUser().then(usr => {
    //         auth.user = usr;
    //         console.table(auth.user);
    //         if (usr) {
    //             auth.isAuthenticated = true;
    //         }
    //         console.info(auth.isAuthenticated);
    //     }).catch(err => console.error(err))
    //     userManager.events.addUserSignedIn(() => {
    //         debugger;
    //         console.log("hov! user has just signed in");
    //         const usrs = auth.user;
    //     })
    // }, [auth]);

    // const isAuthenticated = useAuthLayout();
    const usr = useAuth();

    return usr?.isAuthenticated
        ?
        (
            <div className="d-flex w-100 flex-column">
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <Link to={'/'} className=" navbar-brand">Navbar</Link>

                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to={'/home'} className="nav-link"> Home </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/about'} className="nav-link"> About </Link>
                                </li>
                                {/* <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        Pricing
                                    </a>
                                </li> */}
                                <li className="nav-item">
                                    <a className="nav-link disabled"> {usr.user?.profile?.email} </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>


                <Outlet />

            </div>
        )

        : <Navigate to={'/login'} replace={true} />


}
export default LayoutWithAuth

// function useEffect(arg0: () => void, arg1: never[]) {
//     throw new Error("Function not implemented.");
// }

const useAuthLayout = () => {
    const auth = useAuth();
    const userManager = new UserManager(auth.settings);
    const isAuthenticated = useRef(false);
    React.useEffect(() => {
        const getUser = async () => {
            return await userManager.getUser();
        }
        getUser().then(usr => {
            auth.user = usr;
            console.table(auth.user);
            if (usr) {
                auth.isAuthenticated = true;
                isAuthenticated.current = true;
            }
            console.info(auth.isAuthenticated);
        }).catch(err => console.error(err))
        userManager.events.addUserSignedIn(() => {
            debugger;
            console.log("hov! user has just signed in");
            const usrs = auth.user;
        })
    }, [auth]);
    return isAuthenticated.current;
}
