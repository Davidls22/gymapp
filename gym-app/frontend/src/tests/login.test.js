import { render, fireEvent, screen } from '@testing-library/react';
import { Login } from './path/to/Login';

test('submitting the form calls handleSubmit', async () => {
  const onLoginMock = jest.fn(); // Create a mock function for the onLogin prop
  render(<Login onLogin={onLoginMock} />); // Render the Login component with the mock function

  const emailInput = screen.getByPlaceholderText('Email'); // Get the email input element
  const passwordInput = screen.getByPlaceholderText('Password'); // Get the password input element
  const submitButton = screen.getByRole('button', { name: 'Login' }); // Get the login button element

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } }); // Simulate typing an email address
  fireEvent.change(passwordInput, { target: { value: 'password123' } }); // Simulate typing a password
  fireEvent.click(submitButton); // Simulate clicking the login button

  expect(onLoginMock).toHaveBeenCalledWith(false); // Check that the onLogin mock function was called with false
});
