import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import SuppOfficerHeader from './SuppOfficerHeader/SuppOfficerHeader'
import SystemSetup from './SystemSetup/SystemSetup';
import SystemUpdate from './SystemUpdate/SystemUpdate';
import SystemConfigure from './SystemConfigure/SystemConfigure';
import './SuppOfficer_Page.css';

function suppOfficerPage (props) {
    const authObj = props.authObj

    // if(authObj.userRole !== "professor")
    //     return <Redirect to = "/"/>
    // else     
        return <div>
            <BrowserRouter>{authObj.authErr && <Redirect to = "/"/>}</BrowserRouter>
            <BrowserRouter>
                <SuppOfficerHeader username="UserName" />
                <Switch>
                    <Route path="/support_officer" component={SystemConfigure} />
                    <Route path="/support_officer/setup" component={SystemSetup} />
                    <Route path="/support_officer/update" component={SystemUpdate} />
                    <Route path="/support_officer/configure" component={SystemConfigure} />
                </Switch>
            </BrowserRouter>
        </div>;
    
}

export default suppOfficerPage;