import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Carlos Azaustre', number: '12-34-56789' },
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [showAll, setShowAll] = useState(true);

  const contactsToShow = showAll
    ? persons
    : persons.filter(person => {
        let toFilter = person.name.toLocaleLowerCase();
        let toSearch = searchName.toLowerCase()
        return toFilter.includes(toSearch);
      });

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

  const handleSearchName = event => {
    setSearchName(event.target.value);
    setShowAll(false);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <p>Filter show with <input onChange={handleSearchName} /></p>
      {
        !showAll
          ? <button onClick={() => setShowAll(!showAll)}>reset</button>
          : <></>
      }
      <h2>Add a new</h2>
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
      {contactsToShow.map(pers => (
        <p key={pers.name}>{pers.name} {pers.number}</p>
      ))}
    </div>
  );
}

export default App;