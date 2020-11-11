import React from 'react';
import { Link } from 'react-router-dom';
import HeaderTitle from '../../Shared/HeaderTitle/HeaderTitle';

function professorHeader(props) {
    return (
        <div className="ProfessorHeader">
            <HeaderTitle username = {props.username}/>
            <nav className="navbar navbar-dark ">
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