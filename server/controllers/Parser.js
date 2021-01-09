const fs = require('fs');
const csv = require('csv-parser');
const moment = require('moment');
const to = require('await-to-js').default;

const Lecture = require('../components/lecture');
const Courses = require('../service/CourseService');

const START_DATE = moment('01-10-2020', 'DD-MM-YYYY');
const END_DATE = moment('31-01-2021', 'DD-MM-YYYY');

module.exports.CSVtoJSON = function parseCSV(path){
    return new Promise ((resolve, reject) => {
        let data = [];
        fs.createReadStream(path)
            .pipe(csv())
            .on('data', (row) => data.push(row))
            .on('end', () => {
                fs.unlinkSync(path);
                resolve(data)
            }).on('error', (err) => {
                fs.unlinkSync(path);
                reject(err)
            });
    });
}

module.exports.createLectures = async function createLectures(schedule) {
    // Find the first day of lecture
    let date = moment(START_DATE);
    while(date.format('ddd') !== schedule.Day) date.add(1, 'd');
    
    // Add stating time
    let time = schedule.Time.split('-');
    let startingTime = time[0].split(':');
    date.add(startingTime[0], 'h');
    date.add(startingTime[1], 'm');

    // Retrieve teacher id
    let [err, course] = await to(Courses.getCourseById(schedule.Code));
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
