const fs = require('fs');
const csv = require('neat-csv'); 
const to = require('await-to-js').default;
const utils = require('../utils/writer.js');
const moment = require('moment');

const User = require('../components/user')
const Users = require('../service/AuthenticationService');

const Course = require('../components/course');
const Courses = require('../service/CourseService');

const Lecture = require('../components/lecture'); 
const Lectures = require('../service/LecturesService');

const START_DATE = moment('01-10-2020', 'DD-MM-YYYY');
const END_DATE = moment('31-01-2021', 'DD-MM-YYYY');

module.exports.parseStudentsCSV = async function (req, res) {
    let path = req.file.path;
    let file = fs.readFileSync(path);
    
    // Coverting from CSV to JSON
    let [err, data] = await to(csv(file));
    if(err) {
        fs.unlinkSync(path);
        utils.writeJson(res, {errors: [{'param': 'Server', 'msg': err}]}, 500);
    }
    fs.unlinkSync(path);

    // Insert the students into the DB
    Promise.allSettled(data.map((row) => Users.addStudent(new User('s' + row.Id, row.Name, row.Surname, row.OfficialEmail))))
        .then((result) => {
            let fulfilled = result.filter( (r) => r.status === 'fulfilled');
            if(fulfilled.length === 0)
                // if no student added to the DB returns error
                utils.writeJson(res, {errors: [{'param': 'Server', 'msg': 'No student added'}]}, 500);
            else
                // if at least one student added to the DB returns the number of added students
                utils.writeJson(res, {added: fulfilled.length}, 201);
        });
};

module.exports.parseTeachersCSV = async function (req, res) {
    let path = req.file.path;
    let file = fs.readFileSync(path);
    
    // Coverting from CSV to JSON
    let [err, data] = await to(csv(file));
    if(err) {
        fs.unlinkSync(path);
        utils.writeJson(res, {errors: [{'param': 'Server', 'msg': err}]}, 500);
    }
    fs.unlinkSync(path);

    // Insert the students into the DB
    Promise.allSettled(data.map((row) => Users.addTeacher(new User(row.Number, row.GivenName, row.Surname, row.OfficialEmail))))
        .then((result) => {
            let fulfilled = result.filter( (r) => r.status === 'fulfilled');
            if(fulfilled.length === 0)
                // if no student added to the DB returns error
                utils.writeJson(res, {errors: [{'param': 'Server', 'msg': 'No teacher added'}]}, 500);
            else
                // if at least one student added to the DB returns the number of added students
                utils.writeJson(res, {added: fulfilled.length}, 201);
        });
};

module.exports.parseCoursesCSV = async function (req, res) {
    let path = req.file.path;
    let file = fs.readFileSync(path);
    
    // Coverting from CSV to JSON
    let [err, data] = await to(csv(file));
    if(err) {
        fs.unlinkSync(path);
        utils.writeJson(res, {errors: [{'param': 'Server', 'msg': err}]}, 500);
    }
    fs.unlinkSync(path);

    // Insert the students into the DB
    Promise.allSettled(data.map((row) => Courses.addCourse(new Course(row.Code, row.Teacher, row.Course))))
        .then((result) => {
            let fulfilled = result.filter( (r) => r.status === 'fulfilled');
            if(fulfilled.length === 0)
                // if no student added to the DB returns error
                utils.writeJson(res, {errors: [{'param': 'Server', 'msg': 'No course added'}]}, 500);
            else
                // if at least one student added to the DB returns the number of added students
                utils.writeJson(res, {added: fulfilled.length}, 201);
        });
};

module.exports.parseEnrollmentCSV = async function (req, res) {
    let path = req.file.path;
    let file = fs.readFileSync(path);
    
    // Coverting from CSV to JSON
    let [err, data] = await to(csv(file));
    if(err) {
        fs.unlinkSync(path);
        utils.writeJson(res, {errors: [{'param': 'Server', 'msg': err}]}, 500);
    }
    fs.unlinkSync(path);

    // Insert the students into the DB
    Promise.allSettled(data.map((row) => Courses.addCourseAttendance(row.Code, 's' + row.Student)))
        .then((result) => {
            let fulfilled = result.filter( (r) => r.status === 'fulfilled');
            if(fulfilled.length === 0)
                // if no student added to the DB returns error
                utils.writeJson(res, {errors: [{'param': 'Server', 'msg': 'No enrollment added'}]}, 500);
            else
                // if at least one student added to the DB returns the number of added students
                utils.writeJson(res, {added: fulfilled.length}, 201);
        });
};

module.exports.parseScheduleCSV = async function (req, res) {
    let path = req.file.path;
    let file = fs.readFileSync(path);
    
    // Coverting from CSV to JSON
    let [err, data] = await to(csv(file));
    if(err) {
        fs.unlinkSync(path);
        utils.writeJson(res, {errors: [{'param': 'Server', 'msg': err}]}, 500);
    }
    fs.unlinkSync(path);

    Promise.allSettled(data.map( (row) => createLectures(row) ))
        .then((result) => {
            let lectures = result.filter( r => r.status === 'fulfilled' ).map( r => r.value ).flat();
            //Insert the students into the DB
            Promise.allSettled(lectures.map((lecture) => Lectures.addLecture(lecture)))
                .then((result) => {
                    let fulfilled = result.filter( (r) => r.status === 'fulfilled');
                    if(fulfilled.length === 0)
                        // if no student added to the DB returns error
                        utils.writeJson(res, {errors: [{'param': 'Server', 'msg': 'No lecture added'}]}, 500);
                    else
                        // if at least one student added to the DB returns the number of added students
                        utils.writeJson(res, {added: fulfilled.length}, 201);
             });
        }); 
};

async function createLectures(schedule) {
    // Find the first day of lecture
    let date = moment(START_DATE);
    while(date.format('ddd') !== schedule.Day) date.add(1, 'd');
    
    // Add stating time
    let time = schedule.Time.split('-');
    let startingTime = time[0].split(':');
    date.add(startingTime[0], 'h');
    date.add(startingTime[1], 'm');

    // Retrieve teacher id
    [err, course] = await to(Courses.getCourseById(schedule.Code));
    if(err) throw err; 
    
    // Create all the lectures
    let lectures = [];
    while(date.isSameOrBefore(END_DATE)){
        let id = schedule.Code + date.format();
        let lecture = new Lecture(id, schedule.Code, course.teacherId, date.format('DD-MM-YYYY HH:mm'), time[0]+'~'+time[1], 'present', schedule.Room, schedule.Seats)
        lectures.push(lecture);
        date.add(7, 'd');
    }
    return lectures;
}
