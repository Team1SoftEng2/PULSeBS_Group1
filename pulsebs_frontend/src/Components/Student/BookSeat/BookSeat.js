import React, { useEffect, useState } from 'react';
import { Button, Table, Col, InputGroup } from 'react-bootstrap';
import API from '../../../api/API';

function BookSeat(props) {
    let [courses, setCourses] = useState([]);
    let [bookings, setBookings] = useState([]);

    const getCourses = () => {
        API.getStudentCourses('s27001')
            .then( (courses) => {
                setCourses(courses);
            })
            .catch( (c) => console.log("ERROR = " + c));
    };

    const getBookings = () => {
        API.getBookings()
            .then( (bookings) => {
                setBookings(bookings.filter( (b) => b.studentId == 's27001') )
            })
            .catch( (c) => console.log("ERROR = " + c));
    }

    useEffect( () => getCourses, [courses] );
    useEffect( () => getBookings, [bookings] );

    return <div className='BookSeatContainer'>
        <Col lg={10}>
            <InputGroup className="mb-3 mt-2">
                <Table bordered>
                    <tbody>
                        <tr>
                            <td>Course</td>
                            <td>Lecture</td>
                            <td>Room</td>
                            <td>Teacher</td>
                            <td>Booking Status</td>
                        </tr>
                        {courses.map( (c) => <BookLectures key={c.courseId} courseId={c.courseId} bookings={bookings}/>)}
                    </tbody>
                </Table>
            </InputGroup>
        </Col>
    </div>;
}

function BookLectures(props) {
    let [lectures, setLectures] = useState([]);

    const getLectures = () => {
        API.getLectures(props.courseId)
            .then( (lectures) => {
                setLectures(lectures);
            })
            .catch( (c) => console.log("ERROR = " + c));
    };

    useEffect( () => getLectures, [lectures] );
    // console.log(props.bookings.filter((b) => b.lectureId == 'IS1001').lenght);
    return <>
        {lectures.map( (lecture) => <BookLecture key={lecture.lectureId} lecture={lecture} booked={props.bookings.filter((b) => b.lectureId == lecture.lectureId)}/>)}
    </>;

}

function BookLecture(props) {
    const [booked, setBooked] = useState(props.booked.lenght);
    console.log(props.booked.length);

    return <tr>
        <td className='TableContent'>{props.lecture.courseId}</td>
        <td className='TableContent'>{props.lecture.lectureId}</td>
        <td className='TableContent'>{props.lecture.mode}</td>
        <td className='TableContent'>{props.lecture.teacherId}</td>
        <td className='TableContent'>
            <button className={(booked) ? "Not_Book" : "Book"}
                    onClick={() => {
                    //book_lecture.book_the_lecture();
                    setBooked(!booked);
                }}>
                {booked ? "Booked" : "Book"}
            </button>
        </td>
    </tr>
}

export default BookSeat;