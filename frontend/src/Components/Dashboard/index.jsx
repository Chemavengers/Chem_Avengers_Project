import React from 'react';
import { Container,Button } from 'semantic-ui-react'

import { SignOut } from '../../utils/auth'

const Dashboard = () => {
    const LogOut = () => {
        SignOut();
    } 

    return (
    <>
        <Container>
            <h1>here!!!</h1>
            <p>tag</p>
            <Button content="Sign Out" onClick={()=>{LogOut()}}/>
        </Container>

    </> );
}
 
export default Dashboard;