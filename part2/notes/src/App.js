import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Note from './components/Note';

const App = props => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);

  const hook = () => {
    console.log('effect');

    const eventHandler = response => {
      console.log('promise fullfilled');
      setNotes(response.data);
    }

    const promise = axios.get('http://localhost:3001/notes');
    promise.then(eventHandler);
  };
  useEffect(hook, []);

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true);

  const rows = () => notesToShow.map(note =>
    <Note
      key={note.id}
      note={note.content}
    />
  );

  const addNote = event => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1
    }

    axios
      .post('http://localhost:3001/notes', noteObject)
      .then(response => {
        setNotes(notes.concat(noteObject));
        setNewNote('');
      })

  }

  const handleNoteChange = event => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {rows()}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}  
        />
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default App;
