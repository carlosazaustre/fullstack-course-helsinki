import React, { useState, useEffect } from 'react';

import personService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, []);

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
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    personService
      .create(personObject)
      .then(returnedNote => {
        if (_isAdded(newName, persons)) {
          alert(`${newName} is already added to phonebook`);
        }
        else {
          setPersons(persons.concat({ name: newName, number: newNumber }));
        }
        setNewName('');
        setNewNumber('');
      })
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
      <Filter onChangeHandler={handleSearchName} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmitHandler={addContact}
        newName={newName}
        onChangeNameHandler={handleContactChange}
        newNumber={newNumber}
        onChangeNumberHandler={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={contactsToShow} />
    </div>
  );
}

export default App;