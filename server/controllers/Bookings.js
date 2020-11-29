'use strict';

var utils = require('../utils/writer.js');
var Bookings = require('../service/BookingsService');
var Lectures = require('../service/LecturesService')
var moment = require('moment');

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
  Lectures.getLectureById(req.body.lectureId)
    .then( (response) => {
      // console.log(response);
      // const timeString = response.date + " " + response.time.split('~')[0] + ":00"; 
      // console.log(timeString);
      // let deadline = moment(timeString, "DD-MM-YYYY hh:mm:ss");
      // console.log(deadline);
      const deadline = moment(response.date, "DD-MM-YYYY hh:mm:ss").subtract(1, 'hours');
      if(moment().isAfter(deadline))
        utils.writeJson(res, {'msg': 'Unprocessable Entity'}, 422);
      else 
        Bookings.apiBookingsPOST(req.body)
          .then(function () {
            utils.writeJson(res, {'msg': 'Created'}, 201);
          })
          .catch(function () {
              utils.writeJson(res, {errors: [{'msg': 'Internal Server Error' }],}, 500);
          });
    })
    .catch( (response) => utils.writeJson(res, {errors: [{'msg': 'Not Found' }],}, 404));

  
};
//booking delete
module.exports.apiBookingsDelete = function apiBookingsDelete(req, res) {
  Bookings.apiBookingsDelete(req.body)
  .then(function (response) {
    utils.writeJson(res, {'msg': 'Delete'}, 202);
    
  })
  .catch(function (response) {
    utils.writeJson(res, {errors: [{'msg': 'Delete Internal Server Error' }],}, 502);
  });
};