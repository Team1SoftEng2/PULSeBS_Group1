'use strict';

const User = require('../components/user');
const db = require('../components/db')

exports.getStudentById = function (studentId) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM Student WHERE StudentID = ?";
    db.all(sql, [studentId], (err, rows) => {
        if (err){
          console.log(err);
          reject(err);
        }
        else if (rows.length === 0)
          resolve(undefined);
        else {
          const student = new User(rows[0].StudentID, rows[0].Name, rows[0].Surname, rows[0].emailAddress)
          resolve(student);
        }
    });
  });
}