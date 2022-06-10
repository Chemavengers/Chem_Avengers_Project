import './App.css';
import React from 'react';
import {  
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import Login from './Components/Login';
import SignUp from './Components/SignUp';
import AuthenticatedRoute from './HigherOrderComponents/Authentitication/AuthenticatedRoute';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <Router>
        <div>
          <Routes>      
            <Route exact path ='/signup' element={<SignUp/>}/>
            <Route path = '/login' element={<Login/>}/>
            <AuthenticatedRoute path={'/'} element= {<Dashboard/>} />
            {/* <AuthenticatedRoute path={'/:id'} component = {PersonalProjectDashboard} /> */}
          </Routes>
        </div>
    </Router>
  );
}

export default App;
