import React from 'react';
import { fireEvent, render} from '@testing-library/react';
import LoginForm from '../LoginForm/LoginForm';

function handleId(str) {};
function handlePassword(str) {};
function postLogin() {};

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

test('Updates to Email input field', ()=> {
  const renderResult = render(<LoginForm handleId = {handleId}/>);
  const emailInput = 'test@mail.com';
  const emailInputField = renderResult.getByPlaceholderText('Username');
  fireEvent.change(emailInputField,{target: {value: emailInput}});
  expect(emailInputField.value).toBe(emailInput);
});

test('Renders the Password input field', () => {
  const renderResult = render(<LoginForm />);
  const passwordInputField = renderResult.getByPlaceholderText('Password');
  expect(passwordInputField).toBeInTheDocument();
});

test('Updates to Password input field', ()=> {
  const renderResult = render(<LoginForm handlePassword = {handlePassword}/>);
  const passwordInput = 'pwdtest';
  const passwordInputField = renderResult.getByPlaceholderText('Password');
  fireEvent.change(passwordInputField,{target: {value: passwordInput}});
  expect(passwordInputField.value).toBe(passwordInput);
});

test('Renders the Submit Button', () => {
  const renderResult = render(<LoginForm />);
  const submitButton = renderResult.getByRole('button');
  expect(submitButton).toBeInTheDocument();
});

test('Test Button Click', ()=>{
  const renderResult = render(<LoginForm postLogin = {postLogin}/>);
  const submitButton = renderResult.getByRole('button');
  fireEvent.click(submitButton);
});