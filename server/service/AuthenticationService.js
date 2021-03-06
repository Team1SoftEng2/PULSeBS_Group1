'use strict';

const User = require('../components/user');
const db = require('../components/db');
const bcrypt = require('bcrypt');

exports.getUserById = function(id) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT StudentId as ID, Name, Surname, emailAddress, password
                 FROM Student
                 WHERE ID = ?
                 UNION
                 SELECT TeacherID as ID, Name, Surname, emailAddress, password
                 FROM Teacher
                 WHERE ID = ?
                 UNION
                 SELECT BookingManagerID as ID, Name, Surname, emailAddress, password
                 FROM BookingManager
                 WHERE ID = ?
                 UNION
                 SELECT SupportOperatorID as ID, Name, Surname, emailAddress, password
                 FROM SupportOperator
                 WHERE ID = ?`;

    db.all(sql, [id, id, id, id], (err, row) => {
      if (err) {
        reject(err);
      } else if (row.length === 0 || row.length >1) {
        resolve(undefined);
      } else {
        const user = new User(row[0].ID, row[0].Name, row[0].Surname, row[0].emailAddress, row[0].password);
        resolve(user);
      }
    });
  });
};

exports.checkPassword = function(user, password) {
  console.log('hash of: ' + password);
  const hash = bcrypt.hashSync(password, 10);
  console.log(hash);
  console.log('DONE');
  return bcrypt.compareSync(password, user.hash);
};

module.exports.addStudent = function(student) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO Student (StudentID, Name, Surname, emailAddress, password) VALUES (?, ?, ?, ?, ?)';
    db.run(sql, [student.userId, student.name, student.surname, student.email, '$2b$10$q10dHb3rJZEJ09maxOKloe268lB9zoU239J3MlS8PiWF.x5DbCsWq'],
        (err) => { err ? reject(err) : resolve(null); });
  });
}

module.exports.addTeacher = function(teacher) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO Teacher (TeacherID, Name, Surname, emailAddress, password) VALUES (?, ?, ?, ?, ?)';
    db.run(sql, [teacher.userId, teacher.name, teacher.surname, teacher.email, '$2b$10$q10dHb3rJZEJ09maxOKloe268lB9zoU239J3MlS8PiWF.x5DbCsWq'],
        (err) => { err ? reject(err) : resolve(null); });
  });
}