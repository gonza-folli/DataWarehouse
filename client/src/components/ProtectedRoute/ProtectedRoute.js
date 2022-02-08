import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ auth, component: Component, ...rest }) => {

    // useEffect( ()=> {
    //     console.log(auth)
    // }, [auth])

    return (
    <Route
        {...rest}
        render={() => {
        return auth ? <Component {...rest}/> : <Redirect to={'/login'} />
        }}
    />
    )
}

export default ProtectedRoute;