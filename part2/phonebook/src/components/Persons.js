import React from 'react';

const Persons = ({ persons }) => ( 
  <>
    {persons.map(pers => (
      <p key={pers.name}>{pers.name} {pers.number}</p>
    ))}
  </>
);

export default Persons;