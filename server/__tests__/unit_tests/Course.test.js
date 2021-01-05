/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable max-len */
const to = require('await-to-js').default;
const httpMocks = require('node-mocks-http');
const CourseService = require('../../service/CourseService');
const CourseController = require('../../controllers/Course');
const Course = require('../../components/course');

const Lectures = require('../../service/LecturesService');
const Bookings = require('../../service/BookingsService');

jest.mock('../../service/LecturesService');
jest.mock('../../service/CourseService');
jest.mock('../../service/BookingsService');

const courses = [
  {
    courseId: 'IS001',
    teacherId: 't37001',
    name: 'Information System',
  },
  {
    courseId: 'SE001',
    teacherId: 't37002',
    name: 'Software Engineering',
  },
  {
    courseId: 'CA001',
    teacherId: 't37003',
    name: 'Computer Architectures',
  },
];

const bookings = [
  {studentId: 's27002', lectureId: 'IS1004'},
  {studentId: 's27001', lectureId: 'IS1005'},
  {studentId: 's27001', lectureId: 'IS1004'},
  {studentId: 's27001', lectureId: 'CA3001'},
];

const students = [
  {
    userId: 's27001',
    name: 'Mario',
    surname: 'Rossi',
    email: 'nonsochemettere@pollo.it',
  },
  {
    userId: 's27002',
    name: 'Maria',
    surname: 'Rossa',
    email: 'nonsochemettere@pollo.it',
  },
  {
    userId: 's27003',
    name: 'Marie',
    surname: 'Rosse',
    email: 'nonsochemettere@pollo.it',
  },
];

const courseAttendances = [
  {
    StudentId: 's27001',
    CourseId: 'IS001',
  },
  {
    StudentId: 's27001',
    CourseId: 'CA001',
  },
  {
    StudentId: 's27002',
    CourseId: 'CA001',
  },
];

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
/* =======================================================================================
                              TESTS FOR apiCoursesIdGET
=========================================================================================*/

test('get a course given his ID', () => {
  const req = httpMocks.createRequest({params: {id: 'IS001'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});
  CourseService.getCourseById.mockImplementation((courseId) =>{
    const result = courses.filter((course) => course.courseId === courseId);
    return Promise.resolve(result);
  });
  return CourseController.apiCoursesIdGET(req, res)
      .then(() => {
        const data = res._getJSONData();
        expect.assertions(1);
        expect(data).toEqual(
            [{
              courseId: 'IS001',
              teacherId: 't37001',
              name: 'Information System',
            },
            ]);
      });
});

test('get a course given a non existing ID', () => {
  const req = httpMocks.createRequest({params: {id: 'IS002'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});
  CourseService.getCourseById.mockImplementation((courseId) =>{
    const result = courses.filter((course) => course.courseId === courseId);
    return Promise.resolve(result);
  });
  return CourseController.apiCoursesIdGET(req, res)
      .then(() => {
        const data = res._getJSONData();
        expect.assertions(1);
        expect(data).toEqual({errors: [{'param': 'Server', 'msg': 'course not found'}]});
      });
});

test('get a course given an ID but an error in the service occours', () => {
  const req = httpMocks.createRequest({params: {id: 'IS002'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});
  CourseService.getCourseById.mockImplementation((courseId) =>{
    return Promise.reject('error message');
  });
  return CourseController.apiCoursesIdGET(req, res)
      .then(() => {
        const data = res._getJSONData();
        expect.assertions(1);
        expect(data).toEqual(
            {errors: [{'param': 'Server', 'msg': 'error message'}]});
      });
});

/* =======================================================================================
                              TESTS FOR apiStudentsIdCoursesGET
=========================================================================================*/
test('get courses given student ID', () => {
  const req = httpMocks.createRequest({params: {id: 's27001'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  CourseService.getStudentCourses.mockImplementation((studentId) => {
    const filteredAttendances = courseAttendances.filter((courseAttendance) => courseAttendance.StudentId === studentId);
    const coursesIds = filteredAttendances.map((courseAttendance) => courseAttendance.CourseId);
    const result = courses.filter((course) => coursesIds.includes(course.courseId));
    return Promise.resolve(result);
  });

  return CourseController.apiStudentsIdCoursesGET(req, res)
      .then(() => {
        const data = res._getJSONData();
        expect.assertions(1);
        expect(data).toEqual([
          {
            courseId: 'IS001',
            teacherId: 't37001',
            name: 'Information System',
          },
          {
            courseId: 'CA001',
            teacherId: 't37003',
            name: 'Computer Architectures',
          },
        ]);
      });
});

test('get courses given wrong student ID', () => {
  const req = httpMocks.createRequest({params: {id: 's27005'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  CourseService.getStudentCourses.mockImplementation((studentId) => {
    const filteredAttendances = courseAttendances.filter((courseAttendance) => courseAttendance.StudentId === studentId);
    const coursesIds = filteredAttendances.map((courseAttendance) => courseAttendance.CourseId);
    const result = courses.filter((course) => coursesIds.includes(course.courseId));
    return Promise.resolve(result);
  });

  return CourseController.apiStudentsIdCoursesGET(req, res)
      .then(() => {
        const data = res._getJSONData();
        expect.assertions(1);
        expect(data).toEqual({errors: [{'param': 'Server', 'msg': 'course not found'}]});
      });
});

test('get courses given student ID but simulate db error', () => {
  const req = httpMocks.createRequest({params: {id: 's27005'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  CourseService.getStudentCourses.mockImplementation((studentId) => {
    return Promise.reject('db problem');
  });

  return CourseController.apiStudentsIdCoursesGET(req, res)
      .then(() => {
        const data = res._getJSONData();
        expect.assertions(1);
        expect(data).toEqual({errors: [{'param': 'Server', 'msg': 'db problem'}]});
      });
});

/* ============================================================================================
                                  TESTS of apiCourseLecturesWithBookingsGET
=============================================================================================*/
test('get lectures with bookings number given CourseID', () => {
  // lecture IS1003 always in time because at end of 2021
  const req = httpMocks.createRequest({params: {courseId: 'IS001'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  Lectures.getLectures.mockImplementation((courseId) => {
    const filteredLectures = lectures.filter((lecture) => lecture.courseId === courseId);
    return Promise.resolve(filteredLectures);
  });
  Bookings.getBookings.mockImplementation( (lectureId) => {
    const filteredBookings = bookings.filter((booking) => booking.lectureId === lectureId);
    return Promise.resolve(filteredBookings);
  });
  
  return CourseController.apiCourseLecturesWithBookingsGET(req, res).then(() => {
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
        bookingsNumber: 0,
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
        bookingsNumber: 2,
      },
    ]);
  });
});

test('get lectures with bookings number given CourseID but an error in geLectures occours', () => {
  // lecture IS1003 always in time because at end of 2021
  const req = httpMocks.createRequest({params: {courseId: 'IS001'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  Lectures.getLectures.mockImplementation((courseId) => {
    return Promise.reject('some type of error');
  });
  Bookings.getBookings.mockImplementation( (lectureId) => {
    const filteredBookings = bookings.filter((booking) => booking.lectureId === lectureId);
    return Promise.resolve(filteredBookings);
  });
  
  return CourseController.apiCourseLecturesWithBookingsGET(req, res).then(() => {
    const data = res._getJSONData();
    expect.assertions(1);
    expect(data).toEqual({errors: [{'msg': 'some type of error'}]});
  });
});

test('get lectures with bookings number given and CourseID but no lectures are found', () => {
  // lecture IS1003 always in time because at end of 2021
  const req = httpMocks.createRequest({params: {courseId: 'IS008'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  Lectures.getLectures.mockImplementation((courseId) => {
    const filteredLectures = lectures.filter((lecture) => lecture.courseId === courseId);
    return Promise.resolve(filteredLectures);
  });
  Bookings.getBookings.mockImplementation( (lectureId) => {
    const filteredBookings = bookings.filter((booking) => booking.lectureId === lectureId);
    return Promise.resolve(filteredBookings);
  });
  
  return CourseController.apiCourseLecturesWithBookingsGET(req, res).then(() => {
    const data = res._getJSONData();
    expect.assertions(1);
    expect(data).toEqual({errors: [{'msg': 'lectures not found for this course'}]});
  });
});

test('get lectures with bookings number given CourseID but an error occours in getBookings', () => {
  // lecture IS1003 always in time because at end of 2021
  const req = httpMocks.createRequest({params: {courseId: 'IS001'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  Lectures.getLectures.mockImplementation((courseId) => {
    const filteredLectures = lectures.filter((lecture) => lecture.courseId === courseId);
    return Promise.resolve(filteredLectures);
  });
  Bookings.getBookings.mockImplementation( (lectureId) => {
    return Promise.reject('some type of error');
  });
  
  return CourseController.apiCourseLecturesWithBookingsGET(req, res).then(() => {
    const data = res._getJSONData();
    expect.assertions(1);
    expect(data).toEqual({errors: [{'msg': 'some type of error'}]});
  });
});

/* ============================================================================================
                                  TESTS of apiTeacherCoursesGET
=============================================================================================*/
test('get courses by teacherID', () => {
  // lecture IS1003 always in time because at end of 2021
  const req = httpMocks.createRequest({user: {user: 't37001'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  CourseService.getCourseByTeacherID.mockImplementation((teacherId) => {
    const filteredCourses = courses.filter((course) => course.teacherId === teacherId);
    return Promise.resolve(filteredCourses);
  });
  
  return CourseController.apiTeacherCoursesGET(req, res).then(() => {
    const data = res._getJSONData();
    expect.assertions(1);
    expect(data).toEqual([
      {
        courseId: 'IS001',
        teacherId: 't37001',
        name: 'Information System',
      },
    ]);
  });
});

test('get courses by teacherID but an error occours in getCourseByTeacherID', () => {
  // lecture IS1003 always in time because at end of 2021
  const req = httpMocks.createRequest({user: {user: 't37001'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  CourseService.getCourseByTeacherID.mockImplementation((teacherId) => {
    return Promise.reject('some type of error');
  });
  
  return CourseController.apiTeacherCoursesGET(req, res).then(() => {
    const data = res._getJSONData();
    expect.assertions(1);
    expect(data).toEqual({errors: [{'param': 'Server', 'msg': 'some type of error'}]});
  });
});

test('get courses by teacherID but no course is found', () => {
  // lecture IS1003 always in time because at end of 2021
  const req = httpMocks.createRequest({user: {user: 't37008'}});
  const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

  CourseService.getCourseByTeacherID.mockImplementation((teacherId) => {
    const filteredCourses = courses.filter((course) => course.teacherId === teacherId);
    return Promise.resolve(filteredCourses);
  });
  
  return CourseController.apiTeacherCoursesGET(req, res).then(() => {
    const data = res._getJSONData();
    expect.assertions(1);
    expect(data).toEqual({errors: [{'param': 'Server', 'msg': 'courses not present for this professor'}]});
  });
});
