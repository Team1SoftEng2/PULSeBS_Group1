import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import StudentHeader from './StudentHeader/StudentHeader';
import HomePageCalendarStudent from './HomePageCalendar_Student/HomePageCalendar_Student';
import BookSeat from './BookSeat/BookSeat';
import TutorialStudent from './TutorialStudent/TutorialStudent';
import './Student_Page.css';


function studentPage(props){
    const authObj = props.authObj;
    console.log(authObj);
    if(authObj.userRole !== "student")
        return <Redirect to = "/"/>
    else 
        return <div>
            {authObj.authErr && <Redirect to = "/"/>}
            <BrowserRouter>
                <StudentHeader/>
                <Switch>
                    <Route path="/student" exact component={() => <HomePageCalendarStudent {...props}/>} />
                    <Route path="/student/book_a_seat" exact component={ () => <BookSeat {...props}/>} />
                    <Route path="/student/tutorial" exact component={TutorialStudent} />
                </Switch>
            </BrowserRouter>
        </div>;
}

export default studentPage;