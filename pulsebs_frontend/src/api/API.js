import User from './User';
const baseURL = "/api";

async function getUser(userId){
    let url = "/users/" + userId;
    const response = await fetch(baseURL + url);
    const userJson = await response.json();
    if(response.ok){
        return userJson;
    } else {
        let err = { status: response.status, errObj: userJson};
        throw err;
    }
}

async function login(id, password) {
    return new Promise((resolve, reject) => {
        fetch(baseURL + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id, password: password}),
        }).then((response) => {
            if (response.ok) {
                response.json().then((user) => {
                    resolve(new User(user.userId, user.name, user.surname, user.email));
                });
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: err }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function getStudentCourses(studentId) {
    let url = "/students/" + studentId + "/courses";
    const response = await fetch(baseURL + url);
    const coursesJson = await response.json();
    if(response.ok){
        return coursesJson;
    } else {
        let err = {status: response.status, errObj:coursesJson};
        throw err;  // An object with the error coming from the server
    }
}

async function getTeacherLectures() {
    let url = "/teachers/lectures";
    const response = await fetch(baseURL + url);
    const lecturesJson = await response.json();
    if(response.ok){
        return lecturesJson;
    } else {
        let err = {status: response.status, errObj:lecturesJson};
        throw err;  // An object with the error coming from the server
    }
}

async function getLectures(courseId) {
    let url = "/lectures";
    if(courseId){
        const queryParams = "?courseId=" + courseId;
        url += queryParams;
    }
    const response = await fetch(baseURL + url);
    const lecturesJson = await response.json();
    if(response.ok){
        return lecturesJson;
    } else {
        let err = {status: response.status, errObj:lecturesJson};
        throw err;  // An object with the error coming from the server
    }
}

async function getBookings(lectureId) {
    let url = "/bookings";
    if(lectureId){
        const queryParams = "?lectureId=" + lectureId;
        url += queryParams;
    }
    const response = await fetch(baseURL + url);
    const bookingsJson = await response.json();
    if(response.ok){
        return bookingsJson;
    } else {
        let err = {status: response.status, errObj: bookingsJson};
        throw err;  // An object with the error coming from the server
    }
}

async function addBooking(booking) {
    return new Promise((resolve, reject) => {
        fetch(baseURL + "/bookings", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(booking),
        }).then( (response) => {
            if(response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                    .then( (obj) => {reject(obj);} ) // error msg in the response body
                    .catch( (err) => {reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch( (err) => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function deleteLectureById(lectureId) {
    return new Promise((resolve, reject) => {
        fetch(baseURL + "/lectures/" + lectureId, {
            method: 'DELETE'
        }).then( (response) => {
            if(response.ok) {
                resolve("DONE");
            } else {
                // analyze the cause of error
                response.json()
                .then( (obj) => {reject(obj);} ) // error msg in the response body
                .catch( (err) => {reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch( (err) => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}
async function cancelBooking(booking) {
    return new Promise((resolve, reject) =>{
        fetch(baseURL + "/bookings", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(booking),
        }).then((response) => {
            if (response.ok) {
                resolve(null);
            } else {
                response.json()
                .then( (obj) => {reject(obj);})
                .catch( (err) => { reject({errors: [{ param: "Application", msg: "Cannot parse server response" }]})}); //something else
            }
        }).catch( (err) => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); 
        
    
    })
}
async function ChangeLecturemodeById(lectureId) {
    const response = await fetch(baseURL + "/lectures/" + lectureId, {
        method: 'POST'
    });
    if(response.ok) {
        return "DONE";
    } else {
        response.json()
            .then( (obj) => { throw obj; })
            .catch( (err) => { throw {errors: [{ param: "Application", msg: "Cannot parse server response" }]}; }); //something else
    }
}

const API = { getTeacherLectures, getLectures, getStudentCourses, getBookings, login, addBooking, getUser, deleteLectureById, cancelBooking,ChangeLecturemodeById };
export default API;