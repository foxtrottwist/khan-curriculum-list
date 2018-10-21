import React from 'react'
import styled from 'styled-components'

const BrowserWrapper = styled.div`
  width: 66.66%;
  margin-top: 1.5em;
`

export default function Browser(props) {
  const {
    topics,
    onSelectTopic,
    selectedTopic,
    courses,
    addCourse,
    ...subjectProps
  } = props

  return (
    <BrowserWrapper>
      <Subjects {...subjectProps} />
      {!topics ? null : (
        <Topics
          topics={topics}
          selectedTopic={selectedTopic}
          onSelectTopic={onSelectTopic}
        />
      )}
      {!courses ? null : <Courses courses={courses} addCourse={addCourse} />}
    </BrowserWrapper>
  )
}

const SubjectWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 2em;
  border-bottom: 0.1em solid #4caf50;
`

const SubjectButton = styled.button`
  background: ${({ selected, item }) =>
    selected === item ? '#d1fad7' : '#fff'};
  border: 0.2em solid #4caf50;
  border-radius: 3px;
  color: #4caf50;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 0.9em;
  cursor: pointer;
  margin: 0.5em;
  padding: 0.25em 1em;
  height: ${props => (props.height ? props.height : '3.5em')};
  width: 10em;
  border-radius: 2%;
  box-shadow: 1.5px 1.5px 6px #ccc;

  span {
    margin: auto;
  }
`

function Subjects({ subjects, onSelectSubject, selectedSubject }) {
  return (
    <SubjectWrapper>
      {subjects.map((subject, index) => (
        <SubjectButton
          type="button"
          key={index}
          selected={selectedSubject}
          item={subject}
          onClick={() => onSelectSubject(subject)}
        >
          <span>{subject}</span>
        </SubjectButton>
      ))}
    </SubjectWrapper>
  )
}

const TopicsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 2em;
  border-bottom: 0.1em solid #4caf50;
`

const TopicsButton = styled.button`
  background: ${({ selected, item }) =>
    selected === item ? '#d1fad7' : '#fff'};
  border: 0.2em solid #4caf50;
  border-radius: 3px;
  color: #4caf50;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 0.9em;
  cursor: pointer;
  margin: 0.5em;
  padding: 0.25em 1em;
  height: ${props => (props.height ? props.height : '3.5em')};
  width: 10em;
  border-radius: 2%;
  box-shadow: 1.5px 1.5px 6px #ccc;

  span {
    margin: auto;
  }
`

function Topics({ topics, onSelectTopic, selectedTopic }) {
  return (
    <TopicsWrapper>
      {topics.map(topic => (
        <TopicsButton
          type="button"
          height="4.5em"
          key={topic.internal_id}
          item={topic.node_slug}
          selected={selectedTopic}
          onClick={() => onSelectTopic(topic.node_slug)}
        >
          <span>{topic.standalone_title}</span>
        </TopicsButton>
      ))}
    </TopicsWrapper>
  )
}

const CoursesWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 2em;
  border-bottom: 0.1em solid #4caf50;
`

const CoursesButton = styled.button`
  background: #fff;
  border: 0.2em solid #4caf50;
  border-radius: 35%;
  color: #4caf50;
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
  box-shadow: 1.5px 1.5px 6px #ccc;

  span {
    margin: auto;
  }

  :hover {
    transform: scale(1.1);
  }

  :active {
    transform: scale(1.2);
    background-color: #d1fad7;
  }
`

function Courses({ courses, addCourse }) {
  return (
    <CoursesWrapper>
      {courses.map(course => (
        <CoursesButton
          type="button"
          height="5.5em"
          key={course.internal_id}
          onClick={() => addCourse(course)}
        >
          <span>{course.standalone_title}</span>
        </CoursesButton>
      ))}
    </CoursesWrapper>
  )
}
