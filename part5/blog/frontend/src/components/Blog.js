import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({
  blog,
  handleRemove,
  handleUpdate,
  showRemoveButton
}) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? '' : 'none' };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div style={blogStyle}>
      <div className='blog' onClick={() => setVisible(!visible)}>
        {blog.title} - {blog.author}
        <div className='info' style={showWhenVisible}>
          <a href={blog.url}>{blog.url}</a>
          <br />
          {blog.likes} likes
          <button onClick={handleUpdate}>like</button>
          <br />
          added by {blog.user.name}
          <br />
          {showRemoveButton && <button onClick={handleRemove}>remove</button>}
        </div>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }),
  handleRemove: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  showRemoveButton: PropTypes.bool.isRequired,
};

export default Blog;
