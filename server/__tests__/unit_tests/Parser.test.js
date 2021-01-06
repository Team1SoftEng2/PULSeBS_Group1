const Parser = require('../../controllers/Parser');

const Users = require('../../service/AuthenticationService');

const Course = require('../../components/course');
const Courses = require('../../service/CourseService');

const Lecture = require('../../components/lecture'); 
const Lectures = require('../../service/LecturesService');

const httpMocks = require('node-mocks-http');
const fs = require('fs'); 
const path = require('path');

jest.mock('../../service/AuthenticationService');
jest.mock('../../service/LecturesService');
jest.mock('../../service/CourseService');

describe('parseStudentCSV tests', () => {
    test('No errors', () => {
        const req = httpMocks.createRequest({file: {path: path.join(__dirname, 'test.csv')} });
        const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});
    
        fs.writeFileSync(path.join(__dirname, 'test.csv'), 'Id,Name,Surname,City,OfficialEmail,Birthday,SSN\r\n' +
        '900000,Ambra,Ferri,Poggio Ferro,s900000@students.politu.it,1991-11-04,MK97060783\r\n' +
        '900001,Gianfranco,Trentini,Fenestrelle,s900001@students.politu.it,1991-11-05,SP80523410\r\n' +
        '900002,Maria Rosa,Pugliesi,Villapiccola,s900002@students.politu.it,1991-11-05,ZO70355767\r\n');

        Users.addStudent.mockImplementation(() => Promise.resolve());
    
        Parser.parseStudentsCSV(req, res).then(() => {
            const data = res._getJSONData();
            expect.assertions(1);
            expect(data.added).toBe(3);
        });
    });

    // test('No students added', () => {
    //     const req = httpMocks.createRequest({file: {path: path.join(__dirname, 'test.csv')} });
    //     const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});
    
    //     fs.writeFileSync(path.join(__dirname, 'test.csv'), 'Id,Name,Surname,City,OfficialEmail,Birthday,SSN\r\n' +
    //     '900000,Ambra,Ferri,Poggio Ferro,s900000@students.politu.it,1991-11-04,MK97060783\r\n' +
    //     '900001,Gianfranco,Trentini,Fenestrelle,s900001@students.politu.it,1991-11-05,SP80523410\r\n' +
    //     '900002,Maria Rosa,Pugliesi,Villapiccola,s900002@students.politu.it,1991-11-05,ZO70355767\r\n');

    //     Users.addStudent.mockImplementation(() => Promise.reject());
    
    //     Parser.parseStudentsCSV(req, res).then(() => {
    //         console.log(res);
    //         const data = res._getJSONData();
    //         expect.assertions(2);
    //         expect(res.statusCode).toBe(422);
    //         expect(data.errors[0].msg).toBe('No students added');
    //     }).catch(() => console.log(res));
    // })
});
