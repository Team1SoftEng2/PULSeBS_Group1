/* eslint-disable max-len */
'use strict';

const utils = require('../utils/writer.js');
const Course = require('../service/CourseService');
const Lectures = require('../service/LecturesService');
const Bookings = require('../service/BookingsService');

const to = require('await-to-js').default;

module.exports.apiCoursesIdGET = async function apiCoursesIdGET(req, res) {
  const courseId = req.params.id;
  let err;
  let course;
  [err, course] = await to(Course.getCourseById(courseId));
  if (err) {
    return utils.writeJson(res, {
      errors: [{'param': 'Server', 'msg': err}]}, 500);
  }
  if (!course || course.length === 0) return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': 'course not found'}]}, 404);
  else return utils.writeJson(res, course);
};

module.exports.apiStudentsIdCoursesGET = async function(req, res) {
  const studentId = req.params.id;
  let err;
  let courses;
  [err, courses] = await to(Course.getStudentCourses(studentId));
  if (err) {
    return utils.writeJson(res, {
      errors: [{'param': 'Server', 'msg': err}]}, 500);
  }
  if (!courses || courses.length === 0) return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': 'course not found'}]}, 404);
  else return utils.writeJson(res, courses);
};

// to be tested ===============================================================================================================================================

module.exports.apiTeacherCoursesGET = async function(req, res) {
  const teacherId = req.user && req.user.user;
  let err;
  let courses;
  [err, courses] = await to(Course.getCourseByTeacherID(teacherId));
  if (err) return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': err}]}, 500);
  if (!courses || courses.length === 0) return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': 'courses not present for this professor'}]}, 404);
  return utils.writeJson(res, courses);
};

module.exports.apiCourseLecturesWithBookingsGET = async function(req, res) {
  const courseId = req.params.courseId;
  let err;
  let lectures;
  let bookings;
  let lectureWithBookingsNumber;
  [err, lectures] = await to(Lectures.getLectures(courseId));
  if (err) return utils.writeJson(res, {errors: [{'msg': err}]}, 500);
  if (!lectures || lectures.length === 0) return utils.writeJson(res, {errors: [{'msg': 'lectures not found for this course'}]}, 404);
  [err, lectureWithBookingsNumber] = await to(
      Promise.all(lectures.map(async (lecture) => {
        [err, bookings] = await to(Bookings.getBookings(lecture.lectureId));
        if (err) return Promise.reject(err);
        return Promise.resolve({...lecture, bookingsNumber: bookings.length});
      })));
  if (err) return utils.writeJson(res, {errors: [{'msg': err}]}, 500);
  return utils.writeJson(res, lectureWithBookingsNumber);
};
