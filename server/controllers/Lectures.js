/* eslint-disable max-len */
'use strict';

const moment = require('momentjs');
const utils = require('../utils/writer.js');
const Lectures = require('../service/LecturesService');
const Lecture = require('../components/lecture.js');

module.exports.apiLecturesGET = function apiLecturesGET(req, res) {
  const courseId = req.query.courseId;
  Lectures.getLectures(courseId)
      .then(function(response) {
        utils.writeJson(res, response);
      })
      .catch(function(response) {
        utils.writeJson(res, {errors: [{'param': 'Server', 'msg': response}]}, 500);
      });
};

module.exports.apiLecturesIdDELETE = async function apiLecturesIdDELETE(req, res) {
  const lectureId = req.query.lectureID;

  Lectures.getLectureById(lectureId)
      .then((lecture) => {
        // verify that I'm in time to delete it

        const myTime = lecture.time;
        const values = myTime.split('~');
        let startTime = moment(values[0]);
        // const endTime = values[1];

        startTime = startTime.subtract({hours: '1'});
        const nowTime = moment('h:mm');

        const today = moment('D-M-YYYY');

        if (today.isBefore(moment(lecture.date)) && nowTime.isBefore(startTime)) {
          Lecture.deleteLectureById(lectureId)
              .then((result) => {
                utils.writeJson(res, result);
              })
              .catch((err) => {
                utils.writeJson(res, {errors: [{'param': 'Server', 'msg': err}]}, 500);
              });
        } else {
          utils.writeJson(res, {errors: [{'param': 'Server', 'msg': 'not in time to delete this lecture'}]}, 400);
        }
      })
      .catch( (err) => {
        utils.writeJson(err, {errors: [{'param': 'Server', 'msg': 'lecture not found'}]}, 404);
      });
};
