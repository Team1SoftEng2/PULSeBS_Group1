'use strict';

var utils = require('../utils/writer.js');
var Bookings = require('../service/BookingsService');

module.exports.apiBookingsGET = function apiBookingsGET(req, res) {
  const lectureId = req.query.lectureId;
  Bookings.getBookings(lectureId)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, { errors: [{ 'param': 'Server', 'msg': response }], }, 500);
    });
};

module.exports.apiBookingsPOST = function apiBookingsPOST(req, res) {
  Bookings.apiBookingsPOST(req.body)
    .then(function (response) {
        utils.writeJson(res, {'msg': 'Created'}, 201);
    })
    .catch(function (response) {
        utils.writeJson(res, {errors: [{'msg': 'Internal Server Error' }],}, 500);
    });
};
