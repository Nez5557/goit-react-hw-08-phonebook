import { useSelector } from "react-redux";
import { getLoggedIn } from "redux/authorization/authorization-selectors";
import { Redirect, Route } from "react-router";

export function PrivateRoute({children, ...props}) {
    const isLogged = useSelector(getLoggedIn);

    return (
        <Route  {...props}>
            {isLogged ? children : <Redirect to='/login'/> }
        </Route>
    )
};