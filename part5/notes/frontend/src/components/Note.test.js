import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Note from './Note';

afterEach(cleanup);

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  };

  const mockHandler = jest.fn();

  const { getByText } = render(
    <Note note={note} toggleImportance={mockHandler} />
  );

  const button = getByText('make not important');
  fireEvent.click(button);
  expect(mockHandler.mock.calls.length).toBe(1);
})