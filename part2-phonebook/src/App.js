import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Carlos Azaustre'}
  ]);
  const [newName, setNewName] = useState('');

  const _isAdded = (name, data) => {
    let isAdded = data.find(el => el.name === name);
    if (isAdded === undefined) {
      return false;
    }
    return true;
  } 

  const addContact = event => {
    event.preventDefault();
    if (_isAdded(newName, persons)) {
      alert(`${newName} is already added to phonebook`);
    }
    else {
      setPersons(persons.concat({ name: newName }));
    }
    setNewName('');
  }
  
  const handleContactChange = event => {
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name:
          <input 
            value={newName}
            onChange={handleContactChange}
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(pers => (
        <p key={pers.name}>{pers.name}</p>
      ))}
    </div>
  );
}

export default App;