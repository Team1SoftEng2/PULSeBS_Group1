import React, { useEffect, useState } from 'react';
import { Table, Col, InputGroup } from 'react-bootstrap';
import API from '../../../api/API';
import { useHistory } from "react-router-dom";

function BookSeat(props) {
    const authObj = props.authObj;

    let [courses, setCourses] = useState([]);
    let [bookings, setBookings] = useState([]);

    let history = useHistory();
    useEffect( () => API.getStudentCourses(authObj.authUser)
                        .then( (res) => {
                            setCourses(res);
                        })
                        .catch( (err) => {
                            if (err.status && err.status === 401)
                                history.push('/');
                            else
                                console.log(err);
                        }), [history]
    );

    useEffect( () => API.getBookings()
                        .then( (res) => {
                            setBookings(res.filter( (b) => b.studentId == authObj.authUser) )
                        })
                        .catch( (err) => {
                            if (err.status && err.status === 401)
                                history.push('/');
                            else
                                console.log(err);
                        }), [history]
    );
    
    //DON'T DELETE PLS
    //è da mettere nel posto giusto con il calendario
    /*
    let [lecturesDate, setLecturesDate] = useState([]); //calendar
    //insert the min e max date for the calendar
    useEffect( () => API.getLecturesDate(props.courseId,"19-11-2020","21-11-2020")
                        .then( (res) => {
                            setLecturesDate(res);
                        })
                        .catch( (err) => {
                            if (err.status && err.status === 401)
                                history.push('/');
                            else
                                console.log(err);
                        }), [history]
    );
    */
    
    return <div className='BookSeatContainer'>
        <Col lg={10}>
            <InputGroup className="mb-3 mt-2">
                <Table bordered>
                    <tbody>
                        <tr>
                            <td>Course</td>
                            <td>Date</td>
                            <td>Time</td>
                            <td>Room</td>
                            <td>Teacher</td>
                            <td>Seats</td>
                            <td>Booking Status</td>
                        </tr>
                        {courses.map( (c) => 
                        <BookLectures key={c.courseId}
                                    userId={authObj.authUser}
                                    course={c} 
                                    bookings={bookings}
                                    history={history}/>)}
                    </tbody>
                </Table>
            </InputGroup>
        </Col>
    </div>;
}

function BookLectures(props) {
    let [lectures, setLectures] = useState([]);
    
    let history = props.history;

    useEffect( () => API.getLectures(props.course.courseId)
                        .then( (res) => {
                            setLectures(res);
                        })
                        .catch( (err) => {
                            if (err.status && err.status === 401)
                                history.push('/');
                            else
                                console.log(err);
                        }), [history]
    );
    
    return <>
        {lectures.map( (lecture) => <BookLecture key={lecture.lectureId}
                                                {...props} 
                                                lecture={lecture} 
                                                booked={props.bookings.filter((b) => b.lectureId == lecture.lectureId)}/>)}
    </>;

}

function BookLecture(props) {
    const [booked, setBooked] = useState(props.booked.length);

    const handleClick = () => {
        if(!booked){
            setBooked(!booked);
            API.addBooking({
                studentId: props.userId,
                lectureId: props.lecture.lectureId
                })
                .catch( (err) => console.log(err) );
        }
    }
    
    return <tr>
        <td className='TableContent'>{props.course.name}</td>
        <td className='TableContent'>{props.lecture.date}</td>
        <td className='TableContent'>{props.lecture.time}</td>
        <td className='TableContent'>{(props.lecture.mode === "present") ? props.lecture.room : "Virtual Classroom"}</td>
        <td className='TableContent'>{props.lecture.teacherId}</td>
        <td className='TableContent'>{(props.lecture.mode === "present") ? props.lecture.maxSeats : "∞"}</td>
        <td className='TableContent'>
            <button className={(booked) ? "Not_Book" : "Book"}
                    onClick={() => handleClick() }>
                {booked ? "Booked" : "Book"}
            </button>
        </td>
    </tr>
}

export default BookSeat;