import React from 'react';
import './HeaderTitle.css';

function headerTitle(props) {
    return (
        <div>
            <header>
                <h1>Lesson Booker</h1>
                <p id="UserGreeting">Welcome {props.username}!</p>
            </header>
        </div>
    );
}

export default headerTitle;