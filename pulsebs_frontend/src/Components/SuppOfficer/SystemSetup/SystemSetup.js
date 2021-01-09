import React, { Component } from "react";
import { Container, Row, Col,Alert } from 'react-bootstrap';
import API from '../../../api/API';

require('./SystemSetup.css');

class systemSetup extends Component{
    constructor(props) {
        super(props);
          this.state = {
            Student: null,
            Professor: null,
            Courses: null,
            Enrollment: null,
            Schedule: null,
            fileSelected: 0,
            show:false,
            correct:0,
            file:null,
          }
       
      }
    
    onChangeHandler=event=>{
        switch(event.target.files[0].name){
            case "Students.csv":
                if(this.state.Student===null)
                    this.setState({
                            Student: event.target.files[0],
                            loaded: 0,
                            fileSelected :this.state.fileSelected+1,
                            show:false,
                            correct:0,
                        });
            break;
            case 'Professors.csv':
                if(this.state.Professor===null)
                    this.setState({
                            Professor: event.target.files[0],
                            loaded: 0,
                            fileSelected :this.state.fileSelected+1,
                            show:false,
                            correct:0,
                        });
            break;
            case 'Courses.csv':
                if(this.state.Courses===null)
                    this.setState({
                            Courses: event.target.files[0],
                            loaded: 0,
                            fileSelected :this.state.fileSelected+1,
                            show:false,
                            correct:0,
                        });
            break;
            case 'Enrollment.csv':
                if(this.state.Enrollment===null)
                    this.setState({
                            Enrollment: event.target.files[0],
                            loaded: 0,
                            fileSelected :this.state.fileSelected+1,
                            show:false,
                            correct:0,
                        });
            break;
            case 'Schedule.csv':
                if(this.state.Schedule===null)
                    this.setState({
                            Schedule: event.target.files[0],
                            loaded: 0,
                            fileSelected :this.state.fileSelected+1,
                            show:false,
                            correct:0,
                        });
            break;
            default:
                this.setState({show:true,
                                file:null,});
            break;
        }
    }
    onClickHandler =() => {
        //let s,p,c,e,sc;
        //const data = new FormData()
        
        //this.setState({fileSelected:0})
        /*f=this.state.file;
        console.log(f);
        switch(f.name){
            case "Students.csv":
                console.log("QUA");
                API.uploadCSV(f,"students")
                .then((res)=>{
                //s=res;
                if(res.status==500)
                this.setState({file:null,correct:2})
                else
                this.setState({file:null,correct:1})
                })
                .catch((err) => {
                if (err.status && err.status === 401) {
                    console.log(err);
                }
                })
                break;
            case "Professors.csv":
                API.uploadCSV(f,"teachers")
                .then((res)=>{
                //s=res;
                if(res.status==500)
                this.setState({file:null,correct:2})
                else
                this.setState({file:null,correct:1})
                })
                .catch((err) => {
                if (err.status && err.status === 401) {
                    console.log(err);
                }
                })
                break;
            case "Courses.csv":
                API.uploadCSV(f,"courses")
                .then((res)=>{
                //s=res;
                if(res.status==500)
                this.setState({file:null,correct:2})
                else
                this.setState({file:null,correct:1})
                })
                .catch((err) => {
                if (err.status && err.status === 401) {
                    console.log(err);
                }
                })
                break;
            case "Enrollment.csv":
                API.uploadCSV(f,"courses/attendance")
                .then((res)=>{
                //s=res;
                if(res.status==500)
                this.setState({file:null,correct:2})
                else
                this.setState({file:null,correct:1})
                })
                .catch((err) => {
                if (err.status && err.status === 401) {
                    console.log(err);
                }
                })
                break;
            case "Schedule.csv":
                API.uploadCSV(f,"lectures")
                .then((res)=>{
                //s=res;
                if(res.status==500)
                this.setState({file:null,correct:2})
                else
                this.setState({file:null,correct:1})
                })
                .catch((err) => {
                if (err.status && err.status === 401) {
                    console.log(err);
                }
                })
                break;
        }
        */
          /*                                                                          
        if(this.state.file!=null){
            API.uploadCSV(this.state.file,"courses")
            .then((res)=>{
                //s=res;
                if(res.status==500)
                this.setState({file:null,correct:2})
                else
                this.setState({file:null,correct:1})
            })
            .catch((err) => {
                if (err.status && err.status === 401) {
                    console.log(err);
                }
            })
        }
        */
        
        if(this.state.Student.name!==null && 
            this.state.Professor.name!==null &&
            this.state.Courses.name!==null &&
            this.state.Enrollment.name!==null &&
            this.state.Schedule.name!==null && 
            this.state.fileSelected===5){

            API.uploadCSV(this.state.Student,"students")
            .then(()=>{
                /*if(res.status===422)
                    this.setState({Student:null,correct:2})
                else
                    if(res.status===201)
                        this.setState({Student:null,correct:1})
                else
                    if(res.status===500)
                        this.setState({Student:null,correct:3})*/
            
                API.uploadCSV(this.state.Professor,"teachers")
                .then(()=>{
                    /*if(res.status===422)
                        this.setState({Professor:null,correct:2})
                    else
                        if(res.status===201)
                            this.setState({Professor:null,correct:1})
                    else
                        if(res.status===500)
                            this.setState({Student:null,correct:3})*/
                
                    API.uploadCSV(this.state.Courses,"courses")
                    .then(()=>{
                        /*if(res.status===422)
                            this.setState({Courses:null,correct:2})
                        else
                            if(res.status===201)
                                this.setState({Courses:null,correct:1})
                        else
                            if(res.status===500)
                                this.setState({Student:null,correct:3})*/
                        
                        API.uploadCSV(this.state.Enrollment,"courses/attendance")
                        .then(()=>{
                            //e=res;
                            /*if(res.status===422)
                                this.setState({Enrollment:null,correct:2})
                            else
                                if(res.status===201)
                                    this.setState({Enrollment:null,correct:1})
                            else
                                if(res.status===500)
                                    this.setState({Student:null,correct:3})*/
                        

                            API.uploadCSV(this.state.Schedule,"lectures")
                            .then((res)=>{
                                console.log(res);
                                if(res.status===422)
                                    this.setState({correct:2})
                                else
                                    if(res.status===201)
                                        this.setState({correct:1})
                                else
                                    if(res.status===500)
                                        this.setState({correct:3})

                                this.setState({fileSelected:0,
                                                Student:null,
                                                Professor:null,
                                                Enrollment:null,
                                                Schedule:null,
                                                Courses:null,
                                });
                            })
                            .catch((err) => {
                                if (err.status && err.status === 401) {
                                    console.log(err);
                                }
                            });
                        })
                        .catch((err) => {
                            if (err.status && err.status === 401) {
                                console.log(err);
                            }
                        });
                    })
                    .catch((err) => {
                        if (err.status && err.status === 401) {
                            console.log(err);
                        }
                    });

                    })
                .catch((err) => {
                    if (err.status && err.status === 401) {
                        console.log(err);
                    }
                });

            })
            .catch((err) => {
                if (err.status && err.status === 401) {
                    console.log(err);
                }
            })
                
        }
        
    }
    render(){
        return (
            <div>
                <h3 className="mt-2">Select and Upload your file here</h3>
                <h6 className="mt-2"> Remember: press 'Upload' after the 5 'x.csv' are selected</h6>
                <Container>
                <Alert show={this.state.show} variant="primary">
                    <Alert.Link href="#">
                        File not correct. Please select another file
                    </Alert.Link>
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
                <button type="button" class="button"
                        disabled={this.state.fileSelected!==5} 
                        onClick={this.onClickHandler}>Upload</button> 

                <Alert show={this.state.correct===1} variant="success">
                    <Alert.Link href="#">
                    FILE UPLOADED CORRECTLY
                    </Alert.Link>
                </Alert>
                <Alert show={this.state.correct===2} variant="warning">
                    <Alert.Link href="#">
                    FILE ALREADY UPLOADED 
                    </Alert.Link>
                </Alert>
                <Alert show={this.state.correct===3} variant="warning">
                    <Alert.Link href="#">
                    INTERNAL SERVER ERROR 
                    </Alert.Link>
                </Alert>

            </div>
            
        );
    }
}

export default systemSetup;