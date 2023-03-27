import React, { useState, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios';
import { LoginContext } from '../../contexts/LoginContext';
import { serverUrl } from '../../utils/env';

function Login() {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [errorMsg, setErrorMsg] = useState('');
    let [redirectTo, setRedirectTo] = useState('');

    let loginCtx = useContext(LoginContext);
    let { setLogInState } = loginCtx;

    const handleSubmit = e => {
        e.preventDefault();
        console.log("username is " + username);
        console.log("password is " + password);
        var url = serverUrl + '/api/login';
        console.log("url", url);
        axios.post(url, {
                username: username,
                password: password, 
                redirectTo: redirectTo
        })
        .then(response => {
            //console.log('login response: ')
            console.log(response)
            if (response.status === 200) {
                console.log("Login Successful.");
                setLogInState(true, response.data.username);
                setRedirectTo("/private");
            }
        })
        .catch(error => {
            console.log('login error: ', error);
            if (error.response.status === 401) {
                console.log("401 error");
                setErrorMsg('Username or Password is incorrect.')
            } else {
                console.log("other login error");
                setErrorMsg('Login Error');
            }
        })
    }; // End handleSubmit()

    //console.log(redirectTo);
    if (redirectTo === '' ) {
        return (
            <div>
                <h1>Login Page</h1>
                <p/>
                [<Link to={"/"} > Home </Link> | Login | <Link to={"/signup"} > Signup </Link> | <Link to={"/about"} > About </Link> ]
                
                <form>
                    Username
                    <br/>
                    <input type="text" placeholder="Enter Username" name="username" onChange={e => setUsername(e.target.value)} />
                    <p/>
                    Password
                    <br/>
                    <input type="password" placeholder="Enter Password" name="passsword" onChange={e => setPassword(e.target.value)} />
                    <p/>
                    <div>{errorMsg}</div>
                    <p/>
                    <button type="submit" onClick={handleSubmit}>Login</button>
                </form>
                <p/>
                New user? Please <Link to={"/signup"} > Signup </Link> now! 
            </div>
        )
    } else {
        return (
            <div>
                redirect
                <Redirect to={{ pathname: redirectTo }} />
            </div>
        )
    }
}

export default Login;