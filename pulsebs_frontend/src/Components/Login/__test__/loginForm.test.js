import React from 'react';
import { getByPlaceholderText, getByText, render, screen } from '@testing-library/react';
import LoginForm from '../LoginForm/LoginForm';


test('Renders the Text', () => {
  const renderResult = render(<LoginForm />);
  const headerTitle = renderResult.getByText('Lecture Booking');
  expect(headerTitle).toBeInTheDocument();
});


test('Renders the Email input field', () => {
  const renderResult = render(<LoginForm />);
  const emailInputField = renderResult.getByPlaceholderText('Username');
  expect(emailInputField).toBeInTheDocument();
});

test('Renders the Password input field', async () => {
  const renderResult = render(<LoginForm />);
  const passwordInputField = renderResult.getByPlaceholderText('Password');
  expect(passwordInputField).toBeInTheDocument();
});

test('Renders the Submit Button', () => {
  const renderResult = render(<LoginForm />);
  const submitButton = renderResult.getByRole('button');
  expect(submitButton).toBeInTheDocument();
});