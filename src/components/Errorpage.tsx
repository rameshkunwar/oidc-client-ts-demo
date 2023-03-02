import React from 'react'
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    if (isRouteErrorResponse(error)) {
        return (
            <div className="d-flex flex-column">
                <h1 className="d-flex text-bg-danger">OBS! Error</h1>
                <p className="d-flex">status: {error.status} </p>
                <p className="d-flex">statusText: {error.statusText} </p>
                {error.data?.message && <p className="d-flex"> {error.data?.message} </p>}
            </div>
        )
    } else if (error instanceof TypeError) {
        return (
            <div className="d-flex flex-column justify-content-start">
                <h1 className="d-flex text-bg-danger">OBS! Error</h1>
                {/* @ts-ignore */}
                {error.lineNumber && <p className="d-flex">Line: {error.lineNumber} </p>}
                {error.message && <p className="d-flex">Message: {error.message} </p>}
                {error.stack && <p className="d-flex">Stack: {error.stack} </p>}
            </div>
        )
    } else {
        return (
            <div className="d-flex flex-column justify-content-start">
                <h1 className="d-flex text-bg-danger">OBS! Error</h1>
                {/* @ts-ignore */}
                {error.message && <p className="d-flex">Message: {error.message} </p>}
            </div>
        )
    }

}
export default ErrorPage;