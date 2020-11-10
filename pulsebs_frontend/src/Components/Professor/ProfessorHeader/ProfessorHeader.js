import React from 'react';
import {Route, Link} from 'react-router-dom';

function professorHeader(props) {
    return (
        <div className="ProfessorHeader">
            <h1>Lesson Booker</h1>
            <div className="NavBar">
                <span id="UserGreeting">Welcome {props.username}!</span>
                <Link to="/professor" style={{ textDecoration: 'none' }}><div className="nav_btn">HomePage</div></Link>
                <Link to="/professor/my_lectures" style={{ textDecoration: 'none' }}><div className="nav_btn">My Lectures</div></Link>
                <Link to="/professor/register_attendance" style={{ textDecoration: 'none' }}><div className="nav_btn">Register Attendance</div></Link>
                <Link to="/professor/statistics" style={{ textDecoration: 'none' }}><div className="nav_btn">Statistics</div></Link>
                <Link to="/professor/tutorial" style={{ textDecoration: 'none' }}><div className="nav_btn">Tutorial</div></Link>
                <a href="/" style={{ textDecoration: 'none' }}><div className="nav_btn">Logout</div ></a>
            </div>
        </div>
    );
}

export default professorHeader;