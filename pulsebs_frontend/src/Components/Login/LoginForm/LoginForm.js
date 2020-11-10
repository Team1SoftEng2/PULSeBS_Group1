import React from 'react';

const loginForm = () => {

  return <div className= "LoginFormContainer">
    <h1>Lesson Booker</h1>
    <h3>Welcome!<br/>Please Login or Sign Up to continue</h3>
    <label for="email">Email</label>
    <input type = "email" id= "email" name= "email"></input>
    <label for="email">Password</label>
    <input type = "password" id= "password" name= "password"></input>
    <div className="FormButtonsContainer">
    <input type= "submit" id="Login" name="Login" value="Login"></input>
    <input type= "submit" id="Signup" name="Signup" value="Sign Up"></input>
    </div>
  </div>

}

export default loginForm;