import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  );
}

const Footer = () => {
  return (
    <div>
      Greeting app created by
      <a href="https://github.com/carlosazaustre">@carlosazaustre</a>
    </div>
  );
}

const App = () => {
  return (
    <>
      <h1>Greetings</h1>
      <Hello name='Carlos' age='34' />
      <Footer />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
