import React from 'react';
import { render} from '@testing-library/react';
import LoginForm from './../Login/LoginForm/LoginForm';

  test('renders App component', () => {
    render(<LoginForm />);
  });