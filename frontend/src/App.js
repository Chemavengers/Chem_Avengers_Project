import './App.css';
import React from 'react';
import {  
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Login from './Components/Login';
import SignUp from './Components/SignUp';
import AuthenticatedRoute from './HigherOrderComponents/Authentitication/AuthenticatedRoute';
import Dashboard from './Components/Dashboard';

import { createBrowserHistory } from "history";

import { ApolloClient } from '@apollo/client'
import { client } from "./ApolloClient/client";

function App() {
  let history = createBrowserHistory();
  console.log(client)
  return (
    <ApolloClient client={client}>
    <Router>
        <div>
          <Routes>      
            <Route exact path ='/signup' element={<SignUp props={history} />}/>
            <Route path = '/login' element={<Login props={history}/>} />
            <Route path="/" element={<AuthenticatedRoute props={<Dashboard props={history}/>}/>} />
            {/* <Route path="/location" element={<>Dashboard/<</>} /> */}
          </Routes>
        </div>
    </Router>
    </ApolloClient>
  );
}

export default App;
