import React from 'react';
import SideDecoration from './Side_Decoration/Side_Decoration';
import LoginForm from './LoginForm/LoginForm';
import './LoginPage.css';

const loginPage = () => {

    return <div id="LoginPageContainer">
            <LoginForm />
            <SideDecoration />
        </div>
}

export default loginPage;
