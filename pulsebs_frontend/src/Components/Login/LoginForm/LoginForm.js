import React from 'react';

export default function LoginForm({ postLogin, id, password, handleId, handlePassword, ...rest }) {

  return <div className="LoginFormContainer">
    <h1>Lecture Booking</h1>
    <h5>Welcome!<br />Please Login to continue</h5>
    <div className="FormInputContainer">
      <input
        placeholder='Username'
        type="id"
        id="id"
        name="id"
        onChange={e => handleId(e.target.value)}
      />
    </div>
    <div className="FormInputContainer">
      <input
        placeholder='Password'
        type="password"
        id="password"
        name="password"
        onChange={e => handlePassword(e.target.value)}
      />
    </div>
    <div className="FormButtonContainer">
      <button
        className="btn btn-outline-primary"
        id="Login"
        onClick={e => postLogin()}>Login</button>
    </div>
  </div>

}
