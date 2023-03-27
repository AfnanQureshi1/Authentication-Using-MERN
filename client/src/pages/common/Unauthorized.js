import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {   
    return (
        <div>
            <h1>Unauthorized</h1>
            <h3>Error! You are unauthorized to view this page.</h3> 
            <h3>Go back to <Link to="/">home page</Link>.</h3>
        </div>
    );
}

export default Unauthorized;