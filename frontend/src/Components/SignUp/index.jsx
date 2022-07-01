import React, { useState, useEffect, useRef } from 'react';

import {Link, useNavigate } from 'react-router-dom';

// import { errorMessages } from '../../utils/failureStrings';

import filter from '../../utils/inputValidation';

import { useMutation } from '@apollo/client';
import { SIGNUP } from '../../utils/GraphQL/mutations';

import { Container, Button, Input, Grid, Divider, Header, Icon, Popup } from 'semantic-ui-react'

const style = {
    borderRadius: 0,
    opacity: 0.7,
    padding: '2em',
}

const SignUp = (props) => {
    let nav = useNavigate();
    const [state, setState] = useState({firstname: "", lastname:"", email:"", username:"", password:"", errorMessage:"", displayPassword:false, failure:false});
    
    const [passwordState, setPasswordState] = useState({ capitalCheck:false, lowerCaseCheck:false, numberCheck:false, specialCharacterCheck:false, inputValueClicked:false})

    const SpecialCharacterRef = useRef({...passwordState})

    const [SignUp, { error, data }] = useMutation(SIGNUP);

    const onSignUp = async () => {

        if (state.failure) {
            setState({
                ...state,
                ["errorMessage"]: "password doesn't meet the requirements....."
            })
            setInterval(()=>{
                setState({
                ...state,
                ["errorMessage"]: ""
            })
            clearInterval()
            },5000)
            return
        }
        let userData = {username: state.username, password:state.password, email:state.email, firstname:state.firstname, lastname:state.lastname}

        const { data } = await SignUp({
            variables: { ...userData  }
        })

        if (data){
            nav("/login", {state: {username: state.username, password: state.password}});
        } else {
            setState({
                ...state,
                ["errorMessage"]: "Username or password failed"
            })
            setInterval(()=>{
                setState({
                ...state,
                ["errorMessage"]: ""
            })
            clearInterval()
            },5000)
            return
        }
    }

    const verifyValue = (regex, value) => {
        
        if (regex.test(state.password)) {
            SpecialCharacterRef.current[value] = true;
        }
         else {
            SpecialCharacterRef.current[value] = false;
        }
    } 

    

    const checkInputValue = () => {
        // checks for lower case values in regex and adds them to the reference object in react
        verifyValue(/[a-z]/g, "lowerCaseCheck")
        // vhecks for upper case values in regex
        verifyValue(/[A-Z]/g, "capitalCheck")
        // checks for special chractes in regex
        verifyValue(/[\!|\@|\?|\_|\-|\*|\~]/, "specialCharacterCheck")
        // checks for special characters in regex
        verifyValue(/[0-9]/g, "numberCheck")

        if(SpecialCharacterRef.current.capitalCheck && SpecialCharacterRef.current.lowerCaseCheck && SpecialCharacterRef.current.numberCheck && SpecialCharacterRef.current.specialCharacterCheck && state.password.length >= 8) {
            setState({
                ...state,
                ["failure"]:false 
            })
            return
        } else {
            setState({
                ...state,
                ["failure"]:true,
                
            })
            return
        }
    }

    useEffect(()=>{
        checkInputValue()
    }, [state.password])

    return (
    <>
    <Grid verticalAlign='middle' padded="vertically" centered  columns={2} rows={2}>
        <Grid.Row centered verticalAlign='middle' columns={1}>
            <Grid.Column>
                <Header as='h1' textAlign='center'>
                    <Icon name='dna' />
                <Header.Content centered>User Login</Header.Content>
                </Header>
            </Grid.Column>
            <Grid.Column>
                {(state.errorMessage.length > 0) ? <p>{state.errorMessage}</p> : ""}
            </Grid.Column>
        </Grid.Row>
        <Grid.Row centered verticalAlign='middle' columns={1}>
                <Input icon='user' placeholder='first name' content={state.firstname} name='firstname' 
                    onChange={(event)=>{
                    const { name, value } = event.target;
                    setState({
                        ...state,
                        [name]: value
                    })
                }}/>
        </Grid.Row>
        <Grid.Row centered verticalAlign='middle' columns={1}>
                <Input icon='user' placeholder="last name" content={state.lastname} onChange={(event)=>{
                    let { name, value } = event.target;
                    console.log(value)
                    // value = filter.clean(value) 
                    setState({
                        ...state,
                        [name]:value
                    })
                }}/>
        </Grid.Row>
        <Grid.Row centered verticalAlign='middle' columns={1}>
            <Input icon="envelope outline" placeholder="email" content={state.email} onChange={(event)=>{
                let { name, value } = event.target;
                // value = filter.clean(value)
                setState({
                    ...state,
                    [name]:value
                })
            }}/>
        </Grid.Row>
        <Grid.Row centered verticalAlign='middle' columns={1}>
            <Input icon="user" placeholder="username" content={state.username} onChange={(event)=>{
                let { name, value } = event.target;
                // value = filter.clean(value)
                setState({
                    ...state,
                    [name]:value
                })
            }}/>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column>
                <Input icon='lock' placeholder='password' type={(state.displayPassword) ? "text":"password"} name='password' onChange={(event)=>{
                        const { name, value } = event.target;
                        setState({
                            ...state,
                            [name]:value
                        })
                        setPasswordState({
                            ...passwordState,
                            ["inputValueClicked"]:true
                        })
                        
                }}/>
            </Grid.Column>
            <Grid.Column>
                    <Popup
                        trigger={<Button icon="eye" onClick={(event)=>{
                        event.preventDefault();
                        setState({
                            ...state,
                            ["displayPassword"]:!state.displayPassword
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
            <Button content="Sign Up" onClick={onSignUp}/>
        </Grid.Row>
            <Divider horizontal>or</Divider>
        <Grid.Row>
            <Link to={"/login"}><Button content="Already have an account? login!"/></Link> 
        </Grid.Row>

    </Grid>
    </>)
}
 
export default SignUp;