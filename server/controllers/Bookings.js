/* eslint-disable max-len */
'use strict';

const to = require('await-to-js').default;
const utils = require('../utils/writer.js');
const Bookings = require('../service/BookingsService');
const Lectures = require('../service/LecturesService');
const Courses = require('../service/CourseService');
const Email = require('./Email');
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
      else {
        // send email to the student
        let course;
        [err, course] = await to(Courses.getCourseById(lecture.courseId));
        if (err) return utils.writeJson(res, {errors: [{'msg': err}]}, 500);
        
        const message = {
          subject: 'Booking confirmation',
          text: 'Dear student, your booking for' + course.name + 'lecture of ' + lecture.date  + ' is confirmed',
          html: '',
        };
        [err, notification] = await to(Email.sendEmailByUserId(req.body.studentId, message));
        if (err) console.log(err);
        return utils.writeJson(res, {'msg': 'Created'}, 201);
      }
    }
  }
};

// TO BE TESTED ================================================================================

// booking delete
module.exports.apiBookingsDelete = async function apiBookingsDelete(req, res) {
  let err;
  let booking;
  [err] = await to(Bookings.apiBookingsDelete(req.body));
  if (err) return utils.writeJson(res, {errors: [{'msg': err}]}, 502);
  [err, booking] = await to(Bookings.getFirstBookingInWaitingList(req.body.lectureId));
  if (!booking || booking.length !== 0) {
    // add booking to bookings and then remove it from waitinglist
    [err] = await to(Bookings.apiBookingsPOST(booking));
    if (!err) Bookings.bookingWaitingListDELETE(booking);
  }
  return utils.writeJson(res, {'msg': 'Deleted'}, 202);
};

module.exports.apiBookingToWaitingListPOST = async function apiBookingToWaitingListPOST(req, res) {
  let err;
  let notification;
  [err, notification] = await to(Bookings.getBookingInWaitingList(req.body));
  if (err) return utils.writeJson(res, {errors: [{'msg': err}]}, 502);
  if (!notification || notification.length === 0 ) {
    [err, notification] = await to(Bookings.bookingWaitingListPOST(req.body));

    if (err) return utils.writeJson(res, {errors: [{'msg': err}]}, 502);
    return utils.writeJson(res, {'msg': 'Added to waiting List'}, 201);
  } else {
    return utils.writeJson(res, {errors: [{'msg': 'already in waiting list for that lecture'}]}, 502);
  }
};

module.exports.apiBookingsWaitingListGET = async function apiBookingsWaitingListGET(req, res) {
  const studentId = req.user && req.user.user;
  let err;
  let results;
  [err, results] = await to(Bookings.getBookingsInWaitingList(studentId));
  if (err) return utils.writeJson(res, {errors: [{'msg': err}]}, 502);
  if (!results || results.length === 0) return utils.writeJson(res, {errors: [{'msg': 'empty waiting list'}]}, 404);
  return utils.writeJson(res, results);
};
