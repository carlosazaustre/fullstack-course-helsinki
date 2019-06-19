import React from 'react';

const Persons = ({ persons, onDelete }) => (  
  <>
    {persons.map(pers => (
      <p key={pers.id}>
        {pers.name} {pers.number}
        <button onClick={() => onDelete(pers.id)}>delete</button>
      </p>
    ))}
  </>
);

export default Persons;