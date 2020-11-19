import React from 'react';

export default function LoginForm({postLogin, id, password, handleId, handlePassword, ...rest}) {

  return <div className= "LoginFormContainer">
    <h1>Lecture Booking</h1>
    <h5>Welcome!<br/>Please Login or Sign Up to continue</h5>
    <div className="FormInputContainer">
    <label for="id">Username</label>
      <input
        type = "id"
        id= "id" 
        name= "id" 
        onChange={ e => handleId(e.target.value)}
      />
    </div>
    <div className= "FormInputContainer">
    <label for="password">Password</label>
      <input
        type = "password" 
        id= "password" 
        name= "password"
        onChange={ e => handlePassword(e.target.value)}
        />
    </div>
    <div className="FormButtonContainer">
    <button
      class="btn btn-outline-primary"
      id="Login" 
      onClick={e => postLogin()}>Login</button>
    </div>
  </div>

}
