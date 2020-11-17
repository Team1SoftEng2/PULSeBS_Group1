'use strict';

var utils = require('../utils/writer.js');
var Student = require('../service/StudentService');

module.exports.apiStudentsIdGET = function apiStudentsIdGET (req, res) {
  const studentId = req.params.id;
  Student.getStudentById(studentId)
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
