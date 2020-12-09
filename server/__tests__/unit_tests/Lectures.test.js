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
  {
    courseId: 'ML001',
    teacherId: 't37004',
    name: 'Machine Learning',
  },
];

// end of mockup data-------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------

/* ============================================================================================
                                    TESTS of apiLecturesGET
=============================================================================================*/
test('get all lectures test', () => {
  const req = httpMocks.createRequest();
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  // ridefinisco la funzione che interagisce con il database
  Lectures.getLectures.mockImplementation(() => Promise.resolve(lectures));

  // calling function to be tested
  return Controller.apiLecturesGET(req, res).then(() => {
    expect.assertions(1);
    const data = res._getJSONData();
    expect(data).toEqual(lectures);
  });
});

test('get all lectures test given a CourseID', () => {
  const req = httpMocks.createRequest({query: {courseId: 'IS001'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  // ridefinisco la funzione che interagisce con il database
  Lectures.getLectures.mockImplementation((courseId) => {
    const result = lectures.filter((lecture) => lecture.courseId === courseId);
    return Promise.resolve(result);
  });

  return Controller.apiLecturesGET(req, res).then(() => {
    const data = res._getJSONData();
    expect.assertions(1);
    expect(data).toEqual( [
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
    ]);
  });
});

test('get all lectures given a non existing courseId', () => {
  const req = httpMocks.createRequest({query: {courseId: 'IS005'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  // ridefinisco la funzione che interagisce con il database
  Lectures.getLectures.mockImplementation((courseId) => {
    const result = lectures.filter((lecture) => lecture.courseId === courseId);
    return Promise.resolve(result);
  });

  return Controller.apiLecturesGET(req, res).then(() => {
    const data = res._getJSONData();
    expect.assertions(1);
    expect(data).toEqual({errors: [{'param': 'Server', 'msg': 'lecture not found'}]});
  });
});

test('get all lectures but an error occours in the db', () => {
  const req = httpMocks.createRequest({query: {courseId: 'IS005'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  // ridefinisco la funzione che interagisce con il database
  Lectures.getLectures.mockImplementation((courseId) => {
    return Promise.reject('db error');
  });

  return Controller.apiLecturesGET(req, res).then(() => {
    const data = res._getJSONData();
    expect.assertions(1);
    expect(data).toEqual({errors: [{'param': 'Server', 'msg': 'db error'}]});
  });
});
/* ============================================================================================
                                  TESTS of getCourseByTeacherID
=============================================================================================*/

test('get all lectures available to a teacher', () => {
  const req = httpMocks.createRequest({user: {user: 't37001'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  // ridefinisco la funzione che interagisce con il database
  Lectures.getLectures.mockImplementation((id) => {
    const filteredLectures = lectures.filter((lecture)=> {
      return id === lecture.courseId;
    });
    return Promise.resolve(filteredLectures);
  });

  Courses.getCourseByTeacherID.mockImplementation((id) => {
    const filteredCourses = courses.filter((course) => {
      return course.teacherId === id;
    });
    return Promise.resolve(filteredCourses);
  });

  // calling function to be tested
  return Controller.apiTeacherLecturesGET(req, res).then(() => {
    const data = res._getJSONData();
    expect.assertions(1);
    expect(data).toEqual([
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
    ]);
  });
});

test('get all lectures available to a teacher with no courses', () => {
  const req = httpMocks.createRequest({user: {user: 't37009'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  // ridefinisco la funzione che interagisce con il database
  Lectures.getLectures.mockImplementation((id) => {
    const filteredLectures = lectures.filter((lecture)=> {
      return id === lecture.courseId;
    });
    return Promise.resolve(filteredLectures);
  });

  Courses.getCourseByTeacherID.mockImplementation((id) => {
    const filteredCourses = courses.filter((course) => {
      return course.teacherId === id;
    });
    return Promise.resolve(filteredCourses);
  });

  // calling function to be tested
  return Controller.apiTeacherLecturesGET(req, res).then(() => {
    const data = res._getJSONData();
    expect.assertions(1);
    expect(data).toEqual({errors: [{'param': 'Server', 'msg': 'courses not found'}]});
  });
});

test('get all lectures available to a teacher but an error occurs in getCourseByTeacherID', () => {
  const req = httpMocks.createRequest({user: {user: 't37001'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  // ridefinisco la funzione che interagisce con il database
  Lectures.getLectures.mockImplementation((id) => {
    const filteredLectures = lectures.filter((lecture)=> {
      return id === lecture.courseId;
    });
    return Promise.resolve(filteredLectures);
  });

  Courses.getCourseByTeacherID.mockImplementation((id) => Promise.reject('db error'));

  // calling function to be tested
  return Controller.apiTeacherLecturesGET(req, res).then(() => {
    const data = res._getJSONData();
    expect.assertions(1);
    expect(data).toEqual({errors: [{'param': 'Server', 'msg': 'db error'}]});
  });
});

test('get all lectures available to a teacher but an error occurs in getLecture', () => {
  const req = httpMocks.createRequest({user: {user: 't37001'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  // ridefinisco la funzione che interagisce con il database
  Lectures.getLectures.mockImplementation((id) => Promise.reject('db error'));

  Courses.getCourseByTeacherID.mockImplementation((id) => {
    const filteredCourses = courses.filter((course) => {
      return course.teacherId === id;
    });
    return Promise.resolve(filteredCourses);
  });

  // calling function to be tested
  return Controller.apiTeacherLecturesGET(req, res).then(() => {
    const data = res._getJSONData();
    expect.assertions(1);
    expect(data).toEqual({errors: [{'param': 'Server', 'msg': 'db error'}]});
  });
});

test('get all lectures available to a teacher with a course with no lectures', () => {
  const req = httpMocks.createRequest({user: {user: 't37004'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  // ridefinisco la funzione che interagisce con il database
  Lectures.getLectures.mockImplementation((id) => {
    const filteredLectures = lectures.filter((lecture)=> {
      return id === lecture.courseId;
    });
    return Promise.resolve(filteredLectures);
  });

  Courses.getCourseByTeacherID.mockImplementation((id) => {
    const filteredCourses = courses.filter((course) => {
      return course.teacherId === id;
    });
    return Promise.resolve(filteredCourses);
  });

  // calling function to be tested
  return Controller.apiTeacherLecturesGET(req, res).then(() => {
    const data = res._getJSONData();
    expect.assertions(1);
    expect(data).toEqual({errors: [{'param': 'Server', 'msg': 'lectures not found'}]});
  });
});


/* ============================================================================================
                                  TESTS of deleteLectureById
=============================================================================================*/


test('delete a lecture by id', () => {
  const req = httpMocks.createRequest({params: {id: 'IS1004'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  // ridefinisco la funzione che interagisce con il database
  Lectures.getLectureById.mockImplementation((id) => {
    const filteredLectures = lectures.filter((lecture)=> {
      return id === lecture.lectureId;
    });
    return Promise.resolve(filteredLectures[0]);
  });

  Lectures.deleteLectureById.mockImplementation(() => Promise.resolve('OK'));

  Controller.apiLecturesIdDELETE(req, res).then(() => {
    const data = res._getJSONData();
    // expect.assertions(1);
    expect(data).toEqual({'errors': [{'msg': 'not in time', 'param': 'Server'}]});
  });
});
