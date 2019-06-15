import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Carlos Azaustre'}
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

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
      setPersons(persons.concat({ name: newName, number: newNumber }));
    }
    setNewName('');
    setNewNumber('')
  }
  
  const handleContactChange = event => {
    setNewName(event.target.value);
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
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
          number:
          <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(pers => (
        <p key={pers.name}>{pers.name} {pers.number}</p>
      ))}
    </div>
  );
}

export default App;