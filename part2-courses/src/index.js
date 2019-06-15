import React from 'react';
import ReactDOM from 'react-dom';

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
  </div>
);

const Header = ({ course }) => <h1>{course}</h1>;

const Content = ({ parts }) => (
  <>
    {parts.map(part => (
      <Part name={part.name} exercises={part.exercises} />
    ))}
  </>
);

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>;

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  };

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
