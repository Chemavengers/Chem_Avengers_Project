import React, { useEffect, useState } from 'react';
import {Route, Navigate, withRouter} from 'react-router-dom'; 

import { getProfile } from '../../utils/auth'

const AuthenticatedRoute = (props) => {
    const [state, setState] = useState ({pending:true, username:''});

    const LoginState = async () => {
        let login = getProfile()
        console.log(login)
        // setState({...login})
    } 

    useEffect(()=>{
        LoginState();
    },[state.pending, state.username])
  

    const {
        path,
        component
    } = props;

    if (state.pending && !state.username) {
        return <div>loading....</div>
    } else if (state.username) {
        return (<Route path={path} element={<component/>} />)
    } else {
        return (<Navigate to='/login' replace={true}/>)
    }
}
 
export default AuthenticatedRoute;