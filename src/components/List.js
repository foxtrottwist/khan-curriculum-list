import React from 'react'
import styled from 'styled-components'

const ListBox = styled.div`
  color: #4caf50;
  border: 0.1em solid #4caf50;
  margin-top: 1.5em;
  width: 25%;
  max-height: 400px;
  min-height: 400px;
  heigth: 100%;
  overflow: auto;
  padding: 0.3%;
  border-radius: 2%;
  background-color: #fff;
  box-shadow: 2px 3px 6px #ccc;
`

const ListHeading = styled.h3`
  text-align: center;
`

export default function List({ curriculumList, onRemoval }) {
  return (
    <ListBox>
      <ListHeading>Lesson Plan</ListHeading>
      {!curriculumList ? null : (
        <Course courses={curriculumList} onRemoval={onRemoval} />
      )}
    </ListBox>
  )
}

const CourseListing = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const CourseItem = styled.li`
  text-align: left;
  margin-left: 5%;
  margin-top: 3%;
`

const CourseAction = styled.li`
  font-size: 0.9em;
  cursor: pointer;
  padding: 1%;

  :hover {
    color: #349046;
  }
`

const CourseLink = styled.a`
  text-decoration: none;
  color: #4caf50;

  :hover {
    color: #349046;
  }
`

function Course({ courses, onRemoval }) {
  return (
    <CourseListing>
      {courses.map(course => (
        <CourseItem key={course.internal_id}>
          {course.standalone_title}
          <ul style={{ listStyle: 'none' }}>
            <CourseAction>
              <CourseLink
                href={course.url}
                rel="noreferrer noopener"
                target="_blank"
              >
                Go to course &rarr;
              </CourseLink>
            </CourseAction>
            <CourseAction onClick={() => onRemoval(course)}>
              Remove course
            </CourseAction>
          </ul>
        </CourseItem>
      ))}
    </CourseListing>
  )
}
