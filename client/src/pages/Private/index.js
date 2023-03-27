import React, {useContext} from 'react';
import { LoginContext } from '../../contexts/LoginContext';
import PrivateContent from './privateContent';
import Unauthorized from '../common/Unauthorized';

function Private() {
    
    let loginCtx = useContext(LoginContext);
    let { loggedIn } = loginCtx;

    return (
        <>
            { loggedIn ? <PrivateContent /> : <Unauthorized /> }
        </>
    );
    
}

export default Private;
