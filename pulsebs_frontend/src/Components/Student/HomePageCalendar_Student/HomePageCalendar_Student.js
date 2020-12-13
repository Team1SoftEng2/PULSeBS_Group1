import React, { Component } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import API from '../../../api/API';

// moment.locale("en-GB");
const localizer = momentLocalizer(moment)

class homePageCalendarStudent extends Component {
  constructor(props){
    super(props);
    this.state = {
      date: new Date(),
      first:true,
      authObj:this.props.authObj,
      courses: this.props.courses,
      lectures:this.props.lectures,
      events:[],
      professors:[],
      res:false,
    };
  }

  componentDidMount(){
    this.getAllData();
  };

  getEventStyle = (event, start, end, isSelected) => {
    let newStyle = {
      backgroundColor: (event.mode === "present") ? (event.booked ? "#179873" : "#E3170A") : "#B9E6FF",
      color: (event.mode === "present") ? '#F6F6F6' : "black",
      borderRadius: "5px",
      border: "none"
    };

    return {
      className: "CustomEventContainer " + (event.mode === "present") ? (event.booked ? "Booked" : "Unbooked") : "Online",
      style: newStyle
    };
  };

  getAllProfessors = async () => {
    const professors = await Promise.all(this.props.lectures.map(async (lecture) => await API.getUser(lecture.teacherId)));
    return professors;
  };
  
  getAllData = async () => {
    const professors = await this.getAllProfessors();
    let lezion = this.props.lectures.map( (l) => {
      let data = moment(l.date, "DD-MM-YYYY HH:mm:ss").format("DD-MM-YYYY");
      let time = l.time.split("~");
      let inizio = time[0].split(":");
      let fine = time[1].split(":");
      data = data.split("-");
      let booked = true;
      if(this.props.bookings.filter(b => b.studentId === this.props.authObj.authUser).some(r => r.lectureId === l.lectureId)) booked = false;
      let p = professors.find(f => f.userId === l.teacherId);
      return {
        course : this.props.courses.filter(c => c.courseId === l.courseId)[0].name,
        professor: p.name + " " + p.surname,
        room : (l.mode === "present") ? l.room : 'Virtual Classroom',
        mode: l.mode,
        booked: booked,
        start : new Date(data[2], data[1] - 1, data[0], inizio[0], inizio[1]),
        end : new Date(data[2], data[1] - 1, data[0], fine[0], fine[1]),        
      }
    });
    this.setState({events: lezion});
  }

  render() {

    return (
      <div className="StudentCalendarContainer">
        <div className="StudentCalendarLegend">
          <div className="LegendElement"><div class='box red'></div>= Booked lesson</div>
          <div className="LegendElement"><div class='box green'></div>= Not Booked lesson</div>
          <div className="LegendElement"><div class='box blue'></div>= Online lesson</div>
        </div>
        {//console.log(this.state.events)
        }
        <Calendar
          style={{ height: 650 }}
          format={"DD/MM/YYYY HH:mm"}
          localizer={localizer}
          culture='it'
          toolbar={true}
          events={this.state.events}
          step={30}
          views={['work_week']}
          view='work_week'
          onView={() => { }}
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

