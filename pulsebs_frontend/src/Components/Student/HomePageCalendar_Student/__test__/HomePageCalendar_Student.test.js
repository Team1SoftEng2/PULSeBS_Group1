import React from 'react';
import { render } from '@testing-library/react';
import HomePageCalendarStudent from '../HomePageCalendar_Student';

test('Renders Calendar Legend Correctly', () => {
    const renderResult = render(<HomePageCalendarStudent />);
    expect(renderResult.getByText('Booked lesson')).toBeInTheDocument();
    expect(renderResult.getByText('Not Booked lesson')).toBeInTheDocument();
    expect(renderResult.getByText('Online lesson')).toBeInTheDocument();
});

test('Renders Calendar Buttons Correctly', () => {
    const renderResult = render(<HomePageCalendarStudent />)
    expect(renderResult.getByText('today')).toBeInTheDocument();
    expect(renderResult.getByText('back')).toBeInTheDocument();
    expect(renderResult.getByText('next')).toBeInTheDocument();
});
