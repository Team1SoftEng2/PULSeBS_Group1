/* eslint-disable max-len */
'use strict';

const to = require('await-to-js').default;
const moment = require('moment');
const utils = require('../utils/writer.js');
const Lectures = require('../service/LecturesService');
const Lecture = require('../components/lecture.js');
const Courses = require('../service/CourseService');
const Email = require('./Email');


module.exports.apiLecturesGET = async function apiLecturesGET(req, res) {
  const courseId = req.query.courseId;
  let err;
  let lectures;
  [err, lectures] = await to(Lectures.getLectures(courseId));
  if (err) return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': err}]}, 500);
  if (!lectures || lectures.length === 0) return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': 'lecture not found'}]}, 404);
  else return utils.writeJson(res, lectures);
};

module.exports.apiTeacherLecturesGET = async function apiTeacherLecturesGET(req, res) {
  // get all courses of teacher by retriving the id via cookies and then get all the lectures of that courses
  const user = req.user && req.user.user;
  let courses;
  let lectures;
  let err;
  // get all courses
  [err, courses] = await to(Courses.getCourseByTeacherID(user));
  if (err) return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': err}]}, 500);
  if (!courses || courses.length === 0) return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': 'courses not found'}]}, 404);
  // get all lectures
  [err, lectures] = await to(Promise.all(courses.map(async (course) => {
    return await Lectures.getLectures(course.courseId);
  })));
  // if an error occours
  if (err) return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': err}]}, 500);
  // if no lecture is retrieved
  if (!lectures || lectures[0].length === 0) return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': 'lectures not found'}]}, 404);
  // if lectures are available
  else return utils.writeJson(res, lectures[0]);
};

module.exports.apiLecturesIdDELETE = async function apiLecturesIdDELETE(req, res) {
  const lectureId = req.params.id;
  let err;
  let lecture;
  let notification;
  // verifies that the lecture actually exists and get the start date
  [err, lecture] = await to(Lectures.getLectureById(lectureId));
  // if an error occours
  if (err) return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': err}]}, 500);
  // if not exists
  if (!lecture) return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': 'lecture not found'}]}, 404);
  // verify that I'm in time to delete it
  const now = moment();
  let startTime = moment(lecture.date, 'DD-MM-YYYY HH:mm');
  startTime = startTime.subtract(1, 'hours');
  // if I'm in time
  if (now.isBefore(startTime)) {
      Email.sendEmailByLectureId(lectureId, {
      subject: 'lecture has deleted',
      text: 'Dear student, your booking for lecture '+lectureId+' has deleted',
      html: 'Dear student, your booking for lecture '+lectureId+' has deleted'
    });
    // delete the lecture
    [err, notification] = await to(Lectures.deleteLectureById(lectureId));
    // if an error occours
    if (err) return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': err}]}, 500);
    // if all goes well
    return utils.writeJson(res, notification);
  } else {
    // if I'm not in time
    return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': 'not in time'}]}, 400);
  }
};

module.exports.apiOnlineLectureGET = async function apiOnlineLectureGET(req, res) {
  const lectureId = req.params.id;
  let err;
  let lecture;
  let notification;
  // verifies that the lecture actually exists and get the start date
  [err, lecture] = await to(Lectures.getLectureById(lectureId));
  // if an error occours
  if (err) return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': err}]}, 500);
  // if not exists
  if (!lecture) return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': 'lecture not found'}]}, 404);
  if (lecture.mode == 'online') return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': 'lecture is already online'}]}, 403);
  // verify that I'm in time to modify its mode
  const now = moment();
  let startTime = moment(lecture.date, 'DD-MM-YYYY HH:mm');
  startTime = startTime.subtract(30, 'minutes');
  // if I'm in time
  if (now.isBefore(startTime)) {
    // change the lecturemode
    [err, notification] = await to(Lectures.onlineLectureById(lectureId));
    // if an error occours
    if (err) return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': err}]}, 500);
    // Notification.NotificationOpenLecture(lectureId);

    await Email.sendEmailByLectureId(lectureId, {
      subject: 'lecturemode have changed',
      text: 'Dear student, your booking for lecture '+lectureId+' present mode changed to online',
      html: 'Dear student, your booking for lecture '+lectureId+' present mode changed to online'
    });

    // if all goes well ,notify everyone lecture mode changed
    return utils.writeJson(res, notification);
  } else {
    // if I'm not in time
    return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': 'not in time'}]}, 400);
  }
};
