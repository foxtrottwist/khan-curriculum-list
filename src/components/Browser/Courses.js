import React from 'react';
import styled from 'styled-components';

const Button = styled.div`
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
  height: 3.25em;
  width: 10em;
  overflow: hidden;
  border-radius: 2%;

  p {
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
`;

const Courses = ({ courses, onAdd }) => (
  <BrowserBox>
    {courses.map(course => (
      <Button key={course.internal_id} onClick={onAdd.bind(null, course)}>
        <p>{course.standalone_title}</p>
      </Button>
    ))}
  </BrowserBox>
);

export default Courses;
