'use strict';

var utils = require('../utils/writer.js');
var Course = require('../service/CourseService');

module.exports.apiCoursesIdGET = function apiCoursesIdGET (req, res) {
  const courseId = req.params.id;
  Course.getCourseById(courseId)
    .then(function(response) {
      if (!response) {
          utils.writeJson(res, response, 404);
      } else {
          utils.writeJson(res, response);
      }
  })
  .catch(function(response) {
      utils.writeJson(res, { errors: [{ 'param': 'Server', 'msg': response }], }, 500);
  });
};

module.exports.apiStudentsIdCourses = function (req, res) {
  const studentId = req.params.id;
  Course.getStudentCourses(studentId)
    .then(function(response) {
      utils.writeJson(res, response);      
    })
    .catch(function(response) {
      utils.writeJson(res, { errors: [{ 'param': 'Server', 'msg': response }], }, 500);
    });
}
