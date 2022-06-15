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

function App() {
  let history = createBrowserHistory();
  
  return (
    <Router>
        <div>
          <Routes>      
            <Route exact path ='/signup' element={<SignUp props={history} />}/>
            <Route path = '/login' element={<Login props={history}/>} />
            <Route path="/" element={<AuthenticatedRoute props={<Dashboard props={history}/>}/>} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
