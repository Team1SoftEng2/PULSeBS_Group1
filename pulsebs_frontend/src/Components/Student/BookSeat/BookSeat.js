import React, { useState } from 'react';
import { Row, Table, Component, Container, Card, Accordion, Col, Button, FormControl, InputGroup } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';
import { useHistory } from "react-router-dom";
import API from '../../../api/API';
import { StudentBookedList } from '../../../api/API';


export default function BookSeat({ colonna }) {

    //const [book_lectures, setBookLectures] = React.useState([]);

    //const history = useHistory();
    /*
        React.useEffect(() => {
            API.getLectures()
            .then((res) => {
                setBookLectures(res);
            })
            .catch((err)=> {
                if(err.status && err.status === 401)
                    history.push('/');
                else 
                    console.log(err);
                });
          }, [history]);
    
    */
    return (
        <div class='BookSeatContainer'>
            <Booking_LectureList />
        </div>
    );
}

function Booking_LectureList({ book_lectures, ...rest }) {

    return (
        <div class='BookSeatContainer'>
            <Row>
                {StudentBookedList.map((book_lecture) => (
                    <Book_Lecture lectureId={book_lecture.lectureId} {...book_lecture} />
                ))}

            </Row>
        </div>
    )
}

function Book_Lecture({ ...book_lecture }) {

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
