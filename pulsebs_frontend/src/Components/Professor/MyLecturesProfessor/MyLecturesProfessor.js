import React from 'react';
import {Col, Row, Button} from 'react-bootstrap';

const lectures = [
    {
        lectureId: "prova1",
        courseId: "",
        teacherId: "",
        date: "",
        time: "",
        mode: "", 
        room: "aulaA",
        maxSeats: ""
    },
    {
        lectureId: "prova2",
        courseId: "",
        teacherId: "",
        date: "",
        time: "",
        mode: "", 
        room: "aulaB",
        maxSeats: ""
    },
    {
        lectureId: "prova3",
        courseId: "",
        teacherId: "",
        date: "",
        time: "",
        mode: "", 
        room: "aulaC",
        maxSeats: ""
    }
]

const bookings = [
    {
        studentId:"",
        lectureId:""
    },
    {
        studentId:"",
        lectureId:""
    },
    {
        studentId:"",
        lectureId:""
    }
]



function myLecturesProfessor() {
    return (
        <LectureList lectures={lectures}/>
    );
}


function LectureList({lectures, ...rest}) {
    return (
        <Col>
            {lectures.map((lecture, index) => (
                <Lecture key={index} {...lecture} {...rest} />
            ))}
        </Col>
    );
}

function Lecture({lectureId, courseId, room, ...rest}) {
    return (
        <Row>
            <Col>{lectureId}</Col>
            <Col>{room}</Col>
            <Col><Button>Students List</Button></Col>
        </Row>
    );
}

function BookingList({bookings, ...rest}) {
    return (
        <Col>
            {bookings.map((booking, index) => (
                <Booking key={index} {...booking} {...rest} />
            ))}
        </Col>
    );
}

function Booking({studentId, ...rest}) {
    return (
        <p>{studentId}</p>
    );
}

export default myLecturesProfessor;