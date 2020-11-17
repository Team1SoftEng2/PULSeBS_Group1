'use strict';

var path = require('path');
var http = require('http');
var cookieParser = require('cookie-parser');
var jwt = require('express-jwt');
var fs = require("fs");
var { Validator, ValidationError } = require('express-json-validator-middleware');

var oas3Tools = require('oas3-tools');
var serverPort = 8080;

// importing controllers
var bookingsController = require(path.join(__dirname, 'controllers/Bookings'));
var courseController = require(path.join(__dirname, 'controllers/Course'));
var lecturesController = require(path.join(__dirname, 'controllers/Lectures'));
var authController = require(path.join(__dirname, 'controllers/Authentication'));
var studentController = require(path.join(__dirname, 'controllers/Student'));

// swaggerRouter configuration
var options = {
    controllers: path.join(__dirname, './controllers')
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
expressAppConfig.addValidator();
var app = expressAppConfig.getApp();

// Set validator middleware 
//var taskSchema = JSON.parse(fs.readFileSync(path.join('.', 'json_schemas', 'task_schema.json')).toString());
//var userSchema = JSON.parse(fs.readFileSync(path.join('.', 'json_schemas', 'user_schema.json')).toString());
//var validator = new Validator({ allErrors: true });
//validator.ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-07.json'));
//validator.ajv.addSchema([userSchema, taskSchema]);
//var validate = validator.validate;


// Set authentication features
var jwtSecret = '6xvL4xkAAbG49hcXf5GIYSvkDICiUAR6EdR5dLdwW7hMzUjjMUe9t6M5kSAYxsvX';
const authErrorObj = { errors: [{ 'param': 'Server', 'msg': 'Authorization error' }] };
app.use(cookieParser());

// Public APIs here
app.post('/api/login', authController.apiLoginPOST);


// Authentication endpoint
app.use(
    jwt({
        secret: jwtSecret,
        algorithms: ['HS256'],
        getToken: req => req.cookies.token
    })
);

// Authenticated APIs here
app.post('/api/logout', authController.apiLogoutPOST);
app.get('/api/courses/:id', courseController.apiCoursesIdGET);
app.get('/api/students/:id', studentController.apiStudentsIdGET);
app.get('/api/bookings', bookingsController.apiBookingsGET);

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

