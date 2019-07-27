import React, { useState } from 'react';

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? '': 'none' };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div onClick={() => setVisible(!visible)}>
        {blog.title} - {blog.author}
        <div style={showWhenVisible}>
          <a href={blog.url}>{blog.url}</a><br />
          {blog.likes} likes <button>like</button><br />
          added by {blog.user.name}
        </div>
      </div>
    </div>
  );
};

export default Blog;
