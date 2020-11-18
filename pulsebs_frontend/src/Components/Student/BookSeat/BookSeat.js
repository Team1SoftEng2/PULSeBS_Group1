import React, { useState } from 'react';
import { Row, Table, Col, InputGroup } from 'react-bootstrap';
import API from '../../../api/API';
import { StudentBookedList } from '../../../api/API';


export default function BookSeat({ colonna }) {

    return (
        <div class='BookSeatContainer'>
            <BookingLectureList />
        </div>
    );
}

function BookingLectureList({ book_lectures, ...rest }) {

    return (
        <div class='BookSeatContainer'>
            <Row>
                {StudentBookedList.map((book_lecture) => (
                    <BookLecture lectureId={book_lecture.lectureId} {...book_lecture} />
                ))}

            </Row>
        </div>
    )
}

function BookLecture({ ...book_lecture }) {

    const [counter, setBook] = useState(book_lecture.booked);

    return (
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
                        <tr>
                            <td className='TableContent'>{book_lecture.courseId}</td>
                            <td className='TableContent'>{book_lecture.lectureId}</td>
                            <td className='TableContent'>{book_lecture.room}</td>
                            <td className='TableContent'>{book_lecture.teacherId}</td>
                            <td className='TableContent'>
                                <button className={(counter) ? 'Not_Booked' : 'Booked'}
                                    onClick={() => {
                                        book_lecture.book_the_lecture();
                                        setBook(!counter);
                                    }}>
                                    {counter ? "Booked" : "Book"}

                                </button>
                            </td>
                        </tr>
                    </tbody>
                </Table>



            </InputGroup>
        </Col>
    );
}
