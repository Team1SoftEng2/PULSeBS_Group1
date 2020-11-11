import React from 'react';

const loginForm = () => {

  return <div className= "LoginFormContainer">
    <h1>Lecture Booking</h1>
    <h5>Welcome!<br/>Please Login or Sign Up to continue</h5>
    <div className="FormInputContainer">
    <label for="email">Email</label>
    <input type = "email" id= "email" name= "email"></input>
    </div>
    <div className= "FormInputContainer">
    <label for="email">Password</label>
    <input type = "password" id= "password" name= "password"></input>
    </div>
    <div className="FormButtonContainer">
    <button class="btn btn-outline-primary" id="Login">Login</button>
    </div>
  </div>

}

export default loginForm;