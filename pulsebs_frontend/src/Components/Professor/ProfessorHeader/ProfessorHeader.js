import React from 'react';
import { Link } from 'react-router-dom';

function professorHeader () {
    return (
        <div className="ProfessorHeader">
            <nav className="navbar navbar-dark ">
                <span className='navbar-brand'><h2>Lecture Booking</h2></span>
                <Link to="/professor" style={{ textDecoration: 'none' }}><div className="nav-link">HomePage</div></Link>
                <Link to="/professor/my_lectures" style={{ textDecoration: 'none' }}><div className="nav-link">My Lectures</div></Link>
                <Link to="/professor/register_attendance" style={{ textDecoration: 'none' }}><div className="nav-link">Register Attendance</div></Link>
                <Link to="/professor/statistics" style={{ textDecoration: 'none' }}><div className="nav-link">Statistics</div></Link>
                <Link to="/professor/tutorial" style={{ textDecoration: 'none' }}><div className="nav-link">Tutorial</div></Link>
                <a href="/" style={{ textDecoration: 'none' }}><div className="nav-link">Logout</div ></a>
            </nav>
        </div>
    );
}

export default professorHeader;