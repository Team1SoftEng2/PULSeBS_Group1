import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import LoginPage from './Components/Login/LoginPage' ;
import StudentPage from './Components/Student/Student_Page';
import ProfessorPage from './Components/Professor/Professor_Page';
import SuppOfficerPage from './Components/SuppOfficer/SuppOfficer_Page';
import BookingManagerPage from './Components/BookingManager/BookingManager_Page';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Route path="/" exact component= {LoginPage}/>
      <Route path="/student" exact component= {StudentPage}/>
      <Route path="/professor" exact component= {ProfessorPage}/>
      <Route path="/support_officer" exact component= {SuppOfficerPage}/>
      <Route path="/booking_manager" exact component= {BookingManagerPage}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
