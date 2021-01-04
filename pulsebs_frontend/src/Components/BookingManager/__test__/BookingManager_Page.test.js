import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import BookingManagerPage from '../BookingManager_Page';

const testAuthObj = { authUser: "s37001", authErr: undefined, userRole: "professor" };
const testAuthObjErr = { authUser: "s37001", authErr: true, userRole: "professor" };

test('Renders Booking Manager Header Correctly', () => {
    const renderResult = render(<BookingManagerPage authObj={testAuthObj} />);
    expect(renderResult.getByText('Lecture Booking')).toBeInTheDocument();
    expect(renderResult.getByText('HomePage')).toBeInTheDocument();
    expect(renderResult.getByText('Monitor System Usage')).toBeInTheDocument();
    expect(renderResult.getByText('Booking')).toBeInTheDocument();
    expect(renderResult.getByText('Deleted Lectures')).toBeInTheDocument();
    expect(renderResult.getByText('Attendance')).toBeInTheDocument();
    expect(renderResult.getByText('Contact Tracing')).toBeInTheDocument();
    expect(renderResult.getByText('Logout')).toBeInTheDocument();
});

test('Check Authentication Error', () => {
    const renderResult = render(<BookingManagerPage authObj={testAuthObjErr} />);
    expect(renderResult.queryByText('HomePageHere the booking manager can Monitor the sysyem usage.')).not.toBeInTheDocument();
});

test('Check Booking',()=>{
    const renderResult = render(<BookingManagerPage authObj={testAuthObj} />);
    const bookingButton = renderResult.getByText('Booking');
    fireEvent.click(bookingButton);
    expect(renderResult.getByText('Courses :')).toBeInTheDocument();
    expect(renderResult.getByText('Month-Year :')).toBeInTheDocument();
    expect(renderResult.getByText('#')).toBeInTheDocument();
    expect(renderResult.getByText('Course Name')).toBeInTheDocument();
    expect(renderResult.getByText('LectureID')).toBeInTheDocument();
    expect(renderResult.getByText('Teacher Name')).toBeInTheDocument();
    expect(renderResult.getByText('Student Name')).toBeInTheDocument();
    expect(renderResult.getByText('Date')).toBeInTheDocument();
    expect(renderResult.getByText('Time')).toBeInTheDocument();
    expect(renderResult.getByText('Mode')).toBeInTheDocument();
    expect(renderResult.getByText('Place')).toBeInTheDocument();
});

test('Check Attendance',()=>{
    const renderResult = render(<BookingManagerPage authObj={testAuthObj} />);
    const attendanceButton = renderResult.getByText('Attendance');
    fireEvent.click(attendanceButton);
    expect(renderResult.getByText('Courses :')).toBeInTheDocument();
    expect(renderResult.getByText('Month-Year :')).toBeInTheDocument();
    expect(renderResult.getByText('#')).toBeInTheDocument();
    expect(renderResult.getByText('Course Name')).toBeInTheDocument();
    expect(renderResult.getByText('LectureID')).toBeInTheDocument();
    expect(renderResult.getByText('Teacher Name')).toBeInTheDocument();
    expect(renderResult.getByText('Student Name')).toBeInTheDocument();
    expect(renderResult.getByText('Date')).toBeInTheDocument();
    expect(renderResult.getByText('Time')).toBeInTheDocument();
    expect(renderResult.getByText('Mode')).toBeInTheDocument();
    expect(renderResult.getByText('Place')).toBeInTheDocument();
});

test('Check Deleted Lectures',()=>{
    const renderResult = render( <BookingManagerPage authObj={testauthObj} />);
    const deletedLecturesButton = renderResult.getByText('Deleted Lectures');
    fireEvent.click(deletedLecturesButton);
    expect(renderResult.getByText('Courses :')).toBeInTheDocument();
    expect(renderResult.getByText('Month-Year :')).toBeInTheDocument();
    expect(renderResult.getByText('#')).toBeInTheDocument();
    expect(renderResult.getByText('Course Name')).toBeInTheDocument();
    expect(renderResult.getByText('LectureID')).toBeInTheDocument();
    expect(renderResult.getByText('Teacher Name')).toBeInTheDocument();
    expect(renderResult.getByText('Student Name')).toBeInTheDocument();
    expect(renderResult.getByText('Date')).toBeInTheDocument();
    expect(renderResult.getByText('Time')).toBeInTheDocument();
    expect(renderResult.getByText('Mode')).toBeInTheDocument();
    expect(renderResult.getByText('Place')).toBeInTheDocument();
});


test('Check Monitor System Usage',()=>{
    const renderResult = render(<BookingManagerPage authObj={testAuthObj} />);
    const sysUsageButton = renderResult.getByText('Monitor System Usage');
    fireEvent.click(sysUsageButton);
    expect(renderResult.getByText('Here the booking manager can Monitor the system usage.')).toBeInTheDocument();
});

test('Check Contact Tracing',()=>{
    const renderResult = render(<BookingManagerPage authObj={testAuthObj} />);
    const contactTracingButton = renderResult.getByText('Contact Tracing');
    fireEvent.click(contactTracingButton);
    expect(renderResult.getByText('Here the booking manager can trace contact in case a professor or a student is positive to COVID19')).toBeInTheDocument();
});

test('Check Home Page',()=>{
    const renderResult = render(<BookingManagerPage authObj={testAuthObj} />);
    const homePageButton = renderResult.getByText('HomePage');
    fireEvent.click(homePageButton);
    expect(renderResult.getByText('Here the booking manager can Monitor the system usage.')).toBeInTheDocument();
});

test('Check Logout',()=>{
    const renderResult = render(<BookingManagerPage authObj={testAuthObj} />);
    const logoutButton = renderResult.getByText('Logout');
    fireEvent.click(logoutButton);
});