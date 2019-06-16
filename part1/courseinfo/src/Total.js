import React from 'react'

const Total = (props) => {
  const total = props.parts
    .map(part => part.exercises)
    .reduce((acc, curr) => acc + curr);

  return (
    <p>Number of exercises {total}</p>
  );
}

export default Total;