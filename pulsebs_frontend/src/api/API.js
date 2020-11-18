import User from './User';
const baseURL = "/api";

/*
async function isAuthenticated(){
    let url = "/user";
    const response = await fetch(baseURL + url);
    const userJson = await response.json();
    if(response.ok){
        return userJson;
    } else {
        let err = { status: response.status, errObj: userJson};
        throw err;
    }
}
*/

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
                    console.log(user);
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

// async function getLectures() {
//     return new Promise((resolve, reject) => {
//         resolve([
//             {
//                 lectureId: "prova1",
//                 courseId: "C1",
//                 courseName: "Software Engineering 2",
//                 teacherId: "T1",
//                 date: "10/10/2020",
//                 time: "10:30",
//                 mode: "online", 
//                 room: "aulaA",
//                 maxSeats: "",
//             },
//             {
//                 lectureId: "prova2",
//                 courseId: "C2",
//                 courseName: "Software Engineering 2",
//                 teacherId: "T2",
//                 date: "",
//                 time: "",
//                 mode: "", 
//                 room: "aulaB",
//                 maxSeats: "",
//             },
//             {
//                 lectureId: "prova3",
//                 courseId: "C3",
//                 courseName: "Software Engineering 2",
//                 teacherId: "T1",
//                 date: "",
//                 time: "",
//                 mode: "", 
//                 room: "aulaC",
//                 maxSeats: "",
//             }
//         ]);
//     });
// }

// async function getBookings(lectureId) {
//     return new Promise((resolve, reject) => {
//         resolve([
//             {
//                 studentId:`StudentId1`,
//                 studentName:`Student1_Name`,
//                 studentSurname:`Student1_Surname`,
//             },
//             {
//                 studentId:`StudentId2`,
//                 studentName:`Student2_Name`,
//                 studentSurname:`Student2_Surname`,
//             },
//             {
//                 studentId:`StudentId3`,
//                 studentName:`Student3_Name`,
//                 studentSurname:`Student3_Surname`,
//             }
//         ]
//         );
//     });
// }


// prendere tutti i corsi dello studente
// prendere tutti le lezioni dei corsi

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

const API = { getLectures, getStudentCourses, getBookings, login};
export default API;