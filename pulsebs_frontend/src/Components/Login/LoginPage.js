import React from 'react';
import SideDecoration from './Side_Decoration/Side_Decoration';
import LoginForm from './LoginForm/LoginForm';
import './LoginPage.css';
import API from '../../api/API';
import { useHistory } from "react-router-dom";

export default function LoginPage() {
    
    const history = useHistory();
    
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errMsg, setErrMsg] = React.useState("");

    const postLogin = () => {
        API.login(email, password)
        .then( result => {
            //insert regex here TODO
            history.push({pathname:"/user"});
        })
        .catch((errorObj) => {
            console.log(errorObj);
            //if auth failed
            if(errorObj.errors)
                setErrMsg(errorObj.errors[0].msg);
        });
    }

    /*
    React.useEffect(() => {
        API.isAuthenticated()
        .then( (user) => {
            history.push({pathname:"/user"});
        })
        .catch((err) => {
            //Do nothing
            console.log(err);
        });
    }, [history]);
    */

    const handleEmail = (value) => {
        setEmail(value);
        setPassword(password);
    }

    const handlePassword = (value) => {
        setEmail(email);
        setPassword(value);
    }

    return <div id="LoginPageContainer">
            <LoginForm email={email} password={password} handleEmail={handleEmail} handlePassword={handlePassword} postLogin={postLogin} />
            <SideDecoration />
        </div>
}


