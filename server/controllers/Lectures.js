'use strict';

var utils = require('../utils/writer.js');
var Lectures = require('../service/LecturesService');

module.exports.apiLecturesGET = function apiLecturesGET (req, res) {
  Lectures.apiLecturesGET(req.query.courseId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
