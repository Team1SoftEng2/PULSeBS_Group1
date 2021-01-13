import Bookings from '../Bookings/Bookings'

import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, fireEvent } from '@testing-library/react';


jest.mock('react-router-dom',() => {
  return {
    useLocation: function() {
      return {
        pathname: "1/2/3/4/5/6",
        search: "",
        state: "1",
        hash: "1",
        key: "1"
      }
    }
  }
})


test('Bookings test', () => {
    const getRender = render(<Bookings />);
    const course = getRender.getByPlaceholderText('Courses name')
    fireEvent.change(course)  

    const date = getRender.getByPlaceholderText('Date of Birth')
    fireEvent.change(date)  

    
  });