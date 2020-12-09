import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import StudentPage from '../Student_Page';

const testAuthObj = { authUser: "s27001", authErr: undefined, userRole: "student" };
const testAuthObjErr = { authUser: "s37001", authErr: undefined, userRole: "professor" };

test('Renders Student Header Correctly', () => {
    const renderResult = render(<StudentPage authObj={testAuthObj} />);
    expect(renderResult.getByText('Lecture Booking')).toBeInTheDocument();
    expect(renderResult.getByText('HomePage')).toBeInTheDocument();
    expect(renderResult.getByText('Book a seat')).toBeInTheDocument();
    expect(renderResult.getByText('Tutorial')).toBeInTheDocument();
    expect(renderResult.getByText('Logout')).toBeInTheDocument();
});

test('Check with Wrong Credentials', () => {
    const renderResult = render(<StudentPage authObj={testAuthObjErr} />);
    expect(renderResult.queryByText('= Booked lesson')).not.toBeInTheDocument();
});

test('Check Book a Seat', () => {
    const renderResult = render(<StudentPage authObj={testAuthObj} />);
    const lectureBookingButton = renderResult.getByText('Book a seat');
    fireEvent.click(lectureBookingButton);
    expect(renderResult.getByText('Course')).toBeInTheDocument();
    expect(renderResult.getByText('Date')).toBeInTheDocument();
    expect(renderResult.getByText('Time')).toBeInTheDocument();
    expect(renderResult.getByText('Room')).toBeInTheDocument();
    expect(renderResult.getByText('Seats')).toBeInTheDocument();
    expect(renderResult.getByText('Booking Status')).toBeInTheDocument();

});

test('Check HomePage', () => {
    const renderResult = render(<StudentPage authObj={testAuthObj} />);
    const studentHomePageButton = renderResult.getByText('HomePage');
    fireEvent.click(studentHomePageButton);
    expect(renderResult.getByText('= Booked lesson')).toBeInTheDocument();
    expect(renderResult.getByText('= Not Booked lesson')).toBeInTheDocument();
    expect(renderResult.getByText('= Online lesson')).toBeInTheDocument();
    expect(renderResult.getByText('Today')).toBeInTheDocument();
    expect(renderResult.getByText('Back')).toBeInTheDocument();
    expect(renderResult.getByText('Next')).toBeInTheDocument();
});

test('Check Tutorial', () => {
    const renderResult = render(<StudentPage authObj={testAuthObj} />);
    const tutorialButton = renderResult.getByText('Tutorial');
    fireEvent.click(tutorialButton);
    expect(renderResult.getByText('This page will show the tutorial.')).toBeInTheDocument();
});

test('Check Logout', () => {
    const renderResult = render(<StudentPage authObj={testAuthObj} />);
    const logoutButton = renderResult.getByText('Logout');
    fireEvent.click(logoutButton);
});