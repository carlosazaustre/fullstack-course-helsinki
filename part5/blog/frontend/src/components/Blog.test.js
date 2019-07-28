import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Blog from './Blog';

afterEach(cleanup);

describe('<Blog />', () => {
  let component;
  let mockHandleRemove;
  let mockHandleUpdate;
  const blog = {
    title: 'Test title',
    author: 'Test author',
    likes: 1,
    url: 'http://localhost.com',
    id: '1',
    user: {
      name: 'John Doe',
      username: 'johndoe',
      id: '2'
    }
  };

  beforeEach(() => {
    mockHandleRemove = jest.fn();
    mockHandleUpdate = jest.fn();
    component = render(
      <Blog
        blog={blog}
        handleRemove={mockHandleRemove}
        handleUpdate={mockHandleUpdate}
        showRemoveButton={true}
      />
    )
  });

  test('button of a component is pressed twice handler is runngin twice', () => {
    const button = component.getByText('like');
    fireEvent.click(button);
    fireEvent.click(button);
    expect(mockHandleUpdate.mock.calls.length).toBe(2);
  });

  test('blog component render properly', () => {
    const hiddenDiv = component.container.querySelector('.info');
    expect(hiddenDiv).toHaveStyle('display: none');

    const div = component.getByText('Test title - Test author');
    fireEvent.click(div);
    expect(div).toHaveStyle('');
  });
});
