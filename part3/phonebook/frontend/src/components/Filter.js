import React from 'react';

const Filter = ({ onChangeHandler}) => (
  <p>
    Filter show with
    <input onChange={onChangeHandler} />
  </p>
);

export default Filter;