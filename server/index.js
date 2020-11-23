/* eslint-disable max-len */
'use strict';

const path = require('path');
const http = require('http');
const cookieParser = require('cookie-parser');
const jwt = require('express-jwt');
const fs = require('fs');
const {Validator, ValidationError} = require('express-json-validator-middleware');

const oas3Tools = require('oas3-tools');
const serverPort = 8080;

// importing controllers
const bookingsController = require(path.join(__dirname, 'controllers/Bookings'));
const courseController = require(path.join(__dirname, 'controllers/Course'));
const lecturesController = require(path.join(__dirname, 'controllers/Lectures'));
const authController = require(path.join(__dirname, 'controllers/Authentication'));
const studentController = require(path.join(__dirname, 'controllers/Student'));

// swaggerRouter configuration
const options = {
  controllers: path.join(__dirname, './controllers'),
};

const expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
expressAppConfig.addValidator();
const app = expressAppConfig.getApp();

// Set validator middleware
// var taskSchema = JSON.parse(fs.readFileSync(path.join('.', 'json_schemas', 'task_schema.json')).toString());
// var userSchema = JSON.parse(fs.readFileSync(path.join('.', 'json_schemas', 'user_schema.json')).toString());
// var validator = new Validator({ allErrors: true });
// validator.ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-07.json'));
// validator.ajv.addSchema([userSchema, taskSchema]);
// var validate = validator.validate;


// Set authentication features
const jwtSecret = '6xvL4xkAAbG49hcXf5GIYSvkDICiUAR6EdR5dLdwW7hMzUjjMUe9t6M5kSAYxsvX';
const authErrorObj = {errors: [{'param': 'Server', 'msg': 'Authorization error'}]};
app.use(cookieParser());

// Public APIs here
app.post('/api/login', authController.apiLoginPOST);
app.get('/api/lectures', lecturesController.apiLecturesGET);
app.get('/api/students/:id/courses', courseController.apiStudentsIdCoursesGET);
app.get('/api/bookings', bookingsController.apiBookingsGET);
app.post('/api/bookings', bookingsController.apiBookingsPOST);

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
app.get('/api/students/:id', studentController.apiStudentsIdGET);
app.delete('/api/lectures/:id', lecturesController.apiLecturesIdDELETE);

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

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function() {
  console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
  console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});
