import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: #fff;
  border: 0.2em solid #c4f0c0;
  border-radius: 35%;
  color: black;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 0.9em;
  cursor: pointer;
  margin: 0.5em;
  padding: 0.25em 1em;
  height: ${props => (props.height ? props.height : '3.5em')};
  height: 5.5em;
  width: 10em;
  border-radius: 2%;

  span {
    margin: auto;
  }

  :hover {
    transform: scale(1.1);
  }

  :active {
    transform: scale(1.2);
    background-color: #349046;
  }
`;

const BrowserBox = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 2em;
  border-bottom: 0.1em solid #4caf50;
`;

const Courses = ({ courses, onAdd }) => (
  <BrowserBox>
    {courses.map(course => (
      <Button
        type="button"
        height="5.5em"
        key={course.internal_id}
        onClick={onAdd.bind(null, course)}
      >
        <span>{course.standalone_title}</span>
      </Button>
    ))}
  </BrowserBox>
);

export default Courses;
