import React from 'react';

const BlogForm = ({
  onSubmit,
  title,
  author,
  url,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange
}) => (
  <form onSubmit={onSubmit}>
    <div>
      title
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
      />
    </div>
    <div>
      author
      <input
        type="text"
        value={author}
        onChange={handleAuthorChange}
      />
    </div>
    <div>
      url
      <input
        type="text"
        value={url}
        onChange={handleUrlChange}
      />
    </div>
    <button type="submit">create</button>
  </form>
);

export default BlogForm;
