const Booking = require('../../components/booking');
const Course = require('../../components/course');
const Lecture = require('../../components/lecture');
const User = require('../../components/user');

test('Booking constructor', () => {
    let booking = new Booking('student', 'lecture');
    expect(booking.studentId).toBe('student');
    expect(booking.lectureId).toBe('lecture');
});

test('Course constructor', () => {
    let course = new Course('course', 'teacher', 'name');
    expect(course.courseId).toBe('course');
    expect(course.teacherId).toBe('teacher');
    expect(course.name).toBe('name');
});

test('Lecture constructor', () => {
    let lecture1 = new Lecture('lecture', 'course', 'teacher', 'date', 'time', 'mode');
    expect(lecture1.lectureId).toBe('lecture');
    expect(lecture1.courseId).toBe('course');
    expect(lecture1.teacherId).toBe('teacher');
    expect(lecture1.date).toBe('date');
    expect(lecture1.time).toBe('time');
    expect(lecture1.mode).toBe('mode');
    expect(lecture1.room).toBeUndefined;
    expect(lecture1.maxSeats).toBeUndefined;

    let lecture2 = new Lecture('lecture', 'course', 'teacher', 'date', 'time', 'mode', 'room', 100);
    expect(lecture2.lectureId).toBe('lecture');
    expect(lecture2.courseId).toBe('course');
    expect(lecture2.teacherId).toBe('teacher');
    expect(lecture2.date).toBe('date');
    expect(lecture2.time).toBe('time');
    expect(lecture2.mode).toBe('mode');
    expect(lecture2.room).toBe('room');
    expect(lecture2.maxSeats).toBe(100);

    let lecture3 = new Lecture('lecture', 'course', 'teacher', 'date', 'time', 'mode', 'room');
    expect(lecture3.lectureId).toBe('lecture');
    expect(lecture3.courseId).toBe('course');
    expect(lecture3.teacherId).toBe('teacher');
    expect(lecture3.date).toBe('date');
    expect(lecture3.time).toBe('time');
    expect(lecture3.mode).toBe('mode');
    expect(lecture3.room).toBe('room');
    expect(lecture3.maxSeats).toBeUndefined;   
});

test('User constructor', () => {
    let user1 = new User('id', 'name', 'surname', 'email');
    expect(user1.userId).toBe('id');
    expect(user1.name).toBe('name');
    expect(user1.surname).toBe('surname');
    expect(user1.email).toBe('email');
    expect(user1.hash).toBeUndefined;

    let user2 = new User('id', 'name', 'surname', 'email', 'hash');
    expect(user2.userId).toBe('id');
    expect(user2.name).toBe('name');
    expect(user2.surname).toBe('surname');
    expect(user2.email).toBe('email');
    expect(user2.hash).toBe('hash');
});