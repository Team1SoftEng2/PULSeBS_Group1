const fs = require('fs'); 
const path = require('path');
const moment = require('moment');

const Lecture = require('../../components/lecture');
const Parser = require('../../controllers/Parser');
const Courses = require('../../service/CourseService');

jest.mock('../../service/CourseService');

describe('test CSVtoJSON', () => {
    it('No errors', () => {
        fs.writeFileSync(path.join(__dirname, 'enrollment.csv'), 
            'Code,Student\r\n' +
            'XY1211,902800\r\n' +
            'XY1211,902799\r\n' +
            'XY1211,902798\r\n');

        Parser.CSVtoJSON(path.join(__dirname, 'enrollment.csv')).then((data) => {
            expect.assertions(3);
            expect(data.length).toBe(3);
            expect(data[0].Code).toBe('XY1211');
            expect(data[0].Student).toBe('902800');
        });
    });
});

describe('test createLectures', () => {
    let schedule = {
        Code: 'XY1211',
        Room: 1,
        Day: 'Mon',
        Seats:120,
        Time: '8:30-11:30'
    };

    it('No errors', () => {
        Courses.getCourseById.mockImplementation(() => Promise.resolve({teacherId: 'teacher'}));
        Parser.createLectures(schedule).then((lectures) => {
            let id = schedule.Code + moment('05-10-2020 08:30', 'DD-MM-YYYY HH:mm').format();
            expect.assertions(2);
            expect(lectures.length).toBe(17);
            expect(lectures[0]).toEqual(new Lecture(id, schedule.Code, 'teacher', '05-10-2020 08:30', '8:30~11:30', 'present', schedule.Room, schedule.Seats))
        })
    });

    it('DB erros', () => {
        Courses.getCourseById.mockImplementation(() => Promise.reject('error'));
        Parser.createLectures(schedule).catch((err) => {
            expect.assertions(1);
            expect(err).toBe('error');
        });
    });

})