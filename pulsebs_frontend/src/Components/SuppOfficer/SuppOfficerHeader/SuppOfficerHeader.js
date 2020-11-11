import React from 'react';
import {Link} from 'react-router-dom';

function suppOfficerHeader(props) {
  return (
    <div className= "SuppOfficerHeader">
      <h1>Lesson Booker</h1>
      <div className= "NavBar">
        <span id ="UserGreeting">Welcome {props.username}!</span>
        <Link to= "/support_officer" style={{ textDecoration: 'none' }}><div className="nav_btn">HomePage</div></Link>
        <Link to= "/support_officer/setup" style={{ textDecoration: 'none' }}><div className="nav_btn">System Setup</div></Link>
        <Link to= "/support_officer/update" style={{ textDecoration: 'none' }}><div className="nav_btn">System Update</div></Link>
        <Link to= "/support_officer/configure" style={{ textDecoration: 'none' }}><div className="nav_btn">Change Configuration</div></Link>
        <a href= "/" style={{ textDecoration: 'none' }}><div className="nav_btn">Logout</div ></a>
      </div>
      
    </div>
  );
}

export default suppOfficerHeader;