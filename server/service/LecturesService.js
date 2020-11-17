'use strict';

const db = require("../components/db");
const Lecture = require("../components/lecture");

exports.getLectures = function(courseId) {
  return new Promise((resolve, reject) => {
    var sql = "SELECT * FROM Lecture";
    if(courseId)
      sql = sql + " WHERE CourseID = ?";
    db.all(sql, [courseId], (err, rows) => {
        if (err){
          console.log(err);
          reject(err);
        }
        else {
          const lectures = rows.map((row) => new Lecture(row.LectureID, row.CourseID, row.TeacherID, row.Date, row.Time, row.mode, row.place, row.maxSeats));
          resolve(lectures);
        }
    });
  });
}