/* eslint-disable max-len */
'use strict';

const path = require('path');
const http = require('http');
const cookieParser = require('cookie-parser');
const jwt = require('express-jwt');
const fs = require('fs');
const {Validator, ValidationError} = require('express-json-validator-middleware');
const multer = require('multer');

const oas3Tools = require('oas3-tools');
const serverPort = 8080;

// importing controllers
const bookingsController = require(path.join(__dirname, 'controllers/Bookings'));
const courseController = require(path.join(__dirname, 'controllers/Course'));
const lecturesController = require(path.join(__dirname, 'controllers/Lectures'));
const authController = require(path.join(__dirname, 'controllers/Authentication'));
const parserController = require(path.join(__dirname, 'controllers/Parser'));

// swaggerRouter configuration
const options = {
  controllers: path.join(__dirname, './controllers'),
};

const expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
expressAppConfig.addValidator();
const app = expressAppConfig.getApp();

// Set validator middleware
var userSchema = JSON.parse(fs.readFileSync(path.join('.', 'json_schemas', 'user_schema.json')).toString());
var courseSchema = JSON.parse(fs.readFileSync(path.join('.', 'json_schemas', 'course_schema.json')).toString());
var lectureSchema = JSON.parse(fs.readFileSync(path.join('.', 'json_schemas', 'lecture_schema.json')).toString());
var bookingSchema = JSON.parse(fs.readFileSync(path.join('.', 'json_schemas', 'booking_schema.json')).toString());
var validator = new Validator({ allErrors: true });
validator.ajv.addSchema([userSchema, courseSchema, lectureSchema, bookingSchema]);
var validate = validator.validate;

// Set lectures timers
setInterval( () => {
  lecturesController.deadlineNotification();
}, 300000);

// Set multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upoloadCSV = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if(file.mimetype.includes('csv'))
      cb(null, true);
    else
      cb('Allowed only CSV files', false);
  }
}).single('file');

// Set authentication features
const jwtSecret = '6xvL4xkAAbG49hcXf5GIYSvkDICiUAR6EdR5dLdwW7hMzUjjMUe9t6M5kSAYxsvX';
const authErrorObj = {errors: [{'param': 'Server', 'msg': 'Authorization error'}]};
app.use(cookieParser());

// Public APIs here
app.post('/api/login', authController.apiLoginPOST);
app.post('/api/students/upload', upoloadCSV, parserController.parseStudentCSV);

// Authentication endpoint
app.use(
    jwt({
      secret: jwtSecret,
      algorithms: ['HS256'],
      getToken: (req) => req.cookies.token,
    }),
);

// Authenticated APIs here
app.post('/api/logout', authController.apiLogoutPOST);
app.get('/api/courses/:id', courseController.apiCoursesIdGET);
app.delete('/api/lectures/:id', lecturesController.apiLecturesIdDELETE);
app.post('/api/lectures/:id', lecturesController.apiOnlineLectureGET);
app.get('/api/lectures', lecturesController.apiLecturesGET);
app.get('/api/students/:id/courses', courseController.apiStudentsIdCoursesGET);
app.get('/api/teachers/lectures', lecturesController.apiTeacherLecturesGET);
app.get('/api/bookings', bookingsController.apiBookingsGET);
app.get('/api/users/:id', authController.apiUserGET);
app.post('/api/bookings', validate({body: bookingSchema}), bookingsController.apiBookingsPOST);
app.post('/api/bookings/waitingLists', validate({body: bookingSchema}), bookingsController.apiBookingToWaitingListPOST);
app.get('/api/bookings/waitingLists', bookingsController.apiBookingsWaitingListGET);
app.delete('/api/bookings', bookingsController.apiBookingsDelete);

// Error handlers for validation and authentication errors
app.use(function(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(400).send(err);
  } else next(err);
});

app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json(authErrorObj);
  } else next(err);
});

// parserController.readCSV('./controllers/Students.csv');

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function() {
  console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
  console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});
