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
import NoLoginDashboard from './Components/NoLoggedInRoute/NoLoginDashboard';

import { createBrowserHistory } from "history";

import { ApolloProvider } from '@apollo/client'
import { client } from "./ApolloClient/client";

function App() {
  let history = createBrowserHistory();
  console.log(client)
  return (
    <ApolloProvider client={client}>
    <Router>
        <div>
          <Routes>      
            <Route exact path ='/signup' element={<SignUp props={history} />}/>
            <Route path = '/login' element={<Login props={history}/>} />
            <Route path="/" element={<NoLoginDashboard/>}/>
            <Route path="/personalPage" element={<AuthenticatedRoute prop={<><Dashboard/></>}/>}/>
            {/* <Route path="/location" element={<>Dashboard/<</>} /> */}
          </Routes>
        </div>
    </Router>
    </ApolloProvider>
  );
}

export default App;
