import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ProfessorPage from '../Professor_Page';

const testAuthObj = { authUser: "t37001", authErr: undefined, userRole: "professor" };
const testAuthObjErr = { authUser: "s27001", authErr: undefined, userRole: "student" };
const testAuthObjErr2 = { authUser: "t37001", authErr: true, userRole: "student" };



test('Renders Professor Header Correctly', () => {
  const renderResult = render(<ProfessorPage authObj={testAuthObj} />);
  expect(renderResult.getByText('Lecture Booking')).toBeInTheDocument();
  expect(renderResult.getByText('HomePage')).toBeInTheDocument();
  expect(renderResult.getByText('My Lectures')).toBeInTheDocument();
  expect(renderResult.getByText('Register Attendance')).toBeInTheDocument();
  expect(renderResult.getByText('Statistics')).toBeInTheDocument();
  expect(renderResult.getByText('Tutorial')).toBeInTheDocument();
  expect(renderResult.getByText('Logout')).toBeInTheDocument();
});

test('Check Authentication Error', ()=>{
  const renderResult = render(<ProfessorPage authObj={testAuthObjErr2} />);
  expect(renderResult.queryByText('Here the professor will see a calendar with his/her lessons for the week')).not.toBeInTheDocument();
});

test('Check with Wrong Credentials', () => {
  const renderResult = render(<ProfessorPage authObj={testAuthObjErr} />);
  expect(renderResult.queryByText('Here the professor will see a calendar with his/her lessons for the week')).not.toBeInTheDocument();
});

test('Check Home Page', () => {
  const renderResult = render(<ProfessorPage authObj={testAuthObj} />);
  const professorHomePageButton = renderResult.getByText('HomePage');
  fireEvent.click(professorHomePageButton);
  expect(renderResult.getByText('Here the professor will see a calendar with his/her lessons for the week')).toBeInTheDocument();
});

test('Check My Lectures', () => {
  const renderResult = render(<ProfessorPage authObj={testAuthObj} />);
  const professorLecturesButton = renderResult.getByText('My Lectures');
  fireEvent.click(professorLecturesButton);
  //todo
});

test('Check Register Attendance', () => {
  const renderResult = render(<ProfessorPage authObj={testAuthObj} />);
  const attendanceButton = renderResult.getByText('Register Attendance');
  fireEvent.click(attendanceButton);
  expect(renderResult.getByText('Here the professor will register the students attending from the ones who booked the lesson')).toBeInTheDocument();
});

test('Check Statistics', () => {
  const renderResult = render(<ProfessorPage authObj={testAuthObj} />);
  const statisticsButton = renderResult.getByText('Statistics');
  fireEvent.click(statisticsButton);
  expect(renderResult.getByText('Here the professor will be able to check the statistics')).toBeInTheDocument();
});

test('Check Tutorial', () => {
  const renderResult = render(<ProfessorPage authObj={testAuthObj} />);
  const tutorialButton = renderResult.getByText('Tutorial');
  fireEvent.click(tutorialButton);
  expect(renderResult.getByText('This page will show the tutorial.')).toBeInTheDocument();
});

test('Check Logout', () => {
  const renderResult = render(<ProfessorPage authObj={testAuthObj} />);
  const logoutButton = renderResult.getByText('Logout');
  fireEvent.click(logoutButton);
});