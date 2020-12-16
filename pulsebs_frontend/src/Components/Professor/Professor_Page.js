import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import ProfessorHeader from './ProfessorHeader/ProfessorHeader';
import HomePageCalendarProfessor from './HomePageCalendarProfessor/HomePageCalendarProfessor';
import MyLecturesProfessor from './MyLecturesProfessor/MyLecturesProfessor';
import RegisterAttendance from './Register_Attendance/Register_Attendance';
import Statistics from './Statistics/Statistics';
import TutorialProfessor from './TutorialProfessor/TutorialProfessor';
import './Professor_Page.css';

function professorPage (props) {
    const authObj = props.authObj

    if(authObj.userRole !== "professor")
        return <BrowserRouter><Redirect to = "/"/></BrowserRouter>
    else 
        return <div>
            <BrowserRouter>{authObj.authErr && <Redirect to = "/"/>}</BrowserRouter>
            <BrowserRouter>
                <ProfessorHeader username="UserName"/>
                <Switch>
                    <Route path="/professor" exact component={HomePageCalendarProfessor} />
                    <Route path="/professor/my_lectures" exact component={MyLecturesProfessor} />
                    <Route path="/professor/register_attendance" exact component={RegisterAttendance} />
                    <Route path="/professor/statistics" exact component={Statistics} />
                    <Route path="/professor/tutorial" exact component={TutorialProfessor} />
                </Switch>
            </BrowserRouter>
        </div>;
    
}

export default professorPage;