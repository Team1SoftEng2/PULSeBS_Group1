async function getLectures() {
    return new Promise((resolve, reject) => {
        resolve([
            {
                lectureId: "prova1",
                courseId: "C1",
                teacherId: "T1",
                date: "",
                time: "",
                mode: "", 
                room: "aulaA",
                maxSeats: ""
            },
            {
                lectureId: "prova2",
                courseId: "C2",
                teacherId: "T2",
                date: "",
                time: "",
                mode: "", 
                room: "aulaB",
                maxSeats: ""
            },
            {
                lectureId: "prova3",
                courseId: "C3",
                teacherId: "T1",
                date: "",
                time: "",
                mode: "", 
                room: "aulaC",
                maxSeats: ""
            }
        ]);
    });
}

async function getBookings(lectureId) {
    return new Promise((resolve, reject) => {
        resolve([
            {
                studentId:`Student1 of lecture ${lectureId}`
            },
            {
                studentId:`Student2 of lecture ${lectureId}`
            },
            {
                studentId:`Student3 of lecture ${lectureId}`
            }
        ]
        );
    });
}

const API = { getLectures, getBookings };
export default API;