'use strict';

var utils = require('../utils/writer.js');
var Course = require('../service/CourseService');

module.exports.apiCoursesIdGET = function apiCoursesIdGET (req, res) {
  Course.apiCoursesIdGET(req.params.id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
