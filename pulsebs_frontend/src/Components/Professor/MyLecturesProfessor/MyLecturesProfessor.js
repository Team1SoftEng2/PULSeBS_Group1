import React from 'react';
import {Col, Row, Button, Accordion, Card, Container} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import API from '../../../api/API';


export default function MyLecturesProfessor(){   

    const [lectures, setLectures] = React.useState([]);

    const history = useHistory();

    React.useEffect(() => {
        API.getLectures()
        .then((res) => {
            setLectures(res);
        })
        .catch((err)=> {
            if(err.status && err.status === 401)
                history.push('/');
            else 
                console.log(err);
            });
      }, [history]);


    return (
            <Container>
                <LectureList lectures={lectures} history = {history} />
            </Container>
        );
}







function LectureList({lectures, ...rest}) {
    return (
        <Row>
            {lectures.map((lecture, index) => (
                <Lecture key={index} {...lecture} {...rest} />
            ))}
        
        </Row>
    );
}

function Lecture({lectureId, courseId, room, history, ...rest}) {

    const [bookings, setBookings] = React.useState([]);

    React.useEffect(() => {
        API.getBookings(lectureId)
        .then((res) => {
            setBookings(res);
        })
        .catch((err)=> {
            if(err.status && err.status === 401)
                history.push('/');
            else 
                console.log(err);
            });
      }, [history, lectureId]);

    return (
        <Col lg={12}>
            <Accordion defaultActiveKey="1">
            <Card text="center">
                <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                <Row>
                    <Col>{lectureId}</Col>
                    <Col>Booked students: {bookings.length}</Col>
                    <Col>Room: {room}</Col>    
                </Row>
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                    <BookingList lectureId={lectureId} bookings={bookings} {...rest} />
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            </Accordion>
        </Col>
    );
}

function BookingList({lectureId, bookings, ...rest}) {

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
