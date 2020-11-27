import React from 'react';
import { Col, Row, Button, Accordion, Card} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import API from '../../../api/API';


export default function MyLecturesProfessor() {

    const [lectures, setLectures] = React.useState([]);

    const history = useHistory();

    React.useEffect(() => {
        API.getTeacherLectures()
            .then((res) => {
                setLectures(res);
            })
            .catch((err) => {
                if (err.status && err.status === 401)
                    history.push('/');
                else
                    console.log(err);
            });
    }, [history]);


    return (
        <div id='MyLecturesProfessorContainer'>
            <LectureList lectures={lectures} history={history} setLectures={setLectures}/>
        </div>
    );
}

function LectureList({ lectures, ...rest }) {
    return (
        <div>
            {lectures.map((lecture, index) => (
                <Lecture key={index} {...lecture} {...rest} />
            ))}
        </div>
    );
}

function Lecture({lectureId, courseId, courseName, room, date, time, mode, history, setLectures, ...rest}) {

    const [bookings, setBookings] = React.useState([]);

    React.useEffect(() => {
        API.getBookings(lectureId)
            .then((res) => {
                setBookings(res);
            })
            .catch((err) => {
                if (err.status && err.status === 401)
                    history.push('/');
                else
                    console.log(err);
            });
    }, [history, lectureId]);

    const deleteLectureAndUpdate = (lectureID) => {
        API.deleteLectureById(lectureID)
        .then((res) => {
            API.getLectures()
            .then((result) => {
                setLectures(result);
            })
            .catch((err) => {
                if (err.status && err.status === 401)
                    history.push('/');
                else
                    console.log(err);
            });
        })
        .catch((err) => {
            if (err.status && err.status === 401)
                    history.push('/');
                else
                    console.log(err);
        });
    }

    return (
        <Col>
            <Accordion defaultActiveKey="1">
                <Card text="space-around">
                    <Card.Header>
                        <Accordion.Toggle lg={10} as={Button} variant="link" eventKey="0">
                            <Row >
                                <Col className='HeaderText'>{lectureId}</Col>
                                <Col className='HeaderText'>{courseName}</Col>
                                <Col className='HeaderText'>Date: {date}</Col>
                                <Col className='HeaderText'>Time: {time}</Col>
                                <Col className='HeaderText'>Mode: {mode}</Col>
                                <Col className='HeaderText'>Booked students: {bookings.length}</Col>
                                <Col className='HeaderText'>Room: {room}</Col>
                                <Col>
                                    <Button 
                                        onClick={() => deleteLectureAndUpdate(lectureId) }>
                                            Delete
                                    </Button>
                                </Col>
                            </Row>
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <BookingList className='LectureText' lectureId={lectureId} bookings={bookings} {...rest} />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </Col>
    );
}

function BookingList({ lectureId, bookings, ...rest }) {

    return (
        <Col>
            {bookings.map((booking, index) => (
                <Booking key={index} {...booking} {...rest} />
            ))}
        </Col>
    );
}

function Booking({ studentId, studentName, studentSurname, ...rest }) {
    return (
        <p>{studentId} {studentName} {studentSurname}</p>
    );
}
