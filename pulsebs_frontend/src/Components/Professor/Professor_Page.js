import React, { Component } from 'react';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom';
import ProfessorHeader from './ProfessorHeader/ProfessorHeader';
import HomePageCalendarProfessor from './HomePageCalendar_Professor/HomePageCalendare_Professor';
import MyLecturesProfessor from './MyLectures_Professor/MyLectures_Professor';
import RegisterAttendance from './Register_Attendance/Register_Attendance';
import Statistics from './Statistics/Statistics';
import TutorialProfessor from './TutorialProfessor/TutorialProfessor';
import './Professor_Page.css';

class professorPage extends Component {
    render() {
        return (
            <div>

                <BrowserRouter>
                <ProfessorHeader username="UserName" />
                <Switch>
                    <Route path="/professor" exact component={HomePageCalendarProfessor} />
                    <Route path="/professor/my_lectures" exact component={MyLecturesProfessor} />
                    <Route path="/professor/register_attendance" exact component={RegisterAttendance} />
                    <Route path="/professor/statistics" exact component={Statistics} />
                    <Route path="/professor/tutorial" exact component={TutorialProfessor} />
                    </Switch>
                </BrowserRouter>
            </div>);
    }
}

export default professorPage;