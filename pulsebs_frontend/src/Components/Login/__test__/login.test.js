import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginForm from './../LoginForm/LoginForm';



describe('Testing', () => {
    test('renders LoginForm component by role', () => {
      render(<LoginForm />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('App', () => {
    test('renders App component', async () => {
      render(<LoginForm />);
      await screen.findByText(/Lecture Booking/);
   
      //expect(screen.queryByText(/Email/)).toBeNull();
   
     // fireEvent.change(screen.getByRole('textbox'), {
     //   target: { value: '/@gmail.com/' },
     // });
   
      //expect(screen.getByText(/Searches for JavaScript/)).toBeInTheDocument();
    });
  });
