import { useState } from "react"
import { useAuth } from "react-oidc-context"

export const Home = () => {
    const auth = useAuth();
    const [count, setCount] = useState(0)
    return (
        <>
            <h3 className="m-5" >This is home component</h3>
            <div className="card mt-3">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    this is just test by {auth?.user?.profile?.email}
                </p>
            </div>
        </>
    )
}


export const About = () => {
    return (
        <>
            <h3 className="m-5" >This is About component</h3>

        </>

    )
}