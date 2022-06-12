import './App.css';
import React from 'react';
import {  
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Login from './Components/Login';
import SignUp from './Components/SignUp';
import AuthenticatedRoute from './HigherOrderComponents/Authentitication/Authentication/AuthenticatedRoute';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <Router>
        <div>
          <Routes>      
            <Route exact path ='/signup' element={<SignUp/>}/>
            <Route path = '/login' element={<Login/>}/>
            <Route path="/" element={<AuthenticatedRoute props={<Dashboard/>}/>} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
