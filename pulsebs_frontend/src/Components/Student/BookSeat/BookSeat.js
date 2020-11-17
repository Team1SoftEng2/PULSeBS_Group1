import React, {useState} from 'react';
import {Row, Table,Component,Container,Card,Accordion,Col,Button,FormControl,InputGroup} from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';
import { useHistory } from "react-router-dom";
import API from '../../../api/API';
import {StudentBookedList} from '../../../api/API';


export default function BookSeat({colonna}) {

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
            <Container>
                <Booking_LectureList />
            </Container>
        );
}

function Booking_LectureList({book_lectures,...rest}){
    
    return (
        <div id='MyLecturesStudentContainer'>
            <Row >
            {StudentBookedList.map((book_lecture) => (
                    <Book_Lecture lectureId={book_lecture.lectureId} {...book_lecture} />
                ))}
            
            </Row>
        </div>
    )
}

function Book_Lecture({...book_lecture}) {
    
    const [contatore, setBook] = useState(book_lecture.booked);
    
    return (
        <Col lg={12}>
            
            <InputGroup className="mb-3 mt-2">
                <Table striped bordered >
                    
                    <tbody>
                    <tr>
                        <td>Course</td>
                        <td>Lecture</td>
                        <td>Room</td>
                        <td>Teacher</td>
                        <td></td>
                        </tr>
                    <tr>
                        <td className='HeaderText1'>{book_lecture.courseId}</td>
                        <td className='HeaderText1'>{book_lecture.lectureId}</td>
                        <td className='HeaderText1'>{book_lecture.room}</td>
                        <td className='HeaderText1'>{book_lecture.teacherId}</td>
                        <td className='HeaderText1'>
                            <button className={(contatore) ? 'Booked' : 'Not_Booked'} 
                            onClick={ ()=>{
                                            book_lecture.book_the_lecture();
                                            setBook(!contatore);   
                                }}>
                                {contatore ? "Booked":"Book"}
                                
                        </button> 
                        </td>
                        </tr>
                    </tbody>
                </Table>
                
                
                
            </InputGroup> 
        </Col>
    );
}
