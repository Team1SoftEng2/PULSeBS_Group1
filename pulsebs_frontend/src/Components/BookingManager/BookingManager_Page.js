import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import BookingManagerHeader from './BookingManagerHeader/BookingManagerHeader';
import ContactTracing from './ContactTracing/ContactTracing';
import MonitorUsage from './MonitorUsage/MonitorUsage';
import './BookingManager_Page.css';

function bookingManagerPage (props) {
    const authObj = props.authObj

    // if(authObj.userRole !== "professor")
    //     return <Redirect to = "/"/>
    // else     
        return <div>
            <BrowserRouter>{authObj.authErr && <Redirect to = "/"/>}</BrowserRouter>
            <BrowserRouter>
                <BookingManagerHeader username="UserName" />
                <Switch>
                    <Route path="/booking_manager" component={MonitorUsage} />
                    <Route path="/booking_manager/monitor_usage" component={MonitorUsage} />
                    <Route path="/booking_manager/contact_tracing" component={ContactTracing} />
                </Switch>
            </BrowserRouter>
        </div>;
    
}

export default bookingManagerPage;