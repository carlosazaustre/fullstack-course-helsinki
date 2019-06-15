import React from 'react';
import ReactDOM from 'react-dom';

const Course = ({ course }) => {
  const total = course.parts.reduce((a, b) =>
    ({exercises: a.exercises + b.exercises}));

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <strong>Total of {total.exercises} exercises</strong>
    </div>
  );
};

const Header = ({ course }) => <h1>{course}</h1>;

const Content = ({ parts }) => (
  <>
    {parts.map(part => (
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    ))}
  </>
);

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>;

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course => <Course course={course} />)}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
