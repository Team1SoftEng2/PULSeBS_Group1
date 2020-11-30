import React, { Component } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomEvent from "./CustomEvent";

moment.locale("en-GB");
const localizer = momentLocalizer(moment)

class homePageCalendarStudent extends Component {

  state = {
    date: new Date(), events: [{  //This will be changed with the function to get the lectures
      course: 'CourseName',
      professor: 'ProfessorName',
      room: 'LectureRoom',
      mode: "present",
      booked: true,
      start: new Date(2020, 11, 1, 10, 30), // 10.00 AM
      end: new Date(2020, 11, 1, 14, 0), // 2.00 PM 
    },
    {
      course: 'CourseName2',
      professor: 'ProfessorName2',
      room: 'LectureRoom2',
      mode: "online",
      booked: false,
      start: new Date(2020, 11, 2 , 10, 30), // 10.00 AM
      end: new Date(2020, 11, 2, 14, 0), // 2.00 PM 
    }
  ]
  };

   getEventStyle = (event, start, end, isSelected) => {
    let newStyle = {
      backgroundColor: (event.mode === "present")?(event.booked ?"#179873": "#E3170A"): "#B9E6FF",
      color: (event.mode === "present")?'#F6F6F6': "black",
      borderRadius: "5px",
      border: "none"
    };

    return {
      className:"CustomEventContainer " + (event.mode === "present")?(event.booked ? "Booked" : "Unbooked"): "Online",
      style: newStyle
    };
  };

  render() {
    return (
      <div className="StudentCalendarContainer">
        <div className = "StudentCalendarLegend">
        <div className = "LegendElement"><div class='box red'></div>= Booked lesson</div>
        <div className = "LegendElement"><div class='box green'></div>= Not Booked lesson</div>
        <div className = "LegendElement"><div class='box blue'></div>= Online lesson</div>
        </div>
        <Calendar
          format={"DD/MM/YYYY HH:mm"}
          localizer={localizer}
          culture='it'
          toolbar={true}
          events={this.state.events}
          step={30}
          views={['work_week']}
          view='work_week'
          min={new Date(2020, 0, 1, 8, 0)} // 8.00 am
          max={new Date(2020, 0, 1, 19, 30)} //19.30 pm
          date={this.state.date}
          onNavigate={date => this.setState({ date })}
          components={{ event: CustomEvent }}
          eventPropGetter={this.getEventStyle}
        />
      </div>
    );
  }
}

export default homePageCalendarStudent;