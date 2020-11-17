'use strict';

const db = require("../components/db");


/**
 * Get a filtered list of bookings
 *
 * lectureId String  (optional)
 * returns bookings
 **/
exports.apiBookingsGET = function(lectureId) {
  // Implement function here
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

