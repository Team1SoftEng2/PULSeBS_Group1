import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter, Switch, Redirect, useHistory } from 'react-router-dom';
import StudentHeader from './StudentHeader/StudentHeader';
import HomePageCalendarStudent from './HomePageCalendar_Student/HomePageCalendar_Student';
import BookSeat from './BookSeat/BookSeat';
import TutorialStudent from './TutorialStudent/TutorialStudent';
import './Student_Page.css';
import API from '../../api/API';


function StudentPage(props){
    const authObj = props.authObj;
    let history = useHistory();
    let [courses, setCourses] = useState([]);
    let [bookings, setBookings] = useState([]);
    let [lectures, setLectures] = useState([]);
    let [update, setUpdate] = useState(false);
    let [professors, setProfessors] = useState([]);

    const triggerAPI = () => setUpdate(!update);

    useEffect( () => API.getStudentCourses(authObj.authUser)
                        .then( (res) => {
                            getAllProfessors(res);
                            setCourses(res);
                            getAllLectures(res);
                            
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
                            setBookings(res);
                        })
                        .catch( (err) => {
                            if (err.status && err.status === 401)
                                history.push('/');
                            else
                                console.log(err);
                        }), [history, update]
    );
    
    const getAllLectures = (coursesList) => {
        let lecturesList = [];
        coursesList.forEach( (course) => {
            API.getLectures(course.courseId)
                .then( (res) => {
                    lecturesList = lecturesList.concat(res);
                    setLectures(lecturesList);
                })
                .catch( (err) => {
                    if (err.status && err.status === 401)
                        history.push('/');
                    else
                        console.log(err);
                });
        });
    };
    
    const getAllProfessors = (courseList) => {
        let professorList = [];
        courseList.forEach( (c) => {
            if(!professorList.filter((p) => p.teacherId === c.teacherId).length){
                API.getUser(c.teacherId).then((res) => {
                    professorList.push(res);
                    setProfessors(professorList);
                });               
            }
        });
    };

    if(authObj.userRole !== "student")
        return <BrowserRouter><Redirect to = "/"/></BrowserRouter>
    else 
        return <div>
            <BrowserRouter>{authObj.authErr && <Redirect to = "/"/>}</BrowserRouter>
            <BrowserRouter>
                <StudentHeader/>
                <Switch>
                    <Route path="/student" exact component={() => <HomePageCalendarStudent {...props} courses={courses} lectures={lectures} bookings={bookings} professors={professors}/>} />
                    <Route path="/student/book_a_seat" exact component={ () => <BookSeat {...props} courses={courses} lectures={lectures} bookings={bookings} professors={professors} triggerAPI={triggerAPI}/>} />
                    <Route path="/student/tutorial" exact component={TutorialStudent} />
                </Switch>
            </BrowserRouter>
        </div>;
}

export default StudentPage;