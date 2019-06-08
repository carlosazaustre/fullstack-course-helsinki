import React from 'react'

const Content = (props) => {
  return (
    <>
      {props.content.map(ex => (
        <p key={ex[0]}>{ex[0]} {ex[1]}</p>
      ))}
    </>
  );
}

export default Content;