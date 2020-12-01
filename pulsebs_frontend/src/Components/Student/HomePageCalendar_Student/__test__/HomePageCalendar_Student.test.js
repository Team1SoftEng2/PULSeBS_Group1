import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePageCalendarStudent from '../HomePageCalendar_Student';

test('Renders Calendar Legend Correctly', () => {
    render(<HomePageCalendarStudent />);
    screen.findByText(/Booked lesson/);
    screen.findByText(/Not Booked lesson/);
    screen.findByText(/Online lesson/)
});

test('Renders Calendar Correctly', () => {
    render(<HomePageCalendarStudent />)
    screen.findByText(/today/);
    screen.findByText(/back/);
    screen.findByText(/next/);
});
