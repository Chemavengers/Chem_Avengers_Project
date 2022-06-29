import React, { useEffect, useState } from 'react';
import {Route, Navigate, withRouter} from 'react-router-dom'; 

import { getProfile } from '../../utils/auth'

const AuthenticatedRoute = ({prop,path}) => {
    const [state, setState] = useState ({pending:true, username:''});

    const LoginState = async () => {
        try
        {
            let { data: { username }} = getProfile()

            if (username.length > 0) {
                let loginState = {pending: false, username}
                setState({...loginState})
            }
        }
        catch
        {
            console.log("failed :(")
        }
    } 
    useEffect(()=>{
        LoginState();
    },[state.pending, state.username])
    console.log(state)
    if (state.pending && state.username.length > 0) {
        return <div>loading....</div>
    } else if (state.username) {
        return prop;
    } else {
        return (<Navigate to='/login' replace={true}/>)
    }
}
 
export default AuthenticatedRoute;