import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import SupportOfficerPage from '../SuppOfficer_Page';

const testAuthObj = { authUser: "s37001", authErr: undefined, userRole: "professor" };
const testAuthObjErr = { authUser: "s37001", authErr: true, userRole: "professor" };


test('Renders Booking Manager Header Correctly', () => {
    const renderResult = render(<SupportOfficerPage authObj={testAuthObj} />);
    expect(renderResult.getByText('Lecture Booking')).toBeInTheDocument();
    expect(renderResult.getByText('HomePage')).toBeInTheDocument();
    expect(renderResult.getByText('System Setup')).toBeInTheDocument();
    expect(renderResult.getByText('System Update')).toBeInTheDocument();
    expect(renderResult.getByText('Change Configuration')).toBeInTheDocument();
    expect(renderResult.getByText('Logout')).toBeInTheDocument();
});

test('Check Authentication Error', () => {
    const renderResult = render(<SupportOfficerPage authObj={testAuthObjErr} />);
    expect(renderResult.queryByText('Here the support officer will be able to exclude holidays from booking')).not.toBeInTheDocument();
});

test('Check Change Configuration',()=>{
    const renderResult = render(<SupportOfficerPage authObj={testAuthObj} />);
    const sysConfigButton = renderResult.getByText('Change Configuration');
    fireEvent.click(sysConfigButton);
    expect(renderResult.getByText('Here the support officer will be able to exclude holidays from booking')).toBeInTheDocument();
});

test('Check System Update',()=>{
    const renderResult = render(<SupportOfficerPage authObj={testAuthObj} />);
    const sysUpdateButton = renderResult.getByText('System Update');
    fireEvent.click(sysUpdateButton);
    expect(renderResult.getByText('Here the support officer will update the bookable lecture.')).toBeInTheDocument();
});

test('Check System Setup',()=>{
    const renderResult = render(<SupportOfficerPage authObj={testAuthObj} />);
    const sysSetupButton = renderResult.getByText('System Setup');
    fireEvent.click(sysSetupButton);
    expect(renderResult.getByText('Here the Support Officer will setup the system, uploading courses, students and professors')).toBeInTheDocument();
});

test('Check Home Page',()=>{
    const renderResult = render(<SupportOfficerPage authObj={testAuthObj} />);
    const homePageButton = renderResult.getByText('HomePage');
    fireEvent.click(homePageButton);
    expect(renderResult.getByText('Here the support officer will be able to exclude holidays from booking')).toBeInTheDocument();
});

test('Check Logout',()=>{
    const renderResult = render(<SupportOfficerPage authObj={testAuthObj} />);
    const logoutButton = renderResult.getByText('Logout');
    fireEvent.click(logoutButton);
});