import React, {useState} from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import LoginPage from './Components/Login/LoginPage' ;
import StudentPage from './Components/Student/Student_Page';
import ProfessorPage from './Components/Professor/Professor_Page';
import SuppOfficerPage from './Components/SuppOfficer/SuppOfficer_Page';
import BookingManagerPage from './Components/BookingManager/BookingManager_Page';
import './App.css';
import API from './api/API'

function App() {


  const [authUser, setAuthUser] = useState(undefined)
  const [authErr, setAuthErr] = useState(undefined);
  const [userRole, setUserRole] = useState(undefined);

  const setRole = (user) => { 
    // NB!!! PUT HERE REGEX INSTEAD OF SWITCH !!!
    switch (user.userId.charAt(0)) {
          case "s":
            setUserRole("student");
            break;
          case "t":
            setUserRole("professor");
            break;
          default:
            break;
        }
  }

  const login = (usr, pwd) => {
    API.login(usr, pwd)
      .then( (user) => {
        setAuthUser(user.userId);
        setAuthErr(undefined);
       
        setRole(user);
      })
      .catch((errorObj) => {
          console.log(errorObj);
          //if auth failed
          if(errorObj.errors){
            const err0 = errorObj.errors[0];
            setAuthErr(err0)
          }
      });
  }

  const logout = () => {
    API.userLogout().then(() => {
        setAuthUser(undefined);
        setAuthErr(undefined);
        setUserRole(undefined);
    });
  };

  // useEffect(() => {
  //   API.isAuthenticated()
  //     .then((user) => {
  //         setAuthUser(user)
  //         setRole(user);
  //     })
  //     .catch((err) => setAuthErr(err.errObj.errors[0]));
  // }, []);

  const authObj = {
    authUser: authUser,
    authErr: authErr,
    userRole: userRole,
    login: login,
    logout: logout
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/">
          <LoginPage authObj={authObj}/>
        </Route>
        <Route path="/student">
          <StudentPage authObj={authObj}/>
        </Route>
        <Route path="/professor">
          <ProfessorPage authObj={authObj}/>
        </Route>
        <Route path="/support_officer">
          <SuppOfficerPage authObj={authObj}/>
        </Route>
        <Route path="/booking_manager">
          <BookingManagerPage authObj={authObj}/>
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
