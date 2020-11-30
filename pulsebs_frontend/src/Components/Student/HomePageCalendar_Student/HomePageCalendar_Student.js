import React, { Component } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomEvent from "./CustomEvent";

moment.locale("en-GB");
const localizer = momentLocalizer(moment)

class homePageCalendarStudent extends Component {

  state = {date: new Date(), events: [{  //This will be changed with the function to get the lectures
    title: 'CourseName',
    professor: 'ProfessorName',
    room: 'LectureRoom',
    mode: "present",
    booked: false,
    start: new Date(2020, 10, 2, 10, 30), // 10.00 AM
    end: new Date(2020, 10, 2, 14, 0), // 2.00 PM 
  }]};


  render() {
    return (
      <div className = "StudentCalendarContainer">
        <Calendar 
          format={"DD/MM/YYYY HH:mm"}
          localizer = {localizer}
          culture= 'it'
          toolbar={true}
          events={this.state.events}
          step={30}
          views={['work_week']}
          view='work_week'
          min={new Date(2020, 0, 1, 8, 0)} // 8.00 am
          max={new Date(2020, 0, 1, 19, 30)} //19.30 pm
          date={this.state.date}
          onNavigate={date => this.setState({ date })}
          components = {{event: CustomEvent}}
        />
      </div>
    );
  }
}

export default homePageCalendarStudent;