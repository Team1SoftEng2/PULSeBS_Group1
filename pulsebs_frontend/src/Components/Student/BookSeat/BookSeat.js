import React, { useEffect, useState } from 'react';
import { Table, Col, InputGroup } from 'react-bootstrap';
import API from '../../../api/API';
import { useHistory } from "react-router-dom";
import moment from 'moment';

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
                            setBookings(res)
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
                            <td className= "table-header">Course</td>
                            <td className= "table-header">Date</td>
                            <td className= "table-header">Time</td>
                            <td className= "table-header">Room</td>
                            <td className= "table-header">Teacher</td>
                            <td className= "table-header">Seats</td>
                            <td className= "table-header">Booking Status</td>
                        </tr>
                        {courses.map( (c) => 
                        <BookLectures key={c.courseId}
                                    {...props}
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
                                                lectureBookings={props.bookings.filter((b) => b.lectureId == lecture.lectureId)}/>)}
    </>;

}

function BookLecture(props) {
    const [booked, setBooked] = useState(props.lectureBookings.filter((b) =>  b.studentId == props.authObj.authUser).length);
    const [professor, setProfessor] = useState();
    const [bookedSeats, setBookedSeats] = useState(props.lectureBookings.length);

    const handleClick = () => {
        if(!booked){
            if(props.lecture.mode === "present" && bookedSeats < props.lecture.maxSeats)
                API.addBooking({
                    studentId: props.userId,
                    lectureId: props.lecture.lectureId
                    })
                    .then( () => {
                        setBooked(true);
                        setBookedSeats(bookedSeats + 1);
                    })
                    .catch( (err) => console.log(err) );
        } else {
            // setBooked(booked) ;
            API.cancelBooking({
                studentId: props.userId,
                lectureId: props.lecture.lectureId
            })
            .catch( (err) => console.log(err) )
            .then(() => {
                setBooked(false);
                setBookedSeats(bookedSeats - 1);});

        }
    }

    useEffect( () => API.getUser(props.lecture.teacherId)
                        .then( (res) => {
                            setProfessor(res.name + " " + res.surname);
                        })
                        .catch( (err) => console.log(err) ), []);

    const date = moment(props.lecture.date, "DD-MM-YYYY HH:mm:ss");
    
    return <tr>
        <td className='TableContent'>{props.course.name}</td>
        <td className='TableContent'>{date.format("DD-MM-YYYY")}</td>
        <td className='TableContent'>{date.format("hh:mm")}</td>
        <td className='TableContent'>{(props.lecture.mode === "present") ? props.lecture.room : "Virtual Classroom"}</td>
        <td className='TableContent'>{professor}</td>
        <td className='TableContent'>{(props.lecture.mode === "present") ? bookedSeats + "/" + props.lecture.maxSeats : "∞"}</td>
        <td className='TableContent'>
            <button className= {((props.lecture.mode === "present")? ((booked) ? "Not_Book" : "Book"): "Online")}
                    onClick={() => handleClick() }>
                {(props.lecture.mode === "present")?(booked ? "Unbook" : "Book"): "Online"}
            </button>
        </td>
    </tr>
}

export default BookSeat;