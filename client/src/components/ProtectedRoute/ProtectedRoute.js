import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ auth, children, ...rest }) => {
    return (
    <Route
        {...rest}
        render={() => {
        return auth ? {children} : <Redirect to={'/login'} />
        }}
    />
    )
}

export default ProtectedRoute;