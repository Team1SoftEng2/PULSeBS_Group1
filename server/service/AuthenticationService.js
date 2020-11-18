'use strict';

const User = require('../components/user');
const db = require('../components/db');
const bcrypt = require('bcrypt');

exports.getUserByEmail = function (email) {
  return new Promise((resolve, reject) => {
    
    const sql = `SELECT StudentId as ID, Name, Surname, emailAddress, password
                 FROM Student
                 UNION
                 SELECT TeacherID as ID, Name, Surname, emailAddress, password
                 FROM Teacher
                 UNION
                 SELECT BookingManagerID as ID, Name, Surname, emailAddress, password
                 FROM BookingManager
                 SELECT SupportOperatorID as ID, Name, Surname, emailAddress, password
                 FROM SupportOperator
                 WHERE email = ?`;

    db.all(sql, [email], (err, rows) => {
        if (err) 
            reject(err);
        else if (rows.length === 0)
            resolve(undefined);
        else{
            const user = new User(row.id, row.name, row.surname, row.email, row.hash);
            resolve(user);
        }
    });
  });
};

exports.checkPassword = function (user, password) {
  console.log("hash of: " + password);
  let hash = bcrypt.hashSync(password, 10);
  console.log(hash);
  console.log("DONE");
  return bcrypt.compareSync(password, user.hash);
};
