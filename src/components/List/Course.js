import React from 'react';
import styled from 'styled-components';

const AList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const CourseItem = styled.li`
  text-align: left;
  margin-left: 5%;
  margin-top: 3%;
`;

const CourseAction = styled.li`
  font-size: 0.9em;
  cursor: pointer;
  padding: 1%;

  :hover {
    color: #349046;
  }
`;

const CourseLink = styled.a`
  text-decoration: none;
  color: black;

  :hover {
    color: #349046;
  }
`;

const Course = ({ courses, onRemoval }) => (
  <AList>
    {courses.map(course => (
      <CourseItem key={course.internal_id}>
        {course.standalone_title}
        <ul style={{ listStyle: 'none' }}>
          <CourseAction>
            <CourseLink href={course.url} rel="noreferrer noopener" target="_blank">
              Go to course &rarr;
            </CourseLink>
          </CourseAction>
          <CourseAction onClick={onRemoval.bind(null, course)}>Remove course</CourseAction>
        </ul>
      </CourseItem>
    ))}
  </AList>
);

export default Course;
