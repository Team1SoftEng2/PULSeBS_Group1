import React, { Component } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import API from '../../../api/API';

// moment.locale("en-GB");
const localizer = momentLocalizer(moment)

let data;
let time;
let inizio;
let fine;
let room;
let mode;
var lezion = [];
let x = 0;

async function getAllProfessors(props) {
  const professors = await Promise.all(props.lectures.map(async (lecture) => await API.getUser(lecture.teacherId)));
  return professors;
}

async function getAllData(props){
  const professors=await getAllProfessors(props);
  lezion=[];
  x=0;
  props.lectures.map( (l) => {
    data = moment(l.date, "DD-MM-YYYY HH:mm:ss").format("DD-MM-YYYY");
    time = l.time
    time = time.split("~")
    inizio = time[0].split(":")
    fine = time[1].split(":")
    data = data.split("-")
    mode=props.lectures.filter(m=>m.mode===l.mode)[0].mode
    room='Virtual Lesson'
    if (mode==="present" ) room=props.lectures.filter(r=>r.lectureId===l.lectureId)[0].room;
    let b=true
    if(props.bookings.filter(b=>b.studentId===props.authObj.authUser).some(r=>r.lectureId===l.lectureId))b=false
    let id=props.courses.filter(c=>c.courseId===l.courseId)[0].teacherId;
    let p=professors.find(f=>f.userId===id);
  lezion[x] = {
    course : props.courses.filter(c=>c.courseId===l.courseId)[0].name,
    professor:p.name + " " + p.surname,
    room : room,
    mode:mode,
    booked: b,
    start : new Date(data[2], data[1] - 1, data[0], inizio[0], inizio[1]),
    end : new Date(data[2], data[1] - 1, data[0], fine[0], fine[1]),        
  }
  x++
  });
    
}

function CustomEvent(lecture) {
  return (

      <div>
          <p><b>{lecture.event.course}</b><br/>{lecture.event.professor}</p>
              {(lecture.event.mode === "present") ? lecture.event.room : "Virtual Classroom"}
      </div>
  );
}

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
    getAllData(this.props).then(()=>{this.setState({events:lezion})});
  }

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

