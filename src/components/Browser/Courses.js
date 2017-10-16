import React from 'react';
import styled from 'styled-components';

const Button = styled.a`
  background: #fff;
  border: 0.2em solid #c4f0c0;
  border-radius: 35%;
  color: black;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 0.9em;
  cursor: pointer;
  margin: 1%;
  padding: 0.5%;
  height: 2em;
  width: 10em;
  border-radius: 2%;

  :hover {
    transform: scale(1.1);
  }

  :active {
    transform: scale(1.2);
    background-color: #349046;
  }
`;

const Courses = ({ courses, onAdd }) => (
  <div>
    {courses.map(course => (
      <Button key={course.internal_id} onClick={onAdd.bind(null, course)}>
        {course.standalone_title}
      </Button>
    ))}
  </div>
);

export default Courses;
