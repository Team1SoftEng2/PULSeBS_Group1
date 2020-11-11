import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import BookingManagerHeader from './BookingManagerHeader/BookingManagerHeader';
import ContactTracing from './ContactTracing/ContactTracing';
import MonitorUsage from './MonitorUsage/MonitorUsage';
import './BookingManager_Page.css';

class bookingManagerPage extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                <BookingManagerHeader username="UserName" />
                <Switch>
                    <Route path="/booking_manager" exact component={MonitorUsage} />
                    <Route path="/booking_manager/monitor_usage" exact component={MonitorUsage} />
                    <Route path="/booking_manager/contact_tracing" exact component={ContactTracing} />
                    </Switch>
                </BrowserRouter>
            </div>);
    }
}

export default bookingManagerPage;