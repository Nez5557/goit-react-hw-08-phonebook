import { useState } from "react";
import { register } from 'redux/authorization/authorization-operations';
import { useDispatch } from "react-redux";

import {Button} from 'react-bootstrap';


function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const inputHandler = function (evt) {
        switch (evt.target.name) {

            case "name":
                setName(evt.target.value);
                break;

            case "email":
                setEmail(evt.target.value);
                break;
        
            case "password":
                setPassword(evt.target.value);
                break;

            default:
                return;
        };
    };

    const submitHanlder = function (evt) {
        evt.preventDefault();
        dispatch(register({name, email, password}));
        setName('');
        setEmail('');
        setPassword('');
    }
    
    return (
        <form onSubmit={submitHanlder}>
             <div>
                <p>Name</p>
                <input onChange={inputHandler} name="name" type="text" value={name}/>
            </div>

            <div>
                <p>Email</p>
                <input onChange={inputHandler} name="email" type="email" value={email}/>
            </div>

            <div>
                <p>Password</p>
                <input onChange={inputHandler} name="password" type="password" value={password}/>
            </div>
        <Button type="submit">
            Register
        </Button>
        </form>
    )
}




export default Register;