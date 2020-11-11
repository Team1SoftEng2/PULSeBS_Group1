import React from 'react';
import { Link } from 'react-router-dom';
import HeaderTitle from '../../Shared/HeaderTitle/HeaderTitle';

function bookingManagerHeader(props) {
    return (
        <div className="ProfessorHeader">
            <HeaderTitle username = {props.username}/>
            <nav className="navbar navbar-dark ">
                <Link to="/booking_manager" style={{ textDecoration: 'none' }}><div className="nav-link">HomePage</div></Link>
                <Link to="/booking_manager/monitor_usage" style={{ textDecoration: 'none' }}><div className="nav-link">Monitor System Usage</div></Link>
                <Link to="/booking_manager/contact_tracing" style={{ textDecoration: 'none' }}><div className="nav-link">Contact Tracing</div></Link>
                <a href="/" style={{ textDecoration: 'none' }}><div className="nav-link">Logout</div ></a>
            </nav>
        </div>
    );
}

export default bookingManagerHeader;