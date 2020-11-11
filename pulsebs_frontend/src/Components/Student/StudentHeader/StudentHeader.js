import React from 'react';
import { Link } from 'react-router-dom';
import HeaderTitle from '../../Shared/HeaderTitle/HeaderTitle';

function studentHeader(props) {
  return (
    <div className="StudentHeader">
      <HeaderTitle username = {props.username}/>
      <nav className="navbar navbar-dark ">
          <Link to="/student" style={{ textDecoration: 'none' }}><div className="nav-link">HomePage</div></Link>
          <Link to="/student/my_lectures" style={{ textDecoration: 'none' }}><div className="nav-link">My Lectures</div></Link>
          <Link to="/student/book_a_seat" style={{ textDecoration: 'none' }}><div className="nav-link">Book a seat</div></Link>
          <Link to="/student/tutorial" style={{ textDecoration: 'none' }}><div className="nav-link">Tutorial</div></Link>
          <a href="/" style={{ textDecoration: 'none' }}><div className="nav-link">Logout</div ></a>
      </nav>

    </div>
  );
}

export default studentHeader;