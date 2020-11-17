'use strict';

const db = require("../components/db");
const Booking = require("../components/booking");


exports.getBookings = function(lectureId) {
  return new Promise((resolve, reject) => {
    var sql = "SELECT * FROM Booking";
    if(lectureId)
      sql = sql + " WHERE LectureID = ?";
    db.all(sql, [lectureId], (err, rows) => {
        if (err){
          console.log(err);
          reject(err);
        }
        else {
          const bookings = rows.map((row) => new Booking(row.StudentID, row.LectureID));
          resolve(bookings);
        }
    });
  });
}


/**
 * Book a place for an in-presence lecture
 *
 * body Booking  (optional)
 * no response value expected for this operation
 **/
exports.apiBookingsPOST = function(body) {
  return new Promise((resolve, reject) => {
    // @todo: write SQL query 
    const sql = "";
    db.run(sql, [body.studenId, body.lectureId],
      (err) => {err ? reject(err) : resolve(201)});
  });
}

