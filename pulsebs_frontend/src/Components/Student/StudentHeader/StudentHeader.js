import React from 'react';
import {Link} from 'react-router-dom';

function studentHeader(props) {
  return (
    <div className= "StudentHeader">
      <h1>Lesson Booker</h1>
      <div className= "NavBar">
        <span id ="UserGreeting">Welcome {props.username}!</span>
        <Link to= "/student" style={{ textDecoration: 'none' }}><div className="nav_btn">HomePage</div></Link>
        <Link to= "/student/my_lectures" style={{ textDecoration: 'none' }}><div className="nav_btn">My Lectures</div></Link>
        <Link to= "/student/book_a_seat" style={{ textDecoration: 'none' }}><div className="nav_btn">Book a seat</div></Link>
        <Link to= "/student/tutorial" style={{ textDecoration: 'none' }}><div className="nav_btn">Tutorial</div></Link>
        <a href= "/" style={{ textDecoration: 'none' }}><div className="nav_btn">Logout</div ></a>
      </div>
      
    </div>
  );
}

export default studentHeader;