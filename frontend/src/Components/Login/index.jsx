import React from 'react';
import { Link } from 'react-router-dom';

const Login = (props) => {
    return (
    <div>
        <p>Hello in login</p>

        <Link to="/signup"><button>New Here? Sign up!</button></Link>
    </div> 
    );
}
 
export default Login;