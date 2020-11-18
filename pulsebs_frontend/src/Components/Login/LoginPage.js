import React from 'react';
import SideDecoration from './Side_Decoration/Side_Decoration';
import LoginForm from './LoginForm/LoginForm';
import './LoginPage.css';
import API from '../../api/API';
import { useHistory } from "react-router-dom";

export default function LoginPage() {
    
    const history = useHistory();
    
    const [id, setId] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errMsg, setErrMsg] = React.useState("");

    const postLogin = () => {
        API.login(id, password)
        .then( result => {
            
            //NB!!! PUT HERE REGEX INSTEAD OF SWITCH !!!

            switch (result.userId.charAt(0)) {
                case "s":
                    history.push({pathname:"/student"});
                    break;
                case "t":
                    history.push({pathname:"/professor"});
                    break;
                default:
                    break;
            }
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

    const handleId = (value) => {
        setId(value);
        setPassword(password);
    }

    const handlePassword = (value) => {
        setId(id);
        setPassword(value);
    }

    return <div id="LoginPageContainer">
            <LoginForm id={id} password={password} handleId={handleId} handlePassword={handlePassword} postLogin={postLogin} />
            <SideDecoration />
        </div>
}


