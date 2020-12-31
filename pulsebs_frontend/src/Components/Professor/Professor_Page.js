import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter, Switch, Redirect, useHistory } from 'react-router-dom';
import ProfessorHeader from './ProfessorHeader/ProfessorHeader';
import HomePageCalendarProfessor from './HomePageCalendarProfessor/HomePageCalendarProfessor';
import MyLecturesProfessor from './MyLecturesProfessor/MyLecturesProfessor';
import RegisterAttendance from './Register_Attendance/Register_Attendance';
import StatisticsPage from './Statistics/StatisticsPage';
import TutorialProfessor from './TutorialProfessor/TutorialProfessor';
import './Professor_Page.css';
import API from '../../api/API';

function ProfessorPage (props) {
    const authObj = props.authObj;
    let history = useHistory();
    let [courses, setCourses] = useState([]);
    let [bookings, setBookings] = useState([]);
    let [lectures, setLectures] = useState([]);
    let [update, setUpdate] = useState(false);


    useEffect( () => API.getTeacherLectures()
                        .then( (res) => {
                            setLectures(res);
                            // getAllProfessors(res);
                        })
                        .catch( (err) => {
                            if (err.status && err.status === 401)
                                history.push('/');
                            else
                                console.log(err);
                        }), [history, authObj.authUser]
    );

    useEffect( () => API.getBookings()
                        .then( (res) => {
                            //setBookings(res);
                            console.log(res);
                        })
                        .catch( (err) => {
                            if (err.status && err.status === 401)
                                history.push('/');
                            else
                                console.log(err);
                        }), [history, update]
    );

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
                    <Route path="/professor/statistics" exact component={StatisticsPage} />
                    <Route path="/professor/tutorial" exact component={TutorialProfessor} />
                </Switch>
            </BrowserRouter>
        </div>;
    
}

export default ProfessorPage;