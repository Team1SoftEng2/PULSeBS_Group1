import React, { Component } from "react";
import { Container, Row, Col,Alert } from 'react-bootstrap';
import API from '../../../api/API';

require('./SystemSetup.css');

class systemSetup extends Component{
    constructor(props) {
        super(props);
          this.state = {
            Student: null,/*
            Professor: null,
            Courses: null,
            Enrollment: null,
            Schedule: null,*/
            fileSelected: 0,
            show:false,
          }
       
      }
    
    onChangeHandler=event=>{
        console.log(event.target.files[0].name)
        switch(event.target.files[0].name){
            case "Students.csv":
                this.setState({
                        Student: event.target.files[0],
                        loaded: 0,
                        fileSelected :this.state.fileSelected+1,
                        show:false,
                    });
            break;
            case 'Professors.csv':
                this.setState({
                        Professor: event.target.files[0],
                        loaded: 0,
                        fileSelected :this.state.fileSelected+1,
                        show:false,
                    });
            break;
            case 'Courses.csv':
                this.setState({
                        Courses: event.target.files[0],
                        loaded: 0,
                        fileSelected :this.state.fileSelected+1,
                        show:false,
                    });
            break;
            case 'Enrollment.csv':
                this.setState({
                        Enrollment: event.target.files[0],
                        loaded: 0,
                        fileSelected :this.state.fileSelected+1,
                        show:false,
                    });
            break;
            case 'Schedule.csv':
                this.setState({
                        Schedule: event.target.files[0],
                        loaded: 0,
                        fileSelected :this.state.fileSelected+1,
                        show:false,
                    });
            break;
            default:
                this.setState({show:true});
            break;
        }
    }
    onClickHandler = () => {
        const data = new FormData() 
        if(this.state.Student.name!=null &&
            this.state.Professor.name!=null &&
            this.state.Courses.name!=null &&
            this.state.Enrollment.name!=null &&
            this.state.Schedule.name!=null && 
            this.state.fileSelected===5){
               
                //console.log(this.state.Student)
                API.uploadCSV(this.state.Student,"students")
                API.uploadCSV(this.state.Professor,"teachers")
                API.uploadCSV(this.state.Courses,"courses")
                API.uploadCSV(this.state.Enrollment,"courses/attendance")
                API.uploadCSV(this.state.Schedule,"lectures")
                //data.append('file', this.state.Student) //API PER UPLOAD
                //data.append('file', this.state.Professor)
            /*    data.append('file', this.state.Courses)
                data.append('file', this.state.Enrollment)
                data.append('file', this.state.Schedule)*/
        }
        
    }
    render(){
        return (
            <div>
                <h3 className="mt-2">Select and Upload your file here</h3>
                <Container>
                <Alert show={this.state.show} variant="primary">
                    File not correct. Please select another file
                </Alert>
                    <div>
                        <br></br>
                        <Row>
                        <Col md={4}></Col>
                            <Col>
                            <label className="custom-file-upload">
                            <input type="file" onChange={this.onChangeHandler}/> 
                                Students  
                            </label>
                            </Col>
                            <Col>
                                <h4>
                                    <font color="green">
                                        {this.state.Student?.name}
                                    </font>
                                </h4>
                            </Col>
                            <Col md={3}></Col>
                        </Row>
                      
                    
                        <Row>
                            <Col md={4}></Col>
                            <Col>
                                <label className="custom-file-upload">
                                <input type="file" onChange={this.onChangeHandler}/> 
                                <i className="fa fa-cloud-upload" />
                                    Professors  
                                </label>
                                </Col>
                                <Col>
                                    <h4>
                                        <font color="green">
                                        {this.state.Professor?.name}
                                        </font>
                                    </h4>
                            </Col>
                            <Col md={3}></Col>
                        </Row>
                        <Row>
                            <Col md={4}></Col>
                            <Col>
                            <label className="custom-file-upload">
                            <input type="file" onChange={this.onChangeHandler}/> 
                            <i className="fa fa-cloud-upload" />
                                Courses  
                            </label>
                            </Col>
                            <Col>
                                <h4>
                                    <font color="green">
                                        {this.state.Courses?.name}
                                    </font>
                                </h4>
                            </Col>
                            <Col md={3}></Col>
                            </Row>
                        <Row>
                            <Col md={4}></Col>
                            <Col>
                            <label className="custom-file-upload">
                            <input type="file" onChange={this.onChangeHandler}/> 
                            <i className="fa fa-cloud-upload" />
                                Enrollment  
                        </label>
                        </Col>
                        <Col>
                            <h4>
                                <font color="green">
                                    {this.state.Enrollment?.name}
                                </font>
                            </h4>
                            </Col>
                        <Col md={3}></Col>
                        </Row>
                        <Row>
                        <Col md={4}></Col>
                            <Col>
                            <label className="custom-file-upload">
                            <input type="file" onChange={this.onChangeHandler}/> 
                            <i className="fa fa-cloud-upload" />
                                Schedule  
                            </label>
                            </Col>
                            <Col>
                                <h4>
                                    <font color="green">
                                        {this.state.Schedule?.name}
                                    </font>
                                </h4>
                            </Col>
                        <Col md={3}></Col>
                        </Row>  
                                      
                    </div>
                </Container>
                <button type="button" class="btn-success"
                        disabled={this.state.fileSelected!==5} 
                        onClick={this.onClickHandler}>Upload</button> 
            </div>
        );
    }
}

export default systemSetup;