import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

afterEach(cleanup);

describe('<SimpleBlog />', () => {
  let component;
  let mockHandler;
  const blog = {
    title: 'Test title',
    author: 'Test author',
    likes: 1
  };

  beforeEach(() => {
    mockHandler = jest.fn();
    component = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    );
  });

  test('click button', () => {
    const button = component.getByText('like');
    fireEvent.click(button);
    expect(mockHandler.mock.calls.length).toBe(1);
  });

  test('render props', () => {
    const title = component.getByText('Test title Test author');
    expect(title).toHaveTextContent('Test title');
  });
})