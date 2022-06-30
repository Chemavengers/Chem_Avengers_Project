import React, { useEffect, useState, useRef} from 'react';
import {Route, Navigate, withRouter} from 'react-router-dom'; 

import { getProfile,getToken } from '../../utils/auth'

const AuthenticatedRoute = ({prop}) => {
    const [state, setState] = useState({pending:true, username:''});

    const LoginState = () => {
        try
        {
            let {data:{username}} = getProfile()
            
            let loginState = {pending: false, username}
            setState({...loginState})
        }
        catch
        {
            console.log("failed :(")
        }   
    } 

    const ResetState = () => {
        let resetState = {pending:true, username:""}
        setState({...resetState})
    }

    useEffect(()=>{
        
    },[state.pending, state.username])

    if (state.pending && getToken())
    {
        LoginState();
    }

    if (state.username.length > 0) {
        return prop;
    } else {
        if (!state.pending)
        {
            ResetState();
        }
        return (<Navigate to='/login' replace={true}/>)
    }
}
 
export default AuthenticatedRoute;