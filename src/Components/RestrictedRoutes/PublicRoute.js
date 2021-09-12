import { useSelector } from "react-redux";
import { getLoggedIn } from "redux/authorization/authorization-selectors";
import { Redirect, Route } from "react-router";


export function PublicRoute({ children, restricted = false, ...props }) {
    const isLogged = useSelector(getLoggedIn);
    const shouldRedirect = isLogged && restricted;

    return (
        <Route {...props}>
            {shouldRedirect
                ? <Redirect to='/contacts'/>
                : children
            }
        </Route>
    )
};