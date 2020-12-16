import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import HomePageCalendarStudent from '../HomePageCalendar_Student/HomePageCalendar_Student';

const testAuthObj = { authUser: "s27001", authErr: undefined, userRole: "student" };
const testCourses = [{ courseId: "TEST1", teacherId: "t37003", name: "Test Lecture Bookable" },
{ courseId: "TEST2", teacherId: "t37003", name: "Test Lecture Unbookable" },
{ courseId: "TEST3", teacherId: "t37003", name: "Test Lecture Online" }];
const testLectures = [{courseId: "TEST1", date: "17-12-2020 13:00", lectureId: "TST1", maxSeats: 100, mode: "present", room: "Aula 1",
teacherId: "t37003", time: "13:00~15:00"},
{courseId: "TEST2", date: "21-12-2020 8:30", lectureId: "TST2", maxSeats: 0, mode: "present", room: "Aula 2", teacherId: "t37003",
time: "8:30~11:00"},
{courseId: "TEST3", date: "16-12-2020 8:30", lectureId: "TST3", maxSeats: 15, mode: "online", room: "Aula 3", teacherId: "t37003",
time: "8:30~11:00"}];
const testBookings = [{ studentId: "s27001", lectureId: "TST1" }];

test('Renders the HomePage Calendar with events for the student Correctly', () => {
    const renderResult = render(<HomePageCalendarStudent courses={testCourses} lectures={testLectures} bookings={testBookings} authObj={testAuthObj} />);
    expect(renderResult.getByText('08:00')).toBeInTheDocument();
    expect(renderResult.getByText('19:00')).toBeInTheDocument();
    expect(renderResult.queryByText('Test Lecture Online')).not.toBeInTheDocument();
});