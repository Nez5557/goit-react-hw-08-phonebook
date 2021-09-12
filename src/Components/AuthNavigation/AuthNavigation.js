// import { NavLink } from "react-router-dom";
// import styles from "./styles.module.css";
import { Nav } from 'react-bootstrap';

function AuthNavigation() {

    return (
        <>
            <Nav.Link  href='/register'>register</Nav.Link>
            <Nav.Link  href='/login'>log in</Nav.Link>
        </>
    )
};

export default AuthNavigation;