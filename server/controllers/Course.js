/* eslint-disable max-len */
'use strict';

const utils = require('../utils/writer.js');
const Course = require('../service/CourseService');
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
