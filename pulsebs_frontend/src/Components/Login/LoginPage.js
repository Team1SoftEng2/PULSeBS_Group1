import React from 'react';
import SideDecoration from './Side_Decoration/Side_Decoration';
import LoginForm from './LoginForm/LoginForm';
import './LoginPage.css';
import { Redirect } from "react-router-dom";

export default function LoginPage(props) {
    const authObj = props.authObj;

    const [id, setId] = React.useState("");
    const [password, setPassword] = React.useState("");

    const postLogin = () => {
        authObj.login(id, password);
    }

    const handleId = (value) => {
        setId(value);
        setPassword(password);
    }

    const handlePassword = (value) => {
        setId(id);
        setPassword(value);
    }
    if(authObj.userRole)
        return <Redirect to={'/' + authObj.userRole}/>
    else
        return <div id="LoginPageContainer">
                <LoginForm id={id} password={password} handleId={handleId} handlePassword={handlePassword} postLogin={postLogin} />
                <SideDecoration />
            </div>
}


