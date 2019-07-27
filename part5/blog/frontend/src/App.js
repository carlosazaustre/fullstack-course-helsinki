import React, { useState, useEffect } from 'react';

import LoginForm from './components/LoginForm';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blog';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // State changes
  useEffect(() => {
    async function fetchData() {
      const initialBlogs = await blogService.getAll();
      const sortedBlogs = initialBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // Component Methods
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });

      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('')
    } catch (exception) {
      setErrorMessage(exception.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedUser');
    blogService.unsetToken();
    setUser(null);
  }

  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title,
      author,
      url
    };

    const returnedBlog = await blogService.create(blogObject);
    returnedBlog.user = {
      name: user.name,
    };
    setBlogs(blogs.concat(returnedBlog));
    setTitle('');
    setAuthor('');
    setUrl('');
    setNotificationMessage(
      `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`
    );
    setTimeout(() => {
      setNotificationMessage(null);
    }, 2000);
  };

  const removeBlog = async (blog) => {
    const option = window.confirm(`remove ${blog.title} by ${blog.author}`);
    if (option) {
      await blogService.remove(blog.id);
    }
    setBlogs(blogs.filter(b => b.id !== blog.id));
  }

  const updateBlog = async blog => {
    const updated = await blogService.update(blog);
    const updatedBlogs = blogs
      .filter(b => b.id !== blog.id)
      .concat(updated)
      .sort((a, b) => b.likes - a.likes);

    setBlogs(updatedBlogs);
  };

  const blogFormRef = React.createRef();
  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <h2>create new</h2>
      <BlogForm
        onSubmit={addBlog}
        title={title}
        author={author}
        url={url}
        handleTitleChange={({ target }) => setTitle(target.value)}
        handleAuthorChange={({ target }) => setAuthor(target.value)}
        handleUrlChange={({ target }) => setUrl(target.value)}
      />
    </Togglable>
  );

  // Render
  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={notificationMessage} />
        <Notification type={'error'} message={errorMessage} />
        <LoginForm
          onSubmit={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} />
      <Notification type={'error'} message={errorMessage} />
      <p>
        {user.name} logged in.
        <button onClick={handleLogout}>logout</button>
      </p>
      {blogForm()}
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          handleUpdate={() => updateBlog(blog)}
          handleRemove={() => removeBlog(blog)}
          showRemoveButton={blog.user.name === user.name}
        />
      ))}
    </div>
  );
}

export default App;
