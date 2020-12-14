/* eslint-disable max-len */
'use strict';

const to = require('await-to-js').default;
const utils = require('../utils/writer.js');
const Bookings = require('../service/BookingsService');
const Lectures = require('../service/LecturesService');
const moment = require('moment');

module.exports.apiBookingsGET = async function apiBookingsGET(req, res) {
  const lectureId = req.query.lectureId;
  let err;
  let bookings;
  [err, bookings] = await to(Bookings.getBookings(lectureId));
  if (err) return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': err}]}, 500);
  if (!bookings || bookings.length === 0) return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': 'bookings not found'}]}, 404);
  else return utils.writeJson(res, bookings);
};

module.exports.apiBookingsPOST = async function apiBookingsPOST(req, res) {
  const lectureId = req.body.lectureId;
  let err;
  let lecture;
  let notification;
  [err, lecture] = await to(Lectures.getLectureById(lectureId));
  if (err) return utils.writeJson(res, {errors: [{'msg': err}]}, 500);
  if (!lecture || lecture.length === 0) return utils.writeJson(res, {errors: [{'msg': 'lecture not found'}]}, 404);
  else {
    const deadline = moment(lecture.date, 'DD-MM-YYYY hh:mm:ss').subtract(1, 'hours');
    if (moment().isAfter(deadline)) {
      return utils.writeJson(res, {'msg': 'Unprocessable Entity'}, 422);
    } else {
      [err, notification] = await to(Bookings.apiBookingsPOST(req.body));
      if (err) return utils.writeJson(res, {errors: [{'msg': err}]}, 500);
      else return utils.writeJson(res, {'msg': 'Created'}, 201);
    }
  }
};
// booking delete
module.exports.apiBookingsDelete = async function apiBookingsDelete(req, res) {
  let err;
  let notification;
  [err, notification] = await to(Bookings.apiBookingsDelete(req.body));
  if (err) return utils.writeJson(res, {errors: [{'msg': err}]}, 502);
  else return utils.writeJson(res, {'msg': 'Delete'}, 202);
};
