/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
// Le dipendenze vanno importate sennò non funziona
const to = require('await-to-js').default;
const moment = require('moment');

const Controller = require('../../controllers/Lectures');
const Email = require('../../controllers/Email');

const Lectures = require('../../service/LecturesService');
const Courses = require('../../service/CourseService');


jest.mock('../../controllers/Email');

// wrappo il modulo service cosi da poter sostituire le sue funzioni con funzioni mockup
jest.mock('../../service/LecturesService');
jest.mock('../../service/CourseService');

jest.mock('moment', () => {
  return (...args) => jest.requireActual('moment')(...(args.length == 0 ? ['20-11-2020 13:00', 'DD-MM-YYYY HH:mm'] : args));
});

const httpMocks = require('node-mocks-http');


// -----------------------------------------------------------------------------------------
// mockup data------------------------------------------------------------------------------

const lectures = [
  {
    lectureId: 'IS1003',
    courseId: 'IS001',
    teacherId: 't37001',
    date: '20-11-2021 13:00',
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
        date: '20-11-2021 13:00',
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
        date: '20-11-2021 13:00',
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


test('delete a lecture by id and in time', () => {
  // lecture IS1003 always in time because at end of 2021
  const req = httpMocks.createRequest({params: {id: 'IS1003'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  // ridefinisco la funzione che interagisce con il database
  Lectures.getLectureById.mockImplementation((id) => {
    const filteredLectures = lectures.filter((lecture)=> {
      return id === lecture.lectureId;
    });
    return Promise.resolve(filteredLectures[0]);
  });

  Lectures.deleteLectureById.mockImplementation(() => Promise.resolve({dbResponse: 'OK'}));

  return Controller.apiLecturesIdDELETE(req, res).then(() => {
    const data = res._getJSONData();
    expect.assertions(1);
    expect(data).toEqual({dbResponse: 'OK'});
  });
});

test('delete a lecture by id and not in time', () => {
  // lecture IS1003 always in time because at end of 2021
  const req = httpMocks.createRequest({params: {id: 'IS1004'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  // ridefinisco la funzione che interagisce con il database
  Lectures.getLectureById.mockImplementation((id) => {
    const filteredLectures = lectures.filter((lecture)=> {
      return id === lecture.lectureId;
    });
    return Promise.resolve(filteredLectures[0]);
  });

  Lectures.deleteLectureById.mockImplementation(() => Promise.resolve({dbResponse: 'OK'}));

  return Controller.apiLecturesIdDELETE(req, res).then(() => {
    const data = res._getJSONData();
    expect.assertions(1);
    expect(data).toEqual({errors: [{'param': 'Server', 'msg': 'not in time'}]});
  });
});

test('delete a non existing lecture', () => {
  // lecture IS1003 always in time because at end of 2021
  const req = httpMocks.createRequest({params: {id: 'IS1009'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  // ridefinisco la funzione che interagisce con il database
  Lectures.getLectureById.mockImplementation((id) => {
    const filteredLectures = lectures.filter((lecture)=> {
      return id === lecture.lectureId;
    });
    return Promise.resolve(filteredLectures[0]);
  });

  Lectures.deleteLectureById.mockImplementation(() => Promise.resolve({dbResponse: 'OK'}));

  return Controller.apiLecturesIdDELETE(req, res).then(() => {
    const data = res._getJSONData();
    expect.assertions(1);
    expect(data).toEqual({errors: [{'param': 'Server', 'msg': 'lecture not found'}]});
  });
});

test('delete lecture but an error occours in db when search for a lecture', () => {
  // lecture IS1003 always in time because at end of 2021
  const req = httpMocks.createRequest({params: {id: 'IS1004'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  // ridefinisco la funzione che interagisce con il database
  Lectures.getLectureById.mockImplementation((id) => Promise.reject('some type of error'));

  Lectures.deleteLectureById.mockImplementation(() => Promise.resolve({dbResponse: 'OK'}));

  return Controller.apiLecturesIdDELETE(req, res).then(() => {
    const data = res._getJSONData();
    expect.assertions(1);
    expect(data).toEqual({errors: [{'param': 'Server', 'msg': 'some type of error'}]});
  });
});

test('delete a lecture but an error occours in db when deleting it', () => {
  // lecture IS1003 always in time because at end of 2021
  const req = httpMocks.createRequest({params: {id: 'IS1003'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  // ridefinisco la funzione che interagisce con il database
  Lectures.getLectureById.mockImplementation((id) => {
    const filteredLectures = lectures.filter((lecture)=> {
      return id === lecture.lectureId;
    });
    return Promise.resolve(filteredLectures[0]);
  });

  Lectures.deleteLectureById.mockImplementation(() => Promise.reject('Some type of error'));

  return Controller.apiLecturesIdDELETE(req, res).then(() => {
    const data = res._getJSONData();
    expect.assertions(1);
    expect(data).toEqual({errors: [{'param': 'Server', 'msg': 'Some type of error'}]});
  });
});

describe('online a lecture by id', () => {

  const lectures = [
    {
      lectureId: 'IS1006',
      courseId: 'IS001',
      teacherId: 't37001',
      date: '20-11-2020 13:30',
      time: '13:30~14:30',
      mode: 'present',
      room: 'Aula 1',
      maxSeats: 150,
    },
    {
      lectureId: 'IS1007',
      courseId: 'IS002',
      teacherId: 't37002',
      date: '20-11-2020 13:31',
      time: '13:31~14:30',
      mode: 'present',
      room: 'Aula 1',
      maxSeats: 150,
    },
  ];

  let onlineFn;
  let emailFn;

  beforeAll(() => {
    // ridefinisco la funzione che interagisce con il database
  Lectures.getLectureById.mockImplementation((id) => {
    const filteredLectures = lectures.filter((lecture)=> {
      return id === lecture.lectureId;
    });
    return Promise.resolve(filteredLectures[0]);
  });

  onlineFn = Lectures.onlineLectureById.mockImplementation(() => Promise.resolve('OK'));

  emailFn = Email.sendEmailByLectureId.mockImplementation(() => Promise.resolve('OK'));
  })

  beforeEach(() => {
    onlineFn.mockClear();
    emailFn.mockClear();
  })

  test('should return 200 status code', async () => {
    const lectureId = 'IS1007';
    const req = httpMocks.createRequest({params: {id: lectureId}});
    const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});
  
    await Controller.apiOnlineLectureGET(req, res);

    expect(res._getStatusCode()).toEqual(200);
    expect(onlineFn).toBeCalledWith(lectureId);
    expect(emailFn).toHaveBeenCalled();
  });

  test('should error when the lecture is less than 30 minutes away', async () => {
    const req = httpMocks.createRequest({params: {id: 'IS1006'}});
    const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});
  
    await Controller.apiOnlineLectureGET(req, res);
    const data = res._getJSONData();
    
    expect(data).toEqual({'errors': [{'msg': 'not in time', 'param': 'Server'}]});
    expect(onlineFn).not.toHaveBeenCalled();
    expect(emailFn).not.toHaveBeenCalled();
  });
})


