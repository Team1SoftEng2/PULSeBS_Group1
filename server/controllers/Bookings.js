'use strict';

var utils = require('../utils/writer.js');
var Bookings = require('../service/BookingsService');

module.exports.apiBookingsGET = function apiBookingsGET (req, res) {
  Bookings.apiBookingsGET(req.query.lectureId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiBookingsPOST = function apiBookingsPOST (req, res) {
  Bookings.apiBookingsPOST(req.body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
