import React, { useEffect, useState } from 'react';
import {Route, Navigate, withRouter} from 'react-router-dom'; 

const AuthenticatedRoute = (props) => {
    const [state, setState] = useState ({pending:true, username:''});

    const loginState = async () => {
        // let login = await tokenCheck();
        // setState({...login})
    } 

    useEffect(()=>{
        loginState();
    },[state.pending, state.username])
  

    const {
        path,
        component
    } = props;
    console.log("path", path)
    console.log(component.displayName)
    if (state.pending && !state.username) {
        return <div>loading....</div>
    } else if (state.username) {
        return (<Route path={path} element={<component/>} />)
    } else {
        return (<Navigate to='/login' replace={true}/>)
    }
}
 
export default AuthenticatedRoute;