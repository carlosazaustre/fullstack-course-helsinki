import React, { useState } from 'react';
import blogService from '../services/blog';

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const showWhenVisible = { display: visible ? '': 'none' };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const updateLikes = async (blog) => {
    console.log('clicked', blog);
    const response = await blogService.update(blog);
    setLikes(response.likes);
  }

  return (
    <div style={blogStyle}>
      <div onClick={() => setVisible(!visible)}>
        {blog.title} - {blog.author}
        <div style={showWhenVisible}>
          <a href={blog.url}>{blog.url}</a><br />
          {likes} likes <button onClick={() => updateLikes(blog)}>like</button><br />
          added by {blog.user.name}
        </div>
      </div>
    </div>
  );
};

export default Blog;
