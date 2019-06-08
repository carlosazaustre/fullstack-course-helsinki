import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Display from './Display';
import Button from './Button';

const App = (props) => {
  const [ counter, setCounter ] = useState(0);
  const setToValue = (value) => () => setCounter(value);

  return (
    <div>
      <Display counter={counter}/>
      <Button
        handleClick={setToValue(counter + 1)}
        text='plus'
      />
      <Button
        handleClick={setToValue(counter - 1)}
        text='minus'
      />
      <Button
        handleClick={setToValue(0)}
        text='zero'
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
