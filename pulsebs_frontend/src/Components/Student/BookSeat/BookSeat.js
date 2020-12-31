import React, { useState } from 'react';
import { Table, Col, InputGroup } from 'react-bootstrap';
import API from '../../../api/API';
import moment from 'moment';

function BookSeat(props) {
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
                        {props.lectures.map( (lecture) => <BookLecture {...props} 
                                                            key={lecture.lectureId}
                                                            lecture={lecture} 
                                                            lectureBookings={props.bookings.filter((b) => b.lectureId == lecture.lectureId)}/>)}
                    </tbody>
                </Table>
            </InputGroup>
        </Col>
    </div>;
}

function BookLecture(props) {
    const [booked, setBooked] = useState(props.lectureBookings.filter((b) =>  b.studentId == props.authObj.authUser).length);
    //const [professor, setProfessor] = useState();
    const [bookedSeats, setBookedSeats] = useState(props.lectureBookings.length);

    const courseName = props.courses.filter( c => c.courseId === props.lecture.courseId )[0].name;
    const professor = props.professors.find(p => p.userId === props.lecture.teacherId);

    const handleClick = () => {
        if(!booked){
            if(props.lecture.mode === "present" && bookedSeats < props.lecture.maxSeats) {
                API.addBooking({
                    studentId: props.authObj.authUser,
                    lectureId: props.lecture.lectureId
                    })
                    .then( () => {
                        setBooked(true);
                        setBookedSeats(bookedSeats + 1);
                        props.triggerAPI();
                    })
                    .catch( (err) => console.log(err) );
            }
            if(props.lecture.mode === "present" && bookedSeats === props.lecture.maxSeats) {
                // put student in waiting list
                API.apiBookingToWaitingListPOST({
                    studentId: props.authObj.authUser,
                    lectureId: props.lecture.lectureId
                    })
                    // modifies button in "waiting" and set lecture in waiting list
                    .then(() => {
                        console.log('in waiting listtttttttttttttt');
                        props.triggerAPI();
                    })
                    .catch((err) => console.log(err) );
            }
        } else {
            API.cancelBooking({
                studentId: props.authObj.authUser,
                lectureId: props.lecture.lectureId
            })
            .catch( (err) => console.log(err) )
            .then(() => {
                setBooked(false);
                setBookedSeats(bookedSeats - 1);});
                props.triggerAPI();
        }
    }

    // useEffect( () => API.getUser(props.lecture.teacherId)
    //                     .then( (res) => {
    //                         setProfessor(res.name + " " + res.surname);
    //                     })
    //                     .catch( (err) => console.log(err) ), []);

    const date = moment(props.lecture.date, "DD-MM-YYYY HH:mm:ss");
    
    return <tr>
        <td className='TableContent'>{courseName}</td>
        <td className='TableContent'>{date.format("DD-MM-YYYY")}</td>
        <td className='TableContent'>{date.format("HH:mm")}</td>
        <td className='TableContent'>{(props.lecture.mode === "present") ? props.lecture.room : "Virtual Classroom"}</td>
        <td className='TableContent'>{professor.name + " " + professor.surname}</td>
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