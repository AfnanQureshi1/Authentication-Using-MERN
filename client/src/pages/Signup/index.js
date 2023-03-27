import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../../utils/env';

function Signup() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [message, setMessage] = useState('');

    const submitForm = e => {
        e.preventDefault();
        var url = serverUrl + '/api/signup';
        if (password === rePassword){
            axios.post(url, {
                username: username,
                password: password
            }).then((res) => {
                console.log(res);
                setMessage(
                    <>
                    New user {username} created successfully.<br/> 
                    You can now login from <Link to={"/login"}>here</Link>.
                    </>);
            }).catch((error) => {
                console.log("error", error.response.data.message);
                setMessage("Error."+ error.response.data.message);
            })
        } else { 
            setMessage("Password entries do not match. Please re-enter password.");
        }
    }

    return (
        <div>
            <h1>Signup</h1>
            [<Link to={"/"} > Home </Link> | <Link to={"/login"} > Login </Link> | Signup | <Link to={"/about"} > About </Link> ]
            <p/>
            <h3>{message}</h3>
            <h3>{}</h3>
            <form onSubmit={submitForm}>
                Username:<br/>
                <input onChange={e => setUsername(e.target.value)} type="text" placeholder="Enter username" required />
                <p/>
                Password:<br/>
                <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Enter password" required />
                <p/>
                Confirm Password: <br/> 
                <input onChange={e => setRePassword(e.target.value)} type="password" placeholder="Re-enter password" required />
                <p/>
                <button type="submit">Sign up</button>
            </form>
        </div>
    );
}

export default Signup;