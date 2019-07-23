const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

describe('when there is initially some blog posts saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
    const promiseArray = blogObjects.map(blog => blog.save());
    await Promise.all(promiseArray);
  });

  test('blogs posts are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blog posts are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body.length).toBe(helper.initialBlogs.length);
  });

  test('unique identifier property of the blogposts is named id', async () => {
    const response = await api.get('/api/blogs');
    const blog = response.body[0];
    expect(blog.id).toBeDefined();
  });

  describe('viewing a specific blog post', () => {

  });

  describe('addition of a new blog post', () => {
    test('succeeds with valid data', async () => {
      const newBlog = {
        title: 'test title',
        author: 'jest',
        url: 'http://localhost',
        likes: 1
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);

      const titles = blogsAtEnd.map(b => b.title);
      expect(titles).toContain('test title');
    });

    test('blog post without likes property set default to 0', async () => {
      const newBlog = {
        title: 'test title without likes',
        author: 'jest',
        url: 'http://localhost',
      };

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body.likes).toBeDefined();
      expect(response.body.likes).toBe(0);
    });

    test('blog post without title and url properties is not added', async () => {
      const newBlog = {
        author: 'Jest',
        likes: 10,
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length);
    });
  });

  describe('updating a blog post', () => {
    test('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[0];

      const updatedBlog = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send({})
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length);
      expect(updatedBlog.body.likes).toBe(blogToUpdate.likes + 1);
    });
  });

  describe('deletion of a blog post', () => {
    test('succeeds with status code 200 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api.delete(`/api/blogs/${blogToDelete.id}`);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1);

      const titles = blogsAtEnd.map(n => n.title);
      expect(titles).not.toContain(blogToDelete.title);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
