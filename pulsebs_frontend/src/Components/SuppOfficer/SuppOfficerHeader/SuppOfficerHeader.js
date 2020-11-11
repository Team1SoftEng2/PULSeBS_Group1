import React from 'react';
import { Link } from 'react-router-dom';
import HeaderTitle from '../../Shared/HeaderTitle/HeaderTitle';

function suppOfficerHeader(props) {
  return (
    <div className="SuppOfficerHeader">
      <HeaderTitle username={props.username} />
      <nav className="navbar navbar-dark ">
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