import React from 'react';

const Header = ({ course }) => <h1>{course}</h1>;

const Content = ({ parts }) => (
  <>
    {parts.map(part => (
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    ))}
  </>
);

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>;

const Course = ({ course }) => {
  const total = course.parts.reduce((a, b) =>
    ({exercises: a.exercises + b.exercises}));

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <strong>Total of {total.exercises} exercises</strong>
    </>
  );
};

export default Course;