import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = (props) => {
    return (
    <div>
        <h1>In the signup part</h1>
        <Link to="/"><button>New Here? Sign up!</button></Link>
    </div>
     );
}
 
export default SignUp;