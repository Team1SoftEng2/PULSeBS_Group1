import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import BookingManagerHeader from './BookingManagerHeader/BookingManagerHeader';
import ContactTracing from './ContactTracing/ContactTracing';
import MonitorUsage from './MonitorUsage/MonitorUsage';
import Bookings from './Bookings';
import Attendance from './Attendance';
import DelLectures from './DelLectures';
import './BookingManager_Page.css';

function bookingManagerPage (props) {
    const authObj = props.authObj

    if (authObj.userRole !== "booking_manager")
        return <Redirect to="/" />
    else
        return <div>
            <BrowserRouter>{authObj.authErr && <Redirect to="/" />}</BrowserRouter>
            <BrowserRouter>
                <BookingManagerHeader username="UserName" />
                <Switch>
                    <Route path="/booking_manager" exact component={MonitorUsage} />
                    <Route path="/booking_manager/monitor_usage" exact component={MonitorUsage} />
                    <Route path="/booking_manager/contact_tracing" exact component={ContactTracing} />
                    <Route path="/booking_manager/bookings" exact component={Bookings} />
                    <Route path="/booking_manager/lectures" exact component={DelLectures} />
                    <Route path="/booking_manager/attendance" exact component={Attendance} />
                </Switch>
            </BrowserRouter>
        </div>;

}

export default bookingManagerPage;