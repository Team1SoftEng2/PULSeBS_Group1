'use strict';

const db = require('../components/db');
const Lecture = require('../components/lecture');

exports.getLectures = function(courseId) {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM Lecture';
    if (courseId) {
      sql = sql + ' WHERE CourseID = ?';
    }
    db.all(sql, [courseId], (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        const lectures = rows.map((row) => new Lecture(
            row.LectureID,
            row.CourseID,
            row.TeacherID,
            row.Date,
            row.Time,
            row.mode,
            row.place,
            row.maxSeats,
        ));
        resolve(lectures);
      }
    });
  });
};

exports.getLectureById = function(lectureId) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * 
      FROM Lecture 
      WHERE LectureID = ?`;
    db.get(sql, [lectureId], (err, row) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        const lecture = new Lecture(
            row.LectureID,
            row.CourseID,
            row.TeacherID,
            row.Date,
            row.Time,
            row.mode,
            row.place,
            row.maxSeats,
        );
        resolve(lecture);
      }
    });
  });
};

exports.deleteLectureById = function(lectureId) {
  return new Promise((resolve, reject) => {
    const sql = `
      DELETE FROM Lecture
      WHERE LectureID = ?`;
    db.run(sql, [lectureId], (err) => { // IDK if I must add also db.close
      if (err) {
        resolve(err.message);
      } else {
        resolve('Successful');
      }
    });
  });
};

exports.onlineLectureById = function(lectureId) {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE Lecture
      SET mode='online'
      WHERE LectureID = ?`;
    db.run(sql, [lectureId], (err) => { // IDK if I must add also db.close
      if (err) {
        resolve(err.message);
      } else {
        resolve('Successful');
      }
    });
  });
};