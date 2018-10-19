import React from 'react'
import styled from 'styled-components'

const BrowserWrapper = styled.div`
  width: 66.66%;
  margin-top: 1.5em;
`

export default function Browser(props) {
  const {
    selectedSubject,
    topics,
    onSelectTopic,
    selectedTopic,
    courses,
    onAdd,
  } = props

  return (
    <BrowserWrapper>
      {!topics ? null : (
        <Topics
          topics={topics}
          selectedTopic={selectedTopic}
          selectedSubject={selectedSubject} // selectedSubject passed to filter math topic results
          onSelectTopic={onSelectTopic}
        />
      )}
      {!courses ? null : <Courses courses={courses} onAdd={onAdd} />}
    </BrowserWrapper>
  )
}

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

const TopicsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 2em;
  border-bottom: 0.1em solid #4caf50;
`

function Topics({ selectedSubject, topics, onSelectTopic, selectedTopic }) {
  if (selectedSubject === 'Math') {
    return (
      <TopicsWrapper>
        {topics
          .filter(title => {
            const topic = title.standalone_title
            return (
              topic === '1st grade' ||
              topic === '2nd grade' ||
              topic === '3rd grade' ||
              topic === '4th grade' ||
              topic === '5th grade' ||
              topic === '6th grade' ||
              topic === '7th grade' ||
              topic === '8th grade'
            )
          })
          .map(topic => (
            <TopicsButton
              type="button"
              height="4.5em"
              key={topic.internal_id}
              item={topic.node_slug}
              selected={selectedTopic}
              onClick={() => onSelectTopic(topic.node_slug)}
            >
              <p>{topic.standalone_title}</p>
            </TopicsButton>
          ))}
      </TopicsWrapper>
    )
  }
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

const CoursesWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 2em;
  border-bottom: 0.1em solid #4caf50;
`

function Courses({ courses, onAdd }) {
  return (
    <CoursesWrapper>
      {courses.map(course => (
        <CoursesButton
          type="button"
          height="5.5em"
          key={course.internal_id}
          onClick={() => onAdd(course)}
        >
          <span>{course.standalone_title}</span>
        </CoursesButton>
      ))}
    </CoursesWrapper>
  )
}
