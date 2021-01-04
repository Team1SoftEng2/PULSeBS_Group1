import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import BookSeat from '../BookSeat/BookSeat';

const testAuthObj = { authUser: "s27001", authErr: undefined, userRole: "student" };
const testCourses = [{ courseId: "TEST1", teacherId: "t37003", name: "Test Lecture Bookable" },
{ courseId: "TEST2", teacherId: "t37003", name: "Test Lecture Unbookable" },
{ courseId: "TEST3", teacherId: "t37003", name: "Test Lecture Online" }];
const testLectures = [{courseId: "TEST1", date: "18-11-2021 13:00", lectureId: "TST1", maxSeats: 100, mode: "present", room: "Aula 1",
teacherId: "t37003", time: "13:00~15:00"},
{courseId: "TEST2", date: "30-11-2021 8:30", lectureId: "TST2", maxSeats: 0, mode: "present", room: "Aula 2", teacherId: "t37003",
time: "8:30~11:00"},
{courseId: "TEST3", date: "15-11-2021 8:30", lectureId: "TST3", maxSeats: 15, mode: "online", room: "Aula 3", teacherId: "t37003",
time: "8:30~11:00"}];
const testBookings = [{ studentId: "s27001", lectureId: "TST1" }];
const testWaitingBookings = [{ studentId: "s27001", lectureId: "TST3" }];
const testProfessors= [{ teacherId: "t37003", name: "John", surname: "Smith" }];

test('Renders BookSeat Correctly', () => {
    const renderResult = render(<BookSeat professors={testProfessors} courses={testCourses} lectures={testLectures} bookings={testBookings} authObj={testAuthObj} waitingBookings ={testWaitingBookings} />);
    expect(renderResult.getByText('Test Lecture Bookable')).toBeInTheDocument();
    expect(renderResult.getByText('Test Lecture Unbookable')).toBeInTheDocument();
    expect(renderResult.getByText('Test Lecture Online')).toBeInTheDocument();
    expect(renderResult.getByText('Book')).toBeInTheDocument();
    expect(renderResult.getByText('Unbook')).toBeInTheDocument();
    expect(renderResult.getByText('Online')).toBeInTheDocument();

});

test('Does not book full lesson', () => {
    const renderResult = render(<BookSeat courses={testCourses} lectures={testLectures} bookings={testBookings} authObj={testAuthObj} />);
    expect(renderResult.getByText('Book')).toBeInTheDocument();
    const tryBookButton = renderResult.getByText('Book');
    fireEvent.click(tryBookButton);
    expect(renderResult.getByText('Book')).toBeInTheDocument();
});

