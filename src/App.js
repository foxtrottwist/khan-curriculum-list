import React, { Component } from 'react'
import styled from 'styled-components'

import { loadState, saveState } from './services/storage'
import { get } from './services/api'

import List from './components/List'
import Browser from './components/Browser'

const SUBJECTS = [
  'Math',
  'Science',
  'Computing',
  'Arts and Humanities',
  'Economics and Finance',
]
const SUBJECT_RESOURCES = [
  'math',
  'science',
  'computing',
  'humanities',
  'economics-finance-domain',
]

const CurriculumWrapper = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`
const BrowserBox = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 50rem;
  margin-bottom: 2em;
`

export default class App extends Component {
  state = {
    selectedSubject: '',
    topics: null,
    selectedTopic: '',
    courses: null,
    curriculumList: loadState(),
  }

  selectTopic = topic => {
    this.setState(
      {
        selectedTopic: topic,
        course: null,
      },
      () => {
        get(topic)
          .then(response =>
            this.setState({
              courses: response.data.children,
            }),
          )
          .catch(error => console.log(error))
      },
    )
  }

  selectSubject = subject => {
    this.setState(
      {
        selectedSubject: subject,
        topics: null,
        courses: null,
      },
      () => {
        get(SUBJECT_RESOURCES[SUBJECTS.indexOf(subject)])
          .then(response =>
            this.setState({
              topics: response.data.children,
            }),
          )
          .catch(error => console.log(error))
      },
    )
  }

  addCourse = course => {
    this.setState(
      ({ curriculumList }) => {
        const curriculum = !curriculumList
          ? [course]
          : [...new Set([...curriculumList, course])] // Array deduplication
        return {
          selectedCourse: course.standalone_title,
          curriculumList: curriculum,
        }
      },
      () => {
        saveState(this.state.curriculumList)
      },
    )
  }

  removeCourse = course => {
    this.setState(
      ({ curriculumList }) => {
        const curriculum =
          curriculumList.length === 1
            ? null
            : curriculumList.filter(element => element !== course)
        return {
          curriculumList: curriculum,
        }
      },
      () => {
        localStorage.setItem(
          'curriculumList',
          JSON.stringify(this.state.curriculumList),
        )
      },
    )
  }

  render() {
    return (
      <>
        <Title />
        <Header />
        <CurriculumWrapper>
          <List
            curriculumList={this.state.curriculumList}
            onRemoval={this.removeCourse}
          />
          <BrowserBox>
            <Subjects
              subjects={SUBJECTS}
              selectedSubject={this.state.selectedSubject}
              onSelectSubject={this.selectSubject}
            />
            <Browser
              selectedSubject={this.state.selectedSubject}
              topics={this.state.topics}
              onSelectTopic={this.selectTopic}
              selectedTopic={this.state.selectedTopic}
              courses={this.state.courses}
              onAdd={this.addCourse}
            />
          </BrowserBox>
        </CurriculumWrapper>
      </>
    )
  }
}

const TitleHeader = styled.h4`
  margin: 0.2rem;
  color: #4caf50;
`

const TitleWrapper = styled.div`
  background-color: #fcfcfc;
  height: 1.75rem;
  border-bottom: 4px solid #d1fad7;
  padding: 0.4rem 0 0 0.5rem;
`

function Title() {
  return (
    <TitleWrapper>
      <TitleHeader>Khan Curriculum List</TitleHeader>
    </TitleWrapper>
  )
}

const HeaderWrapper = styled.header`
  background-color: #4caf50;
  height: 8rem;
  padding: 0.3%;
  color: #d1fad7;
  margin-bottom: 0.5%;
  box-shadow: 0px 1px 6px #ccc;
`

const HeaderHeading = styled.h2`
  text-align: center;
  margin-top: 2.5rem;
`

function Header() {
  return (
    <HeaderWrapper>
      <HeaderHeading>What Would You Like to Learn Today?</HeaderHeading>
    </HeaderWrapper>
  )
}

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
    <>
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
    </>
  )
}
