import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginForm from './../Login/LoginForm/LoginForm';

describe('App', () => {
  test('renders App component', () => {
    render(<LoginForm />);
    screen.debug();
  });
});