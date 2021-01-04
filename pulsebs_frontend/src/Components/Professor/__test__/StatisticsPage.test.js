import React from 'react';
import {render} from '@testing-library/react';
import StatisticsPage from '../Statistics/StatisticsPage';

const testCourses = [{courseId: 'TEST' , name: 'TestCourse' }];

test('Check if Statistics render correctly', () => {
    const renderResult = render(<StatisticsPage courses = {testCourses}/>);
    expect(renderResult.getByText('Select Course')).toBeInTheDocument();
    expect(renderResult.getByText('Select Date')).toBeInTheDocument();
    expect(renderResult.getByText('Daily Bookings')).toBeInTheDocument();
    expect(renderResult.getByText('Weekly Bookings (average)')).toBeInTheDocument();
    expect(renderResult.getByText('Monthly Bookings (average)')).toBeInTheDocument();
    expect(renderResult.getByText('Jan')).toBeInTheDocument();
    expect(renderResult.getByText('Feb')).toBeInTheDocument();
    expect(renderResult.getByText('Mar')).toBeInTheDocument();
    expect(renderResult.getByText('Apr')).toBeInTheDocument();
    expect(renderResult.getByText('May')).toBeInTheDocument();
    expect(renderResult.getByText('Jun')).toBeInTheDocument();
    expect(renderResult.getByText('Jul')).toBeInTheDocument();
    expect(renderResult.getByText('Aug')).toBeInTheDocument();
    expect(renderResult.getByText('Sep')).toBeInTheDocument();
    expect(renderResult.getByText('Oct')).toBeInTheDocument();
    expect(renderResult.getByText('Nov')).toBeInTheDocument();
    expect(renderResult.getByText('Dec')).toBeInTheDocument();
});
