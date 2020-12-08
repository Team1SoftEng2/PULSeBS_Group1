import React, { Component } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomEvent from "./CustomEvent";
import API from '../../../api/API';

// moment.locale("en-GB");
const localizer = momentLocalizer(moment)

let data;
let time;
let inizio;
let fine;
var lezion = [];
let x = 0;

class homePageCalendarStudent extends Component {
  componentDidMount() {
    lezion = [];
    x = 0;
    this.getAllLectures(this.state.authObj.authUser);
    // lezion=[];
    // x=0; 
    // this.getAllLectures(this.state.authObj.authUser);
  }
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      first: true,
      authObj: this.props.authObj,
      professors: [],
      courses: [],
      lectures: [],
      events: [],
      res: false,
    };
  }

  getBooked(lecture, course, professor, userId) {
    API.getBookings()
      .then((res) => {
        this.setState({ res: res })
        data = moment(lecture.date, "DD-MM-YYYY HH:mm:ss").format("DD-MM-YYYY");
        time = lecture.time
        time = time.split("~")
        inizio = time[0].split(":")
        fine = time[1].split(":")
        data = data.split("-")
        let b = true;
        if (res.filter(s => s.studentId === userId).some(r => r.lectureId === lecture.lectureId)) b = false
        if (!lezion.some(l => l.title === lecture.lectureId)) {
          lezion[x] = {
            title: lecture.lectureId,
            course: course.name,
            professor: professor,
            room: lecture.room,
            mode: lecture.mode,
            booked: b, //true=not booked(green) false=booked(red)
            start: new Date(data[2], data[1] - 1, data[0], inizio[0], inizio[1]),
            end: new Date(data[2], data[1] - 1, data[0], fine[0], fine[1])
          }
        }

        x++;

      }

      )
      .catch((err) => {
        if (err.status && err.status === 401)
          console.log(err);
      })
  }

  getProfessor(lecture, course, userId) {
    API.getUser(lecture.teacherId)
      .then((professors) => {
        this.setState({ professors: professors || [] });
        this.getBooked(lecture, course, professors.name + " " + professors.surname, userId);

      })
      .catch((err) => console.log(err))
  }

  getAllLectures(userId) {
    API.getStudentCourses(userId)
      .then((courses) => {
        this.setState({ courses: courses || [] });
        courses.map((c) => this.getSingleLectures(c, userId));
        this.setState({ events: lezion });
      })
      .catch((errorObj) => {
        console.log(errorObj);
      });
    return this.state.courses;
  }

  getSingleLectures(course, userId) {
    API.getLectures(course.courseId)
      .then((lessons) => {
        this.setState({ lessons: lessons || [] });
        lessons.map((l) => this.getProfessor(l, course, userId))
      }
      )
      .catch((errorObj) => {
        console.log(errorObj);
      });
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
