// const Parser = require('../../controllers/Parser');

// const Users = require('../../service/AuthenticationService');

// const Course = require('../../components/course');
// const Courses = require('../../service/CourseService');

// const Lecture = require('../../components/lecture'); 
// const Lectures = require('../../service/LecturesService');

// const httpMocks = require('node-mocks-http');
// const fs = require('fs'); 
// const path = require('path');

// jest.mock('../../service/AuthenticationService');
// jest.mock('../../service/LecturesService');
// jest.mock('../../service/CourseService');



// describe('parseEnrollmentCSV test', () => {
//     test('No errors', () => {
//         const req = httpMocks.createRequest({file: {path: path.join(__dirname, 'enrollment.csv')} });
//         const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

//         fs.writeFileSync(path.join(__dirname, 'enrollment.csv'), 
//         'Code,Student\r\n' +
//         'XY1211,902800\r\n' +
//         'XY1211,902799\r\n' +
//         'XY1211,902798\r\n');

//         Courses.addCourseAttendance.mockImplementationOnce(() => Promise.resolve());

//         Parser.parseEnrollmentCSV(req, res).then(() => {
//             const data = res._getJSONData();
//             expect.assertions(1);
//             expect(data.added).toBe(3);
//         });
//     });
// });

// describe('parseScheduleCSV test', () => {
//     test('No errors', () => {
//         const req = httpMocks.createRequest({file: {path: path.join(__dirname, 'schedule.csv')} });
//         const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

//         fs.writeFileSync(path.join(__dirname, 'schedule.csv'), 
//         'Code,Room,Day,Seats,Time\r\n' +
//         'XY1211,1,Mon,120,8:30-11:30\r\n' +
//         'XY4911,1,Mon,120,11:30-13:00\r\n');

//         Lectures.addLecture.mockImplementationOnce(() => Promise.resolve());
        
//         // const mock = jest.spyOn(Parser, 'createLectures').mockImplementation(() => Promise.resolve(['test1', 'test2']));

//         Parser.parseScheduleCSV(req, res).then(() => {
//             console.log('dentro')
//             const data = res._getJSONData();
//             expect.assertions(1);
//             expect(data.added).toBe(34);
//             // mock.mockRestore();
//         }).catch(() => {
//             console.log(res)
//         });
//     });
// });


const httpMocks = require('node-mocks-http'); 
const path = require('path');

const Uploads = require('../../controllers/Uploads');
const Parser = require('../../controllers/Parser');
const Users = require('../../service/AuthenticationService');
const Courses = require('../../service/CourseService');
const Lectures = require('../../service/LecturesService');

jest.mock('../../controllers/Parser');
jest.mock('../../service/AuthenticationService');
jest.mock('../../service/CourseService');
jest.mock('../../service/LecturesService');

describe('test parseStudentCSV', () => {
    const students = [
        {
            Id: 900000,
            Name: 'Ambra',
            Surname: 'Ferri',
            OfficialEmail: 's900000@students.politu.it'
        },
        {
            Id: 900001,
            Name: 'Gianfranco',
            Surname: 'Trentini',
            OfficialEmail: 's900001@students.politu.it'
        },
        {
            Id: 900002,
            Name: 'Maria Rosa',
            Surname: 'Pugliesi',
            OfficialEmail: '900002@students.politu.it'
        },
    ];

    it('No errors', () => {
        const req = httpMocks.createRequest({file: {path: path.join(__dirname, 'file')} });
        const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

        Parser.CSVtoJSON.mockImplementation((path) => Promise.resolve(students));
        Users.addStudent.mockImplementation(() => Promise.resolve());

        Uploads.parseStudentsCSV(req, res).then(() => {
            const data = res._getJSONData();
            expect.assertions(1);
            expect(data.added).toBe(3);
        });         
    });

    it('csv error', () => {
        const req = httpMocks.createRequest({file: {path: path.join(__dirname, 'file')} });
        const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

        Parser.CSVtoJSON.mockImplementation((path) => Promise.reject('csv error'));
        Users.addStudent.mockImplementation(() => Promise.resolve());

        Uploads.parseStudentsCSV(req, res).then(() => {
            const data = res._getJSONData();
            expect.assertions(3);
            expect(data.errors[0].msg).toBe('csv error');
            expect(res.statusCode).toBe(500);
        });         
    });

    it('db error', () => {
        const req = httpMocks.createRequest({file: {path: path.join(__dirname, 'file')} });
        const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

        Parser.CSVtoJSON.mockImplementation((path) => Promise.resolve(students));
        Users.addStudent.mockImplementation(() => Promise.reject());

        Uploads.parseStudentsCSV(req, res).then(() => {
            const data = res._getJSONData();
            expect.assertions(2);
            expect(data.errors[0].msg).toBe('No element added');
            expect(res.statusCode).toBe(422);
        });         
    });
});

describe('test parseTeachersCSV', () => {
    const teachers = [
        {
            Number: 'd900000',
            GivenName: 'Ambra',
            Surname: 'Ferri',
            OfficialEmail: 's900000@students.politu.it'
        },
        {
            Number: 'd900001',
            GivenName: 'Gianfranco',
            Surname: 'Trentini',
            OfficialEmail: 's900001@students.politu.it'
        },
        {
            Number: 'd900002',
            GivenName: 'Maria Rosa',
            Surname: 'Pugliesi',
            OfficialEmail: '900002@students.politu.it'
        },
    ];

    it('No errors', () => {
        const req = httpMocks.createRequest({file: {path: path.join(__dirname, 'file')} });
        const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

        Parser.CSVtoJSON.mockImplementation((path) => Promise.resolve(teachers));
        Users.addTeacher.mockImplementation(() => Promise.resolve());

        Uploads.parseTeachersCSV(req, res).then(() => {
            const data = res._getJSONData();
            expect.assertions(1);
            expect(data.added).toBe(3);
        });         
    });

    it('csv error', () => {
        const req = httpMocks.createRequest({file: {path: path.join(__dirname, 'file')} });
        const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

        Parser.CSVtoJSON.mockImplementation((path) => Promise.reject('csv error'));
        Users.addTeacher.mockImplementation(() => Promise.resolve());

        Uploads.parseTeachersCSV(req, res).then(() => {
            const data = res._getJSONData();
            expect.assertions(3);
            expect(data.errors[0].msg).toBe('csv error');
            expect(res.statusCode).toBe(500);
        });         
    });

    it('db error', () => {
        const req = httpMocks.createRequest({file: {path: path.join(__dirname, 'file')} });
        const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

        Parser.CSVtoJSON.mockImplementation((path) => Promise.resolve(teachers));
        Users.addTeacher.mockImplementation(() => Promise.reject());

        Uploads.parseTeachersCSV(req, res).then(() => {
            const data = res._getJSONData();
            expect.assertions(2);
            expect(data.errors[0].msg).toBe('No element added');
            expect(res.statusCode).toBe(422);
        });         
    });
});

describe('test parseCoursesCSV', () => {
    const courses = [
        {
            Code: 900000,
            Teacher: 'Ambra',
            Course: 'Ferri',
        },
        {
            Code: 900001,
            Teacher: 'Gianfranco',
            Course: 'Trentini',
        },
        {
            Code: 900002,
            Teacher: 'Maria Rosa',
            Course: 'Pugliesi',
        },
    ];

    it('No errors', () => {
        const req = httpMocks.createRequest({file: {path: path.join(__dirname, 'file')} });
        const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

        Parser.CSVtoJSON.mockImplementation((path) => Promise.resolve(courses));
        Courses.addCourse.mockImplementation(() => Promise.resolve());

        Uploads.parseCoursesCSV(req, res).then(() => {
            const data = res._getJSONData();
            expect.assertions(1);
            expect(data.added).toBe(3);
        });         
    });

    it('csv error', () => {
        const req = httpMocks.createRequest({file: {path: path.join(__dirname, 'file')} });
        const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

        Parser.CSVtoJSON.mockImplementation((path) => Promise.reject('csv error'));
        Courses.addCourse.mockImplementation(() => Promise.resolve());

        Uploads.parseCoursesCSV(req, res).then(() => {
            const data = res._getJSONData();
            expect.assertions(3);
            expect(data.errors[0].msg).toBe('csv error');
            expect(res.statusCode).toBe(500);
        });         
    });

    it('db error', () => {
        const req = httpMocks.createRequest({file: {path: path.join(__dirname, 'file')} });
        const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

        Parser.CSVtoJSON.mockImplementation((path) => Promise.resolve(courses));
        Courses.addCourse.mockImplementation(() => Promise.reject());

        Uploads.parseCoursesCSV(req, res).then(() => {
            const data = res._getJSONData();
            expect.assertions(2);
            expect(data.errors[0].msg).toBe('No element added');
            expect(res.statusCode).toBe(422);
        });         
    });
});

describe('test parseCourseAttendanceCSV', () => {
    const courseAttendance = [
        {
            Code: 900000,
            Student: 'Ambra',
        },
        {
            Code: 900001,
            Student: 'Gianfranco',
        },
        {
            Code: 900002,
            Student: 'Maria Rosa',
        },
    ];

    it('No errors', () => {
        const req = httpMocks.createRequest({file: {path: path.join(__dirname, 'file')} });
        const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

        Parser.CSVtoJSON.mockImplementation((path) => Promise.resolve(courseAttendance));
        Courses.addCourseAttendance.mockImplementation(() => Promise.resolve());

        Uploads.parseEnrollmentCSV(req, res).then(() => {
            const data = res._getJSONData();
            expect.assertions(1);
            expect(data.added).toBe(3);
        });         
    });

    it('csv error', () => {
        const req = httpMocks.createRequest({file: {path: path.join(__dirname, 'file')} });
        const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

        Parser.CSVtoJSON.mockImplementation((path) => Promise.reject('csv error'));
        Courses.addCourseAttendance.mockImplementation(() => Promise.resolve());

        Uploads.parseEnrollmentCSV(req, res).then(() => {
            const data = res._getJSONData();
            expect.assertions(3);
            expect(data.errors[0].msg).toBe('csv error');
            expect(res.statusCode).toBe(500);
        });         
    });

    it('db error', () => {
        const req = httpMocks.createRequest({file: {path: path.join(__dirname, 'file')} });
        const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

        Parser.CSVtoJSON.mockImplementation((path) => Promise.resolve(courseAttendance));
        Courses.addCourseAttendance.mockImplementation(() => Promise.reject());

        Uploads.parseEnrollmentCSV(req, res).then(() => {
            const data = res._getJSONData();
            expect.assertions(2);
            expect(data.errors[0].msg).toBe('No element added');
            expect(res.statusCode).toBe(422);
        });         
    });
});

describe('test parseScheduleCSV', () => {
    const values = [ 'Ambra', 'Gianfranco', 'Maria Rosa' ] 

    it('No errors', () => {
        const req = httpMocks.createRequest({file: {path: path.join(__dirname, 'file')} });
        const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

        Parser.CSVtoJSON.mockImplementation((path) => Promise.resolve(values));
        Parser.createLectures.mockImplementation((value) => Promise.resolve([value + '1', value + '2']));
        Lectures.addLecture.mockImplementation(() => Promise.resolve());

        Uploads.parseScheduleCSV(req, res).then(() => {
            const data = res._getJSONData();
            expect.assertions(1);
            expect(data.added).toBe(6);
        });         
    });

    it('csv error', () => {
        const req = httpMocks.createRequest({file: {path: path.join(__dirname, 'file')} });
        const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

        Parser.CSVtoJSON.mockImplementation((path) => Promise.reject('csv error'));
        Parser.createLectures.mockImplementation((value) => Promise.resolve([value + '1', value + '2']));
        Lectures.addLecture.mockImplementation(() => Promise.resolve());

        Uploads.parseScheduleCSV(req, res).then(() => {
            const data = res._getJSONData();
            expect.assertions(3);
            expect(data.errors[0].msg).toBe('csv error');
            expect(res.statusCode).toBe(500);
        });         
    });

    it('db error', () => {
        const req = httpMocks.createRequest({file: {path: path.join(__dirname, 'file')} });
        const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

        Parser.CSVtoJSON.mockImplementation((path) => Promise.resolve(values));
        Parser.createLectures.mockImplementation((value) => Promise.resolve([value + '1', value + '2']));
        Lectures.addLecture.mockImplementation(() => Promise.reject());

        Uploads.parseScheduleCSV(req, res).then(() => {
            const data = res._getJSONData();
            expect.assertions(2);
            expect(data.errors[0].msg).toBe('No element added');
            expect(res.statusCode).toBe(422);
        });         
    });

    // it('createLecturs error', () => {
    //     const req = httpMocks.createRequest({file: {path: path.join(__dirname, 'file')} });
    //     const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

    //     Parser.CSVtoJSON.mockImplementation((path) => Promise.resolve(values));
    //     Parser.createLectures.mockImplementation((value) => Promise.reject('error'));
    //     Lectures.addLecture.mockImplementation(() => Promise.resolve());

    //     Uploads.parseScheduleCSV(req, res).then(() => {
    //         const data = res._getJSONData();
    //         expect.assertions(2);
    //         expect(data.errors[0].msg).toBe('error');
    //         expect(res.statusCode).toBe(500);
    //     }).catch((err) => console.log(err));         
    // });
});