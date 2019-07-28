import React from 'react';
import { render, waitForElement } from '@testing-library/react';
jest.mock('./services/blog');
import App from './App';

describe('<App />', () => {
  test('if no user logged, notes are not rendered', async () => {
    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.getByText('login'));

    const blogs = component.container.querySelectorAll('.blog');
    expect(blogs.length).toBe(0);
  });

  test('if user is logged in, the blog posts are rendered to the page.', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    };
    localStorage.setItem('loggedUser', JSON.stringify(user));

    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.container.querySelector('.blog'));

    const blogs = component.container.querySelectorAll('.blog');
    expect(blogs.length).toBe(2);
  });
});
