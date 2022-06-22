import React, {  useState, useEffect } from 'react';
import {Link } from 'react-router-dom';

import { LoginCheck } from '../../utils/auth'; 
import { setInterval } from 'timers';

import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/GraphQL/mutations';

const Login = ({props}) => {

    let defaultState = {}
    // check for signup input
    if (props.location.state){
        defaultState = { ...props.location.state, errorMessage: "",displayPassword:false  };
    } else {
        defaultState = { username: "", password: "", errorMessage : "", displayPassword:false };
    }

    const [ inputState, setInputState ] = useState(defaultState)
    const [Login, { error, data }] = useMutation(LOGIN);


    const onLogin = async (event) => { 
        event.preventDefault();
        console.log(inputState.password)
        let token = sessionStorage.getItem('Authorization')
        // checks if user is already signed in.... Need to rework this since it needs to take a request to check if the token is correct... 
        if (token) {
            token = "";
            setInputState({
                ...inputState,
                ["errorMessage"]: "Already Logged In"
            })
            setInterval(()=>{
                setInputState({
                ...inputState,
                ["errorMessage"]: ""
            })
            clearInterval()
            },10000)
            props.history.push('/')
        }

        if (inputState.username == "" && inputState.password == "") {
            setInputState({
                ...inputState,
                ["errorMessage"]: "Username or password can't be left empty"
            })
            setInterval(()=>{
                setInputState({
                ...inputState,
                ["errorMessage"]: ""
            })
            clearInterval()
            },5000)
            return
        }
        let loginState = {username:inputState.username || "", password:inputState.password || ""}
        let result = await LoginCheck()

        const { data } = await Login({
            variables: { ...loginState }
        })

        console.log(data)

        if (data === true) {
            console.log("here")
            props.history.push('/')
        } else {
            setInputState({
                ...inputState,
                ["errorMessage"]: "Username or password are wrong. please type in the correct information"
            })
            setInterval(()=>{
                setInputState({
                ...inputState,
                ["errorMessage"]: ""
            })
            clearInterval()
            },5000)
            return
        }
    }

    return (
        <div>
            {(inputState.errorMessage !== "") ? <p>{inputState.errorMessage}</p> : ""}
            <p>please input username</p>
            <form onSubmit={onLogin}>
            <input value={inputState.username} name='username' onChange={(event)=>{
                const {name, value} = event.target
                setInputState({
                  ...inputState,
                  [name]:value  
                })
            }}/>
            <br/>
            <p>please input password</p>
            <input value={inputState.password} type={(inputState.displayPassword) ? "text":"password"} name='password' onChange={(event)=>{
                const {name, value} = event.target
                setInputState({
                  ...inputState,
                  [name]:value  
                })
            }}/>
            <button onClick={()=>{
                setInputState({
                    ...inputState,
                    ["displayPassword"]:!inputState.displayPassword
                })
            }}></button>
            <br/>
            <button type="submit">Login</button>
            <br/>
            </form>
            <Link to="/signup"><button>New Here? Sign up!</button></Link>
        </div>
    )
}

export default Login;