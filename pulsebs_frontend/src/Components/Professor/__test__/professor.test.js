import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePageCalendarProfessor from './../HomePageCalendarProfessor/HomePageCalendarProfessor';

describe('Testing correction of the rendering of LoginForm component', () => {
    test('renders LoginForm component', () => {
      render(<HomePageCalendarProfessor />);
      screen.debug();
      //checking the correct rendering of some labels
     expect(screen.getByText('Here the professor will see a calendar with his/her lessons for the week')).toBeInTheDocument();
    });
  });