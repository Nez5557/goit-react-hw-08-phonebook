import { useSelector, useDispatch } from "react-redux";
import { getUser } from 'redux/authorization/authorization-selectors';

import { logout } from 'redux/authorization/authorization-operations';
import { Button } from 'react-bootstrap';
function Profile() {
    const user = useSelector(getUser);
    const dispatch = useDispatch();

    return (
        <>
            <span color="white">{user.name || 'example' }</span>
            <Button onClick={() => dispatch(logout())}>logout</Button>
        </>
    )
};

export default Profile;