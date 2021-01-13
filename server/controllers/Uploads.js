const to = require('await-to-js').default;
const utils = require('../utils/writer.js');

const Parser = require('./Parser');

const User = require('../components/user')
const Users = require('../service/AuthenticationService');

const Course = require('../components/course');
const Courses = require('../service/CourseService');

const Lectures = require('../service/LecturesService');

module.exports.parseStudentsCSV = async function(req, res){
    let path = req.file.path;
    
    let [err, data] = await to(Parser.CSVtoJSON(path));
    if(err) return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': err}]}, 500);

    // Insert elements into the DB
    let result;
    [err, result] = await to(Promise.allSettled(data.map((row) => Users.addStudent(new User('s' + row.Id, row.Name, row.Surname, row.OfficialEmail)))));
    if(err) return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': err}]}, 500);
    
    let fulfilled = result.filter( (r) => r.status === 'fulfilled');
    if(fulfilled.length === 0)
        // if no element added to the DB returns error
        return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': 'No element added'}]}, 422);
    else
        // if at least one element added to the DB returns the number of added elements
        return utils.writeJson(res, {added: fulfilled.length}, 201);
}

module.exports.parseTeachersCSV = async function(req, res){
    let path = req.file.path;
    
    let [err, data] = await to(Parser.CSVtoJSON(path));
    if(err) return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': err}]}, 500);

    

    // Insert elements into the DB
    let result;
    [err, result] = await to(Promise.allSettled(data.map((row) => Users.addTeacher(new User('t' + row.Number.substr(1), row.GivenName, row.Surname, row.OfficialEmail)))));
    if(err) return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': err}]}, 500);
    
    let fulfilled = result.filter( (r) => r.status === 'fulfilled');
    if(fulfilled.length === 0)
        // if no element added to the DB returns error
        return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': 'No element added'}]}, 422);
    else
        // if at least one element added to the DB returns the number of added elements
        return utils.writeJson(res, {added: fulfilled.length}, 201);
}

module.exports.parseCoursesCSV = async function(req, res){
    let path = req.file.path;
    
    let [err, data] = await to(Parser.CSVtoJSON(path));
    if(err) return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': err}]}, 500);

    // Insert elements into the DB
    let result;
    [err, result] = await to(Promise.allSettled(data.map((row) => Courses.addCourse(new Course(row.Code, 't' + row.Teacher.substr(1), row.Course)))));
    if(err) return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': err}]}, 500);
    
    let fulfilled = result.filter( (r) => r.status === 'fulfilled');
    if(fulfilled.length === 0)
        // if no element added to the DB returns error
        return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': 'No element added'}]}, 422);
    else
        // if at least one element added to the DB returns the number of added elements
        return utils.writeJson(res, {added: fulfilled.length}, 201);
}

module.exports.parseEnrollmentCSV = async function(req, res){
    let path = req.file.path;
    
    let [err, data] = await to(Parser.CSVtoJSON(path));
    if(err) return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': err}]}, 500);

    // Insert elements into the DB
    let result;
    [err, result] = await to(Promise.allSettled(data.map((row) => Courses.addCourseAttendance(row.Code, 's' + row.Student))));
    if(err) return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': err}]}, 500);
    
    let fulfilled = result.filter( (r) => r.status === 'fulfilled');
    if(fulfilled.length === 0)
        // if no element added to the DB returns error
        return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': 'No element added'}]}, 422);
    else
        // if at least one element added to the DB returns the number of added elements
        return utils.writeJson(res, {added: fulfilled.length}, 201);
}

module.exports.parseScheduleCSV = async function (req, res) {
    let path = req.file.path;

    let [err, data] = await to(Parser.CSVtoJSON(path));
    if(err) return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': err}]}, 500);
    
    // Create lectures from schedule
    let result
    [err, result] = await to(Promise.allSettled(data.map( (row) => Parser.createLectures(row) )));
    if(err) return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': err}]}, 500);

    let lectures = result.filter( r => r.status === 'fulfilled' ).map( r => r.value ).flat();

    // Insert elements into the DB
    [err, result] = await to(Promise.allSettled(lectures.map((lecture) => Lectures.addLecture(lecture))));
    if(err) return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': err}]}, 500);
    
    let fulfilled = result.filter( (r) => r.status === 'fulfilled');
    if(fulfilled.length === 0)
        // if no element added to the DB returns error
        return utils.writeJson(res, {errors: [{'param': 'Server', 'msg': 'No element added'}]}, 422);
    else
        // if at least one element added to the DB returns the number of added elements
        return utils.writeJson(res, {added: fulfilled.length}, 201);
};