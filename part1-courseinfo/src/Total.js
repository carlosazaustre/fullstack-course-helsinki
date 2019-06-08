import React from 'react'

const Total = (props) => {
  const total = props.total.reduce((acum, current) => acum + current);

  return (
    <p>Number of exercises {total}</p>
  );
}

export default Total;