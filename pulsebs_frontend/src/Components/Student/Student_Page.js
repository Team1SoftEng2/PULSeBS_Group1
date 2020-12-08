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

    useEffect( () => API.getStudentCourses(authObj.authUser)
                        .then( (res) => {
                            setCourses(res);
                            getAllLectures(res);
                        })
                        .catch( (err) => {
                            if (err.status && err.status === 401)
                                history.push('/');
                            else
                                console.log(err);
                        }), [history]
    );

    useEffect( () => API.getBookings()
                        .then( (res) => {
                            setBookings(res)
                        })
                        .catch( (err) => {
                            if (err.status && err.status === 401)
                                history.push('/');
                            else
                                console.log(err);
                        }), [history]
    );
    
    const getAllLectures = (coursesList) => {
        coursesList.forEach( (course) => {
            API.getLectures(course.courseId)
                .then( (res) => {
                    setLectures(lectures.concat(res));
                })
                .catch( (err) => {
                    if (err.status && err.status === 401)
                        history.push('/');
                    else
                        console.log(err);
                });
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
                    <Route path="/student" exact component={() => <HomePageCalendarStudent {...props} courses={courses} lectures={lectures} bookings={bookings}/>} />
                    <Route path="/student/book_a_seat" exact component={ () => <BookSeat {...props} courses={courses} lectures={lectures} bookings={bookings}/>} />
                    <Route path="/student/tutorial" exact component={TutorialStudent} />
                </Switch>
            </BrowserRouter>
        </div>;
}

export default StudentPage;