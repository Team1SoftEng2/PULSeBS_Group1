import React from 'react';
import { Link } from 'react-router-dom';

function suppOfficerHeader() {
  return (
    <div className="SuppOfficerHeader">
      <nav className="navbar navbar-dark ">
        <span className='navbar-brand'><h2>Lecture Booking</h2></span>
        <Link to="/support_officer" style={{ textDecoration: 'none' }}><div className="nav-link">HomePage</div></Link>
        <Link to="/support_officer/setup" style={{ textDecoration: 'none' }}><div className="nav-link">System Setup</div></Link>
        <Link to="/support_officer/update" style={{ textDecoration: 'none' }}><div className="nav-link">System Update</div></Link>
        <Link to="/support_officer/configure" style={{ textDecoration: 'none' }}><div className="nav-link">Change Configuration</div></Link>
        <a href="/" style={{ textDecoration: 'none' }}><div className="nav-link">Logout</div ></a>
      </nav>

    </div>
  );
}

export default suppOfficerHeader;