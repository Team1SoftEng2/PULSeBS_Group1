// Setting mock DB
const dbMock = require('../../components/__mocks__/db');
jest.setMock('../../components/db', dbMock);

const sqlite = require('sqlite3').verbose();

// Import modules
const db = require('../../components/db');
const Authentication = require('../../service/AuthenticationService');
const Bookings = require('../../service/BookingsService');
const Course = require('../../service/CourseService');
const Lectures = require('../../service/LecturesService');

beforeAll( () => {
    db.serialize( () => {
        db.run("INSERT INTO Student(StudentID, Name, Surname, emailAddress, password) VALUES('s00001', 'John', 'Smith', 'john.smith@email.com', '$2a$10$9un76S8o2Liw/pIx5dhmMen9Mv89KEH/Vq5aLkqWfUF.GWXFei8V.')");
        db.run("INSERT INTO Teacher(TeacherID, Name, Surname, emailAddress, password) VALUES('t00001', 'John', 'Smith', 'john.smith@email.com', '$2a$10$9un76S8o2Liw/pIx5dhmMen9Mv89KEH/Vq5aLkqWfUF.GWXFei8V.')");
        db.run("INSERT INTO Course(CourseID, TeacherId, courseName) VALUES ('1', 't00001', 'C1')");
        db.run("INSERT INTO Lecture(LectureID, CourseID, TeacherID, Date, Time, mode, place, maxSeats) VALUES('1', '1', 't00001', 'date', 'time', 'online', null, null), ('2', '1', 't00001', 'date', 'time', 'present', 'Aula 2', 30), ('3', '1', 't00001', 'date', 'time', 'present', 'Aula 2', 30)");
        db.run("INSERT INTO Booking(StudentID, LectureID) VALUES ('s00001', '1'), ('s00001', '2')");
        db.run("INSERT INTO CourseAttendance(StudentID, CourseID) VALUES ('s00001', '1')")
        // db.run("INSERT INTO LectureAttendance(StudentID, LectureID) VALUES ('s00001', '1'), ('s00001', '2')");
        // db.run("INSERT INTO LectureDeleted(LectureID, CourseID, TeacherID, Date, Time, mode, place, maxSeats) VALUES('1', '1', 't00001', 'date', 'time', 'online', null, null), ('2', '1', 't00001', 'date', 'time', 'present', 'Aula 2', 30), ('3', '1', 't00001', 'date', 'time', 'present', 'Aula 2', 30)")
});
});

afterAll( () => {
    db.serialize( () => { 
        // db.run("DELETE FROM LectureAttendance");
        // db.run("DELETE FROM LectureDeleted");
        db.run("DELETE FROM CourseAttendance");
        db.run("DELETE FROM Booking");
        db.run("DELETE FROM Lecture");
        db.run("DELETE FROM Course");
        db.run("DELETE FROM Teacher");
        db.run("DELETE FROM Student");
       
    });
});


describe('AuthenticationService Test', () => {
    // lines to cover: 27-33
    const user = {
        'userId': 's00001',
        'name': 'John',
        'surname': 'Smith',
        'email': 'john.smith@email.com',
        'hash': '$2a$10$9un76S8o2Liw/pIx5dhmMen9Mv89KEH/Vq5aLkqWfUF.GWXFei8V.' 
    }

    test('Testing getUserById', () => { 
        Authentication.getUserById('s00001')
            .then( (data) => {
                expect.assertions(1);
                expect(data).toEqual(user);
            });
        Authentication.getUserById('s00002')
            .then( (data) => {
                expect.assertions(1);
                expect(data).toBeUndefined;
            });
    });

    test('Testing checkPassword', () => {
        expect(Authentication.checkPassword(user,'password')).toBeTruthy;
    });
});

describe('BookingsService', () => {
    // lines to cover: 13-19,37,49
    test('Testing getBookings', () => {
        Bookings.getBookings()
            .then( (data) => {
                expect.assertions(1);
                expect(data.length).toBe(2);
            });
        
        Bookings.getBookings('1')
            .then( (data) => {
                expect.assertions(1);
                expect(data.length).toBe(1);
            });
        // missing test: DB doesn't work
    });
    
    test('Testing apiBookingsPOST', () => {
        Bookings.apiBookingsPOST({ 'studentId': 's00001', 'lectureId': '3' })
            .then((data) => {
                expect.assertions(1);
                expect(data).toBeNull;
            });
        // missing test: DB doesn't work
    });
    
    test('Testing apiBookingsDelete', () => {
        Bookings.apiBookingsDelete({ 'studentId': 's00001', 'lectureId': '2' })
            .then((data) => {
                expect.assertions(1);
                expect(data).toBeNull;
            });
        // missing test: DB doesn't work
    });

    // //li
    // test('getLecturesAttendance', () => {
    //     try {  
    //         Bookings.getLecturesAttendance({'courseId':'1','date': 'date'}).then((data) => {
    //         expect.assertions(1);
    //         expect(data).toBe('successfull');
    //     });
    //     }
    //     catch (err) {
    //     expect(err).toBe('fail');
    //   }
    // });

    // test('getBooksList', () => {
    //     try {  
    //         Bookings.getBooksList({'courseId':'1','date': 'date'}).then((data) => {
    //         expect.assertions(1);
    //         expect(data).toBe('successfull');
    //     });
    //     }
    //     catch (err) {
    //     expect(err).toBe('fail');
    //   }
    // });

});

describe('CourseService Test', () => {
    // lines to cover: 11-21,31-36,47-52
    const course = {
        'courseId': '1',
        'teacherId': 't00001',
        'name': 'C1' 
    };
    
    test('Testing getCourseById', () => {
        Course.getCourseById('1')
            .then((data) => {
                expect.assertions(1);
                expect(data).toEqual(course);
            });
        Course.getCourseById('2')
            .then((data) => {
                expect.assertions(1);
                expect(data).toBeUndefined;
            });
        // missing test: DB doesn't work
    });

    test('Testing getStudentCourses', () => {
        Course.getStudentCourses('s00001')
            .then((data) => {
                expect.assertions(1);
                expect(data.length).toBe(1);
            });
    });

    test('Testing getCourseByTeacherID', () => {
        Course.getCourseByTeacherID('t00001')
            .then((data) => {
                expect.assertions(1);
                expect(data.length).toBe(1);
            });
    });
});

describe('LecturesService Test', () => {
    // lines to cover: 13-27,40-54,66-69
    const lecture = {
        'lectureId': '1',
        'courseId': '1',
        'teacherId': 't00001',
        'date': 'date',
        'time': 'time',
        'mode': 'online'
    }
    const teacher = {
        'teacherId':'t00001',
        'name':'John',
        'surname': 'Smith', 
        'emailAddress':'john.smith@email.com', 
        'hash':'$2a$10$9un76S8o2Liw/pIx5dhmMen9Mv89KEH/Vq5aLkqWfUF.GWXFei8V.',

    }
    const course = {
        'courseId': '1',
        'teacherId': 't00001',
        'name': 'C1' 
    }
    const lecturedeleted = {
        'lectureId': '1',
        'courseId': '1',
        'teacherId': 't00001',
        'date': 'date',
        'time': 'time',
        'mode': 'online'
    }

    test('getLectures', () => {
        Lectures.getLectures()
            .then( (data) => {
                expect.assertions(1);
                expect(data.length).toBe(3);
            });
        Lectures.getLectures('1')
            .then( (data) => {
                expect.assertions(1);
                expect(data.length).toBe(3);
            });
    });

    test('getLectureById', () => {
        Lectures.getLectureById('1')
            .then( (data) => {
                expect.assertions(1);
                expect(data).toEqual(lecture);
            })
    });

    test('deleteLectureById', () => {
        Lectures.deleteLectureById('3')
            .then((data) => {
                expect.assertions(1);
                expect(data).toBe('Successful');
            })
    });


//LI

    // test('getLecturesDelectList', () => {
    //     try {  
    //         Lectures.getLecturesDelectList({'courseId':'1','date': 'date'}).then((data) => {
    //             expect.assertions(1);
    //             expect(data).toBe('successfull');
    //         });
    //     }
    //     catch (err) {
    //         expect(err).toBe('fail');
    //     }
    // });

});