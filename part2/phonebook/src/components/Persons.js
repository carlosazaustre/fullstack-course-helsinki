import React from 'react';

const Persons = ({ persons, onDelete }) => {
  function confirmDelete(id, name) {
    if(window.confirm(`Delete ${name}?`)) {
      onDelete(id);
    }
    return;
  }

  return(
    <>
      {persons.map(pers => (
        <p key={pers.id}>
          {pers.name} {pers.number}
          <button onClick={() => confirmDelete(pers.id, pers.name)}>delete</button>
        </p>
      ))}
    </>
  );
}
export default Persons;