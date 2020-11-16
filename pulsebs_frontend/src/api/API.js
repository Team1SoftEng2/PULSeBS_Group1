async function getLectures() {
    return new Promise((resolve, reject) => {
        resolve([
            {
                lectureId: "prova1",
                courseId: "C1",
                courseName: "Software Engineering 2",
                teacherId: "T1",
                date: "10/10/2020",
                time: "10:30",
                mode: "online", 
                room: "aulaA",
                maxSeats: "",
            },
            {
                lectureId: "prova2",
                courseId: "C2",
                courseName: "Software Engineering 2",
                teacherId: "T2",
                date: "",
                time: "",
                mode: "", 
                room: "aulaB",
                maxSeats: "",
            },
            {
                lectureId: "prova3",
                courseId: "C3",
                courseName: "Software Engineering 2",
                teacherId: "T1",
                date: "",
                time: "",
                mode: "", 
                room: "aulaC",
                maxSeats: "",
            }
        ]);
    });
}

async function getBookings(lectureId) {
    return new Promise((resolve, reject) => {
        resolve([
            {
                studentId:`StudentId1`,
                studentName:`Student1_Name`,
                studentSurname:`Student1_Surname`,
            },
            {
                studentId:`StudentId2`,
                studentName:`Student2_Name`,
                studentSurname:`Student2_Surname`,
            },
            {
                studentId:`StudentId3`,
                studentName:`Student3_Name`,
                studentSurname:`Student3_Surname`,
            }
        ]
        );
    });
}

class BookingLectures{
    constructor(lectureId,courseId,teacherId,room,booked){
       this.lectureId=lectureId;
       this.courseId=courseId;
       this.teacherId= teacherId;
       this.date= "";
       this.time="";
       this.mode= ""; 
       this.room= room;
       this.maxSeats= "";
       this.booked=booked;
    }
    book_the_lecture = () =>{console.log("prima "+this.booked);
                               this.booked=!this.booked
                               //this.setState(this.state);
                               console.log("dopo "+this.booked);};
}



const API = { getLectures, getBookings };
export default API;


export const  StudentBookedList = [
    new BookingLectures('prova1','c1','t1','aulaAA',false),
    new BookingLectures('prova2','c2','t2','aulaBB',false),
    new BookingLectures('prova3','c3','t1','aulaCC',true),
    ]