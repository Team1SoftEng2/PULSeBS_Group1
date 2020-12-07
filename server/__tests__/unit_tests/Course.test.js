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

test('get a course given a wrong ID', () => {
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
        expect(data).toEqual(
            []);
      });
});

