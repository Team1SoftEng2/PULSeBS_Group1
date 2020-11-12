import React from 'react';
import {Col, Row, Button, Accordion,Card} from 'react-bootstrap';

const lectures = [
    {
        lectureId: "prova1",
        courseId: "C1",
        teacherId: "T1",
        date: "",
        time: "",
        mode: "", 
        room: "aulaA",
        maxSeats: ""
    },
    {
        lectureId: "prova2",
        courseId: "C2",
        teacherId: "T2",
        date: "",
        time: "",
        mode: "", 
        room: "aulaB",
        maxSeats: ""
    },
    {
        lectureId: "prova3",
        courseId: "C3",
        teacherId: "T1",
        date: "",
        time: "",
        mode: "", 
        room: "aulaC",
        maxSeats: ""
    }
]

const bookings = [
    {
        studentId:"S1,S2,S3",
        lectureId:"prova1"
    },
    {
        studentId:"S2",
        lectureId:"prova2"
    },
    {
        studentId:"S2,S3",
        lectureId:"prova3"
    }
]

function myLecturesProfessor(){   
        return (
            <LectureList lectures={lectures} />
        );
}

function LectureList(props) {
    return (
        <Col>
            {lectures.map((lecture, index) => (
                <Lecture key={index} {...lecture} />
            ))}
        
        </Col>
    );
}

function Lecture(props) {
    
    return (
        <Row>
            <Accordion defaultActiveKey="1">
            <Card>
                <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    <h3>{props.lectureId}</h3>
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                    <BookingList bookings={bookings} room={props.room} lectureId={props.lectureId}/>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            </Accordion>
      </Row>
    );
}

function BookingList(props) {
    const studId=props.bookings.find(b=>b.lectureId===props.lectureId);
    return (
        <Col>
            <h5>
            {props.room}
            </h5>

            {studId.studentId} 
            
        </Col>
    );
}


export default myLecturesProfessor;