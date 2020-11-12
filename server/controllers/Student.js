'use strict';

var utils = require('../utils/writer.js');
var Student = require('../service/StudentService');

module.exports.apiStudentsIdGET = function apiStudentsIdGET (req, res) {
  Student.apiStudentsIdGET(req.params.id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
