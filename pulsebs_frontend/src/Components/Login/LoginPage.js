import React from 'react';
import { Redirect } from "react-router-dom";
import Lottie from 'react-lottie';
import LoginForm from './LoginForm/LoginForm';
import animationData from '../../Assets/Animations/Login_Animation.json';
import './LoginPage.css';

export default function LoginPage(props) {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

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
    if (authObj.userRole)
        return <Redirect to={'/' + authObj.userRole} />
    else
        return <div id="LoginPageContainer">
            <LoginForm id={id} password={password} handleId={handleId} handlePassword={handlePassword} postLogin={postLogin} />
            <div className="AnimationContainer">
                <Lottie
                    options={defaultOptions}
                    height={350}
                    width={350}
                />
            </div>
        </div>
}


