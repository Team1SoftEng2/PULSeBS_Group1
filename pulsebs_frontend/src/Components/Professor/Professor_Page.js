import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import ProfessorHeader from './ProfessorHeader/ProfessorHeader';
import HomePageCalendarProfessor from './HomePageCalendarProfessor/HomePageCalendarProfessor';
import MyLecturesProfessor from './MyLecturesProfessor/MyLecturesProfessor';
import RegisterAttendance from './Register_Attendance/Register_Attendance';
import StatisticsPage from './Statistics/StatisticsPage';
import TutorialProfessor from './TutorialProfessor/TutorialProfessor';
import './Professor_Page.css';

function professorPage (props) {
    const authObj = props.authObj;
    let history = useHistory();
    let [courses, setCourses] = useState([]);
    let [bookings, setBookings] = useState([]);
    let [lectures, setLectures] = useState([]);
    let [professors, setProfessors] = useState([]);

    useEffect( () => API.getStudentCourses(authObj.authUser)
                        .then( (res) => {
                            setCourses(res);
                            getAllLectures(res);
                            // getAllProfessors(res);
                        })
                        .catch( (err) => {
                            if (err.status && err.status === 401)
                                history.push('/');
                            else
                                console.log(err);
                        }), [history, authObj.authUser]
    );

    useEffect( () => API.getBookings()
                        .then( (res) => {
                            setBookings(res);
                        })
                        .catch( (err) => {
                            if (err.status && err.status === 401)
                                history.push('/');
                            else
                                console.log(err);
                        }), [history, update]
    );
    
    const getAllLectures = (coursesList) => {
        let lecturesList = [];
        let professorList = professors;
        coursesList.forEach( async (course) => {
            if(!professorList.filter((p) => p.teacherId === course.teacherId).length){
                let professor = await API.getUser(course.teacherId);
                professorList.push(professor);
                setProfessors(professorList);
            }
            API.getLectures(course.courseId)
                .then( (res) => {
                    lecturesList = lecturesList.concat(res);
                    setLectures(lecturesList);
                })
                .catch( (err) => {
                    if (err.status && err.status === 401)
                        history.push('/');
                    else
                        console.log(err);
                });
        });
    };

    if(authObj.userRole !== "professor")
        return <BrowserRouter><Redirect to = "/"/></BrowserRouter>
    else 
        return <div>
            <BrowserRouter>{authObj.authErr && <Redirect to = "/"/>}</BrowserRouter>
            <BrowserRouter>
                <ProfessorHeader username="UserName"/>
                <Switch>
                    <Route path="/professor" exact component={HomePageCalendarProfessor} />
                    <Route path="/professor/my_lectures" exact component={MyLecturesProfessor} />
                    <Route path="/professor/register_attendance" exact component={RegisterAttendance} />
                    <Route path="/professor/statistics" exact component={ <StatisticsPage {...props} courses={courses} lectures={lectures} bookings={bookings} professors={professors}/>} />
                    <Route path="/professor/tutorial" exact component={TutorialProfessor} />
                </Switch>
            </BrowserRouter>
        </div>;
    
}

export default professorPage;