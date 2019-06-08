import React from 'react'
import Part from './Part';

const Content = (props) => {
  return (
    <>
      <Part part={props.content[0][0]} exercises={props.content[0][1]} />
      <Part part={props.content[1][0]} exercises={props.content[1][1]} />
      <Part part={props.content[2][0]} exercises={props.content[2][1]} />
    </>
  );
}

export default Content;