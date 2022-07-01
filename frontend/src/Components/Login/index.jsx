import React, {  useState, useEffect } from 'react';
import {Link, Navigate, useNavigate  } from 'react-router-dom';

import { setInterval } from 'timers';

import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/GraphQL/mutations';

import { SetLoginToken } from '../../utils/auth'

import { Container, Button, Input, Grid, Divider, Header, Icon, Popup } from 'semantic-ui-react'

const style = {
    borderRadius: 0,
    opacity: 0.7,
    padding: '2em',
  }

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
            <Grid verticalAlign='middle' padded="vertically" centered  columns={2}>
                <Grid.Row>
                    <Grid.Column centered verticalAlign='middle' padded="vertically">
                        <Header as='h1'>
                        <Icon name='dna' />
                        <Header.Content>User Login</Header.Content>
                        </Header>
                            {(inputState.errorMessage !== "") ? <p>{inputState.errorMessage}</p> : ""}
                    </Grid.Column>
                </Grid.Row>

                <Grid.Column verticalAlign="middle" centered>
                    <Grid verticalAlign='middle' padded="vertically" centered  columns={1} rows={2}>
                        <form onSubmit={onLogin}>
                        <Grid.Row>
                            <Input icon='user' placeholder='username' content={inputState.username} name='username' onChange={(event)=>{
                                event.preventDefault();
                                const {name, value} = event.target
                                setInputState({
                                ...inputState,
                                [name]:value  
                                })
                            }}/>
                        </Grid.Row>
                        <Divider horizontal></Divider>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Input icon='lock' placeholder='password' content={inputState.password} type={(inputState.displayPassword) ? "text":"password"} name='password' onChange={(event)=>{
                                    event.preventDefault();
                                    const {name, value} = event.target
                                    setInputState({
                                    ...inputState,
                                    [name]:value  
                                    })
                                }}/>
                            </Grid.Column>
                            <Grid.Column>
                                <Popup
                                    trigger={<Button icon="eye" onClick={(event)=>{
                                        event.preventDefault();
                                        setInputState({
                                            ...inputState,
                                            ["displayPassword"]:!inputState.displayPassword
                                        })
                                    }}/>}
                                    content='Display Password'
                                    style={style}
                                    inverted
                                />
                            </Grid.Column>   
                        </Grid.Row>
                        <Divider horizontal></Divider>
                        <Grid.Row>
                            <Button type="submit" content="Login"/>
                        </Grid.Row>
                        </form>
                    </Grid>
                    <Divider horizontal>Or</Divider>
                    <Link to="/signup"><Button content="New Here? Sign up!"/></Link>
                </Grid.Column>
            </Grid>
        </Container>
    )
}

export default Login;