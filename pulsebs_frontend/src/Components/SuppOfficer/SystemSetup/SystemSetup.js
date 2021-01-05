import React, { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap';
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
          }
       
      }
    
    onChangeHandler=event=>{
        console.log(event.target.files[0].name)
        switch(event.target.files[0].name){
            case "Students.csv":
                this.setState({
                        Student: event.target.files[0],
                        loaded: 0,
                        fileSelected :1,
                    });
            break;/*
            case 'Professors.csv':
                this.setState({
                        Professor: event.target.files[0],
                        loaded: 0,
                        fileSelected:1,
                    });
            break;
            case 'Courses.csv':
                this.setState({
                        Courses: event.target.files[0],
                        loaded: 0,
                        fileSelected:1,
                    });
            break;
            case 'Enrollment.csv':
                this.setState({
                        Enrollment: event.target.files[0],
                        loaded: 0,
                        fileSelected:1,
                    });
            break;
            case 'Schedule.csv':
                this.setState({
                        Schedule: event.target.files[0],
                        loaded: 0,
                        fileSelected:1,
                    });
            break;*/
            default:
                this.setState({

                })
            break;
        }
    }
    onClickHandler = () => {
        const data = new FormData() 
        if(this.state.Student.name!=null){/*&&
            this.state.Professor.name!=null &&
            this.state.Courses.name!=null &&
            this.state.Enrollment.name!=null &&
            this.state.Schedule.name!=null){*/
               
                //console.log(this.state.Student)
                API.uploadCSV(this.state.Student)
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
                <Container>
                    <div>
                        <Row>
                        <Col md={4}></Col>
                            <Col>
                            <label className="custom-file-upload">
                            <input type="file" onChange={this.onChangeHandler}/> 
                                Students  
                            </label>
                            </Col>
                            <Col>
                                {this.state.Student?.name}
                            </Col>
                            <Col md={3}></Col>
                        </Row>
                      
                    {/*
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
                                    {this.state.Professor?.name}
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
                                {this.state.Courses?.name}
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
                            {this.state.Enrollment?.name}
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
                                {this.state.Schedule?.name}
                            </Col>
                        <Col md={3}></Col>
                        </Row>  
                    */}                  
                    </div>
                </Container>
                <button type="button" class="btn-success" disabled={!this.state.fileSelected} onClick={this.onClickHandler}>Upload</button> 

            </div>
        );
    }
}

export default systemSetup;