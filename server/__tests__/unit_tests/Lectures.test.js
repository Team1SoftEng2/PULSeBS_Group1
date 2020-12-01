/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
// Le dipendenze vanno importate sennò non funziona
const to = require('await-to-js').default;
const moment = require('moment');

const Controller = require('../../controllers/Lectures');

const Lectures = require('../../service/LecturesService');
const Courses = require('../../service/CourseService');

// wrappo il modulo service cosi da poter sostituire le sue funzioni con funzioni mockup
jest.mock('../../service/LecturesService');
jest.mock('../../service/CourseService');

const httpMocks = require('node-mocks-http');


// -----------------------------------------------------------------------------------------
// mockup data------------------------------------------------------------------------------

const lectures = [
  {
    lectureId: 'IS1003',
    courseId: 'IS001',
    teacherId: 't37001',
    date: '20-11-2020 13:00',
    time: '13:00~14:30',
    mode: 'present',
    room: 'Aula 1',
    maxSeats: 150,
  },
  {
    lectureId: 'IS1004',
    courseId: 'IS001',
    teacherId: 't37001',
    date: '20-11-2020 13:00',
    time: '13:00~14:30',
    mode: 'present',
    room: 'Aula 1',
    maxSeats: 150,
  },
  {
    lectureId: 'IS1005',
    courseId: 'IS002',
    teacherId: 't37002',
    date: '20-11-2020 13:00',
    time: '13:00~14:30',
    mode: 'present',
    room: 'Aula 1',
    maxSeats: 150,
  },
];

const courses = [
  {
    courseId: 'IS001',
    teacherId: 't37001',
    name: 'Information System',
  },
  {
    courseId: 'IS002',
    teacherId: 't37002',
    name: 'Web App 1',
  },
  {
    courseId: 'IS003',
    teacherId: 't37003',
    name: 'Data Science',
  },
];

// end of mockup data-------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------

test('get all lectures test', () => {
  const req = httpMocks.createRequest();
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  // ridefinisco la funzione che interagisce con il database
  Lectures.getLectures.mockImplementation(() => Promise.resolve(lectures));

  return Controller.apiLecturesGET(req, res).then(() => {
    const data = res._getJSONData();
    expect(data).toEqual(lectures);
  });
});


test('get all lectures available to a teacher', () => {
  const req = httpMocks.createRequest({user: {user: 't37001'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  // ridefinisco la funzione che interagisce con il database
  Lectures.getLectures.mockImplementation((id) => {
    Promise.resolve(lectures.filter((lectureId)=> {
      return id === lectureId;
    }));
  });

  Courses.getCourseByTeacherID.mockImplementation((id) => {
    Promise.resolve(
        courses.filter((teacherId) => {
          return teacherId === id;
        }));
  });

  return Controller.apiTeacherLecturesGET(req, res).then(() => {
    const data = res._getJSONData();
    expect(data).toEqual([{
      lectureId: 'IS1003',
      courseId: 'IS001',
      teacherId: 't37001',
      date: '20-11-2020 13:00',
      time: '13:00~14:30',
      mode: 'present',
      room: 'Aula 1',
      maxSeats: 150,
    },
    {
      lectureId: 'IS1004',
      courseId: 'IS001',
      teacherId: 't37001',
      date: '20-11-2020 13:00',
      time: '13:00~14:30',
      mode: 'present',
      room: 'Aula 1',
      maxSeats: 150,
    }]);
  });
});

