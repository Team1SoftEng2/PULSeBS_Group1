/* eslint-disable max-len */
'use strict';

const db = require('../components/db');
const Booking = require('../components/booking');


exports.getBookings = function(lectureId) {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM Booking';
    if (lectureId) {
      sql = sql + ' WHERE LectureID = ?';
    }
    db.all(sql, [lectureId], (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        const bookings = rows.map((row) => new Booking(row.StudentID, row.LectureID));
        resolve(bookings);
      }
    });
  });
};


/**
 * Book a place for an in-presence lecture
 *
 * body Booking  (optional)
 * no response value expected for this operation
 **/
exports.apiBookingsPOST = function(body) {
  return new Promise((resolve, reject) => {
    // @todo: write SQL query
    const sql = 'INSERT INTO Booking (StudentID, LectureID) VALUES (?, ?)';
    db.run(sql, [body.studentId, body.lectureId],
        (err) => {
          err ? reject(err) : resolve(null);
        });
  });
};

/*
* Delete a booking
* */

exports.apiBookingsDelete = function( body ) {
  return new Promise( ( ( resolve, reject ) => {
    const sql = `DELETE FROM Booking WHERE StudentID = ? AND LectureID = ?;`;
    db.run( sql, [body.studentId, body.lectureId],
        (err) => {
          err ? reject(err) : resolve(null);
        } );
  } ) );
};

// TO BE TESTED ================================================================================

exports.getBookingInWaitingList = function(booking) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM BookingWaitingList 
                WHERE StudentID = ? AND LectureID = ? `;
    db.get(sql, [booking.studentId, booking.lectureId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        if (!row || row.length === 0) {
          resolve(null);
        } else {
          resolve(new Booking(row.StudentID, row.LectureID));
        }
      }
    });
  });
};

exports.getBookingsInWaitingList = function(studentId) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM BookingWaitingList 
                WHERE StudentID = ?`;
    db.all(sql, [studentId], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        if (!rows || rows.length === 0) {
          resolve(null);
        } else {
          const bookings = rows.map((row) => new Booking(row.StudentID, row.LectureID));
          resolve(bookings);
        }
      }
    });
  });
};

exports.bookingWaitingListPOST = function(body) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO BookingWaitingList (StudentID, LectureID) VALUES (?, ?)';
    db.run(sql, [body.studentId, body.lectureId],
        (err) => {
          err ? reject(err) : resolve(null);
        });
  });
};

exports.bookingWaitingListDELETE = function(booking) {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM BookingWaitingList
                 WHERE LectureID = ? AND StudentID = ?`;
    db.run(sql, [booking.lectureId, booking.studentId], (err) => {
      err ? reject(err) : resolve('deleted');
    });
  });
};

exports.getFirstBookingInWaitingList = function(lectureId) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM BookingWaitingList
                WHERE LectureID = ? AND 
                ID IN (
                  SELECT MIN(ID)
                  FROM BookingWaitingList
                  WHERE LectureID = ?
                )`;
    db.get(sql, [lectureId, lectureId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        if (!row || row.length === 0) {
          resolve(null);
        } else {
          resolve(new Booking(row.StudentID, row.LectureID));
        }
      }
    });
  });
};
