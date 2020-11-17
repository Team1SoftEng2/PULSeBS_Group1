class Lecture{    
    constructor(lectureId, courseId, teacherId, date, time, mode, room, maxSeats) {
        this.lectureId = lectureId;
        this.courseId = courseId;
        this.teacherId = teacherId;
        this.date = date;
        this.time = time;
        this.mode = mode;
        if(room)
            this.room = room;
        if(maxSeats)
            this.maxSeats = maxSeats;
    }
}

module.exports = Lecture;