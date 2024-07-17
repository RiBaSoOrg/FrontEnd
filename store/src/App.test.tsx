import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Ensure this import is present
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
});
