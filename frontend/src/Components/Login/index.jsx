import React, {  useState, useEffect } from 'react';
import {Link, Navigate, useNavigate  } from 'react-router-dom';

import { setInterval } from 'timers';

import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/GraphQL/mutations';

import { SetLoginToken } from '../../utils/auth'

import { Container, Button, Input } from 'semantic-ui-react'

const Login = ({props}) => {

    let defaultState = { username: "", password: "", errorMessage : "", displayPassword:false }
    let navigate = useNavigate();
    // check for signup input
    // console.log(props)
    // if (props.location.state){
    //     defaultState = { ...props.location.state, errorMessage: "",displayPassword:false  };
    // } else {
    //     ;
    // }

    const [ inputState, setInputState ] = useState(defaultState)
    const [Login, { error, data }] = useMutation(LOGIN);


    const onLogin = async (event) => { 
        event.preventDefault();
        let token = sessionStorage.getItem('Authorization')
        // checks if user is already signed in.... Need to rework this since it needs to take a request to check if the token is correct... 
        if (token) {
            console.log(token)
            setInputState({
                ...inputState,
                ["errorMessage"]: "Already Logged In"
            })
            setInterval(()=>{
                setInputState({
                ...inputState,
                ["errorMessage"]: "bringing you back to the homescreen if you wish to logout please logout at the dashboard....."
            })
            clearInterval()
            },10000)
            navigate("/")
        }
        // checks username and password states are empty
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

        const { data } = await Login({
            variables: { ...loginState }
        })

        if (data.Login) {
            SetLoginToken(data.Login.token);
            
            navigate("/")
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

    useEffect(()=>{}, [inputState])

    return (
        <Container>
            {(inputState.errorMessage !== "") ? <p>{inputState.errorMessage}</p> : ""}
            <p>please input username</p>
            <form onSubmit={onLogin}>
            <Input icon='search' placeholder='username' content={inputState.username} name='username' onChange={(event)=>{
                event.preventDefault();
                const {name, value} = event.target
                setInputState({
                  ...inputState,
                  [name]:value  
                })
            }}/>
            <br/>
            <p>please input password</p>
            <Input icon='search' placeholder='username' content={inputState.password} type={(inputState.displayPassword) ? "text":"password"} name='password' onChange={(event)=>{
                event.preventDefault();
                const {name, value} = event.target
                setInputState({
                  ...inputState,
                  [name]:value  
                })
            }}/>
            <Button content="display password" onClick={(event)=>{
                event.preventDefault();
                setInputState({
                    ...inputState,
                    ["displayPassword"]:!inputState.displayPassword
                })
            }}/>
            <br/>
            <Button type="submit" content="Login"/>
            <br/>
            </form>
            <Link to="/signup"><Button content="New Here? Sign up!"/></Link>
        </Container>
    )
}

export default Login;