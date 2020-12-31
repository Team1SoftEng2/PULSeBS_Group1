import React from 'react';
import {render} from '@testing-library/react';
import StatisticsPage from '../Statistics/StatisticsPage';

const testAuthObj = { authUser: "t37001", authErr: undefined, userRole: "professor" };

test('Check if Statistics render correctly', () => {
    const renderResult = render(<StatisticsPage />);
    expect(renderResult.getByText('Select Course')).toBeInTheDocument();
    expect(renderResult.getByText('Weekly Bookings (average)')).toBeInTheDocument();
    expect(renderResult.getByText('Monthly Bookings (average)')).toBeInTheDocument();


});
