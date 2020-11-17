'use strict';

const Course = require('../components/course');
const db = require('../components/db')

exports.getCourseById = function (courseId) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM Course WHERE CourseID = ?";
    db.all(sql, [courseId], (err, rows) => {
        if (err){
          console.log(err);
          reject(err);
        }
        else if (rows.length === 0)
          resolve(undefined);
        else {
          const course = new Course(rows[0].CourseID, rows[0].TeacherID, rows[0].courseName)
          resolve(course);
        }
    });
  });
}