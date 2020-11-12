'use strict';

var utils = require('../utils/writer.js');
var Operations = require('../service/OperationsService');

module.exports.apiLoginPOST = function apiLoginPOST (req, res) {
  Operations.apiLoginPOST(req.body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiLogoutPOST = function apiLogoutPOST (req, res) {
  Operations.apiLogoutPOST()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
