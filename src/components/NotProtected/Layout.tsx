import { Outlet } from "react-router"

export const NotProtectedLayout = () => {

    return (
        <>
            <h3>This is a Not-Protected-Layout</h3>
            <Outlet />
        </>
    )

}