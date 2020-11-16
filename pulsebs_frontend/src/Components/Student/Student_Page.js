import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import StudentHeader from './StudentHeader/StudentHeader';
import HomePageCalendarStudent from './HomePageCalendar_Student/HomePageCalendar_Student';
import MyLecturesStudent from './MyLectures_Student/MyLectures_Student';
import BookSeat from './BookSeat/BookSeat';
import TutorialStudent from './TutorialStudent/TutorialStudent';
import './Student_Page.css';

class studentPage extends Component {
    
    render() {
        return (
            <div>
                <BrowserRouter>
                <StudentHeader username="UserName" />
                <Switch>
                    <Route path="/student" exact component={HomePageCalendarStudent} />
                    <Route path="/student/my_lectures" exact component={MyLecturesStudent} />
                    <Route path="/student/book_a_seat" exact component={BookSeat} />
                    <Route path="/student/tutorial" exact component={TutorialStudent} />
                    </Switch>
                </BrowserRouter>
            </div>);
    }
}

export default studentPage;