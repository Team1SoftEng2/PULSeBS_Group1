import React, { Component } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import API from '../../../api/API';

// moment.locale("en-GB");
const localizer = momentLocalizer(moment, {
  week: {
      dow: 1,
      doy: 1,
  },
});

function CustomEvent(lecture) {
  return (

    <div>
      <p><b>{lecture.event.course}</b><br />{lecture.event.professor}</p>
      {(lecture.event.mode === "present") ? lecture.event.room : "Virtual Classroom"}
    </div>
  );
}

class homePageCalendarStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'week',
      date: new Date(),
      first: true,
      authObj: this.props.authObj,
      courses: this.props.courses,
      lectures: this.props.lectures,
      events: [],
      professors: [],
      res: false,
    };
  }

  componentDidMount() {
    this.getAllData();
  }

  getEventStyle = (event, start, end, isSelected) => {
    let newStyle;
    if(event.mode === "present") {
      if(event.booked) {
        newStyle = {
          backgroundColor: "#179873",
          color: '#F6F6F6',
          borderRadius: "5px",
          border: "none"
        }
      }
      if(event.waiting) {
        newStyle = {
          backgroundColor: "#E3850A",
          color: '#F6F6F6',
          borderRadius: "5px",
          border: "none"
        }
      } else {
          newStyle = {
            backgroundColor: "#E3170A",
            color: '#F6F6F6',
            borderRadius: "5px",
            border: "none"
          }
        }
    } else {
      newStyle = {
        backgroundColor: "#B9E6FF",
        color: "black",
        borderRadius: "5px",
        border: "none"
      }
    }

    return {
      className: "CustomEventContainer " + (event.mode === "present") ? (event.booked ? "Booked" : (event.waiting? "Waiting" : "Unbooked")) : "Online",
      style: newStyle
    };
  };

  // getAllProfessors = async () => {
  //   const professors = await Promise.all(this.props.lectures.map(async (lecture) => await API.getUser(lecture.teacherId)));
  //   return professors;
  // };

  getAllData = async () => {
    // const professors = await this.getAllProfessors();
    let lezion = this.props.lectures.map((l) => {
      let data = moment(l.date, "DD-MM-YYYY HH:mm:ss").format("DD-MM-YYYY");
      let time = l.time.split("~");
      let inizio = time[0].split(":");
      let fine = time[1].split(":");
      data = data.split("-");
      let booked = true;
      let waiting = true;

      if (this.props.bookings.filter(b => b.studentId === this.props.authObj.authUser).some(r => r.lectureId === l.lectureId)) booked = false;
      const waitingList = this.props.waitingBookings.filter(booking => booking.lectureId === l.lectureId);
      if(!waitingList || waitingList.length === 0)  waiting = false;

      let p = this.props.professors.filter(professor => professor.userId == l.teacherId)[0];
      //let p = this.props.professors.find(f => f.userId === l.teacherId);
      p = p.name + " " + p.surname;
      return {
        course: this.props.courses.filter(c => c.courseId === l.courseId)[0].name,
        professor: p,//"aaaa",
        room: (l.mode === "present") ? l.room : 'Virtual Classroom',
        mode: l.mode,
        booked: booked,
        waiting: waiting,
        start: new Date(data[2], data[1] - 1, data[0], inizio[0], inizio[1]),
        end: new Date(data[2], data[1] - 1, data[0], fine[0], fine[1]),
      }
    });
    this.setState({ events: lezion });
  }

  render() {

    return (
      <div className="StudentCalendarContainer">
        <div className="StudentCalendarLegend">
          <div className="LegendElement"><div class='box red'></div>= Booked lesson</div>
          <div className="LegendElement"><div class='box orange'></div>= In waiting list</div>
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
          views={['week', 'month']}
          view={this.state.view}
          onView={view => this.setState({ view })}
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

