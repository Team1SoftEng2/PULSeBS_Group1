'use strict';

var utils = require('../utils/writer.js');
var Bookings = require('../service/BookingsService');

module.exports.apiBookingsGET = function apiBookingsGET(req, res) {
  Bookings.apiBookingsGET(req.query.lectureId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiBookingsPOST = function apiBookingsPOST(req, res) {
  Bookings.apiBookingsPOST(req.body)
    .then(function (response) {
        utils.writeJson(res, {'msg': 'Created'}, 201);
    })
    .catch(function (response) {
      if(response === 400)
      utils.writeJson(res, {errors: [{'msg': 'Bad Request' }],}, 400);
      if(response === 401)
      utils.writeJson(res, {errors: [{'msg': 'Unauthorized' }],}, 401);
      if(response === 500)
      utils.writeJson(res, {errors: [{'msg': 'Internal Server Error' }],}, 500);
    });
};
