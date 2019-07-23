const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const Note = require('../models/note');

const api = supertest(app);

describe('when there is initially some notes saved', () => {
  beforeEach(async () => {
    await Note.deleteMany({});
    const noteObjects = helper.initialNotes.map(note => new Note(note));
    const promiseArray = noteObjects.map(note => note.save());
    await Promise.all(promiseArray);
  });

  test('notes are returned as JSON', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes');
    expect(response.body.length).toBe(helper.initialNotes.length);
  });

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes');
    const contents = response.body.map(r => r.content);
    expect(contents).toContain('Browser can execute only Javascript');
  });

  describe('viewing a specific notes', () => {
    test('succeeds with a valid id', async () => {
      const notesAtStart = await helper.notesInDb();
      const noteToView = notesAtStart[0];
      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);
      expect(resultNote.body).toEqual(noteToView);
    });

    test('fails with statuscode 404 if note does not exist', async () => {
      const validNonExistingId = await helper.nonExistingId();
      console.log(validNonExistingId);
      await api
        .get(`/api/notes/${validNonExistingId}`)
        .expect(404);
    });

    test('fails with statuscode 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445';
      await api
        .get(`/api/notes/${invalidId}`)
        .expect(400);
    });
  });

  describe('addition of a new note', () => {
    test('succeeds with valid data', async () => {
      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
        date: new Date(),
      };

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const notesAtEnd = await helper.notesInDb();
      expect(notesAtEnd.length).toBe(helper.initialNotes.length + 1);

      const contents = notesAtEnd.map(n => n.content);
      expect(contents).toContain('async/await simplifies making async calls');
    });

    test('fails with status code 400 if data invaild', async () => {
      const newNote = {
        important: true,
      };

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(400);

      const notesAtEnd = await helper.notesInDb();
      expect(notesAtEnd.length).toBe(helper.initialNotes.length);
    });
  });

  describe('deletion of a note', () => {
    test('succeeds with status code 200 if id is valid', async () => {
      const notesAtStart = await helper.notesInDb();
      const noteToDelete = notesAtStart[0];

      await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

      const notesAtEnd = await helper.notesInDb();
      expect(notesAtEnd.length).toBe(helper.initialNotes.length - 1);

      const contents = notesAtEnd.map(n => n.content);
      expect(contents).not.toContain(noteToDelete.content);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
