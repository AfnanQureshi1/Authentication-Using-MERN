import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContext';
import { serverUrl } from '../../utils/env';
import axios from 'axios';

function PrivateContent() {
    let history = useHistory();
    let loginCtx = useContext(LoginContext);
    let { setLogInState, username } = loginCtx;
    let [message, setMessage] = useState('');

    const logoutHandler = () => {
        var url = serverUrl + '/api/logout';
        axios.get(url)
        .then((res) => {
            console.log("logout ok")
            setLogInState(false, null);
            history.push("/");
        }).catch(err => {
            console.log("Logout error", err);
            setMessage('Logout error!');
        })
    } 

    return (
        <div>
            <h1>Private Page</h1>
            <h3>This is top secret information for {username}!</h3>
            <h3>{message}</h3>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquet diam tortor, id
                consequat mauris ullamcorper eu. Orci varius natoque penatibus et magnis dis
                parturient montes, nascetur ridiculus mus. Pellentesque et dui id justo finibus
                sollicitudin at et metus. Ut feugiat tellus nec metus commodo, sed suscipit nisi
                gravida. Duis eget vestibulum quam, ut porttitor sem. Donec sagittis mi sollicitudin
                turpis semper, et interdum risus lobortis. Vestibulum suscipit nunc non egestas
                tristique. Proin hendrerit efficitur malesuada. Mauris lorem urna, sodales accumsan
                quam non, tristique tempor erat. Nullam non sem facilisis, tempus tortor sit amet,
                volutpat nisl. Ut et turpis non nunc maximus mollis a vitae tortor. Pellentesque
                mattis risus ac quam laoreet cursus. Praesent suscipit orci neque, vestibulum
                tincidunt augue tincidunt non. Duis consequat mattis tortor vitae mattis.
            </p>
            <button onClick={logoutHandler}>Logout</button> 
        </div>
    );    
}

export default PrivateContent;
