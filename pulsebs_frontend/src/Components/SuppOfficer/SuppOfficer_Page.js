import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import SuppOfficerHeader from './SuppOfficerHeader/SuppOfficerHeader'
import SystemSetup from './SystemSetup/SystemSetup';
import SystemUpdate from './SystemUpdate/SystemUpdate';
import SystemConfigure from './SystemConfigure/SystemConfigure';
import './SuppOfficer_Page.css';

class suppOfficerPage extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                <SuppOfficerHeader username="UserName" />
                <Switch>
                    <Route path="/support_officer" exact component={SystemConfigure} />
                    <Route path="/support_officer/setup" exact component={SystemSetup} />
                    <Route path="/support_officer/update" exact component={SystemUpdate} />
                    <Route path="/support_officer/configure" exact component={SystemConfigure} />
                    </Switch>
                </BrowserRouter>
            </div>);
    }
}

export default suppOfficerPage;