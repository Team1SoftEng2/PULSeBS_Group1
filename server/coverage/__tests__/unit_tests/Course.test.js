/* eslint-disable max-len */
const httpMocks = require('node-mocks-http');
const CourseService = require('../../service/CourseService');
const CourseController = require('../../controllers/Course');
const Course = require('../../components/course');

jest.mock('../../service/CourseService');

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
