/* eslint-disable max-len */
'use strict';

const Course = require('../components/course');
const db = require('../components/db');

exports.getCourseById = function(courseId) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Course WHERE CourseID = ?';
    db.all(sql, [courseId], (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else if (rows.length === 0) {
        resolve(undefined);
      } else {
        const course = new Course(
            rows[0].CourseID,
            rows[0].TeacherID,
            rows[0].courseName);
        resolve(course);
      }
    });
  });
};

exports.getStudentCourses = function(studentId) {
  return new Promise((resolve, reject) => {
    const sql = ' SELECT * FROM Course C, CourseAttendance CA WHERE StudentID = ? AND C.CourseID = CA.CourseID';
    db.all(sql, [studentId], (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        const courses = rows.map((row) => new Course(row.CourseID, row.TeacherID, row.courseName));
        resolve(courses);
      }
    });
  });
};

exports.getCourseByTeacherID = function(teacherId) {
  return new Promise((resolve, reject) => {
    const sql = ` SELECT * FROM Course
                  WHERE TeacherID = ?`;
    db.all(sql, [teacherId], (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        const courses = rows.map((row) => new Course(row.CourseID, row.TeacherID, row.courseName));
        resolve(courses);
      }
    });
  });
};

module.exports.addCourse = function(course) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO Course (CourseID, TeacherID, courseName) VALUES (?, ?, ?)';
    db.run(sql, [course.courseId, course.teacherId, course.name],
        (err) => { err ? reject(err) : resolve(null); });
  });
};

module.exports.addCourseAttendance = function(courseId, studentId) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO CourseAttendance (StudentID, CourseID) VALUES (?, ?)';
    db.run(sql, [studentId, courseId],
        (err) => { err ? reject(err) : resolve(null); });
  });
};