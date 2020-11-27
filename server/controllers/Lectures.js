/* eslint-disable max-len */
'use strict';

const moment = require('moment');
const utils = require('../utils/writer.js');
const Lectures = require('../service/LecturesService');
const Lecture = require('../components/lecture.js');
const Courses = require('../service/CourseService');


module.exports.apiLecturesGET = async function apiLecturesGET(req, res) {
  const courseId = req.query.courseId;
  Lectures.getLectures(courseId)
      .then(function(response) {
        utils.writeJson(res, response);
      })
      .catch(function(response) {
        utils.writeJson(res, {errors: [{'param': 'Server', 'msg': response}]}, 500);
      });
};

module.exports.apiTeacherLecturesGET = async function apiTeacherLecturesGET(req, res) {
  // get all courses of teacher by retriving the id via cookies and then get all the lectures of that courses
  const user = req.user && req.user.user;
  const courses = await Courses.getCourseByTeacherID(user);
  const lectures = await Promise.all(courses.map(async (course) => {
    return await Lectures.getLectures(course.courseId);
  }));
  utils.writeJson(res, lectures[0]);
};

module.exports.apiLecturesIdDELETE = async function apiLecturesIdDELETE(req, res) {
  const lectureId = req.params.id;
  Lectures.getLectureById(lectureId)
      .then((lecture) => {
        // verify that I'm in time to delete it
        const now = moment();
        let startTime = moment(lecture.date, 'dd-MM-YYYY HH:mm');
        startTime = startTime.subtract(1, 'hours');
        console.log(startTime);
        console.log(now.isBefore(startTime));

        if (now.isBefore(startTime)) {
          Lectures.deleteLectureById(lectureId)
              .then((result) => utils.writeJson(res, 'OK'))
              .catch((err) => utils.writeJson(res, {errors: [{'param': 'Server', 'msg': 'Internal Server Error'}]}, 500));
        } else {
          utils.writeJson(res, {errors: [{'param': 'Server', 'msg': 'not in time'}]}, 400);
        }
      })
      .catch( (err) => {
        utils.writeJson(err, {errors: [{'param': 'Server', 'msg': 'lecture not found'}]}, 404);
      });
};
