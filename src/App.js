import React from 'react'
import ReactDOM from 'react-dom'
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
  margin: 0 3rem;
  max-width: 1200px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`

const ModalBox = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background: #fff;
  border: 0.2em solid #4caf50;
  border-radius: 1%;
  box-shadow: 1.5px 1.5px 6px #ccc;
`

const ModalContent = styled.div`
  display: flex;
  align-items: center;
  height: 20rem;
  width: 40rem;
  padding: 1rem;
  overflow: auto;
`

const ModalButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
  width: 20rem;
  margin: auto;
`
const Button = styled.button`
  background: #fff;
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

  :active {
    transform: scale(1.2);
    background-color: #d1fad7;
  }
`

export default class App extends React.Component {
  state = {
    selectedSubject: '',
    topics: null,
    selectedTopic: '',
    courses: null,
    selectedCourse: null,
    isOpen: false,
    curriculumList: loadState(),
  }

  onSelectTopic = topic => {
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

  onSelectSubject = subject => {
    this.setState(
      {
        selectedSubject: subject,
        topics: null,
        courses: null,
      },
      async () => {
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

  modalRef = React.createRef()

  onSelectCourse = course => {
    this.setState(
      ({ isOpen }) => ({ selectedCourse: course, isOpen: !isOpen }),
      () => this.modalRef.current.focus(),
    )
  }

  handleOutsideClick = ({ target }) => {
    if (this.state.isOpen && !this.modalRef.current.contains(target)) {
      this.setState(({ isOpen }) => ({ isOpen: !isOpen }))
    }
  }

  handleClose = () =>
    this.setState(({ isOpen }) => ({ isOpen: !isOpen, selectedCourse: null }))

  addCourse = course => {
    this.setState(
      ({ curriculumList, isOpen }) => {
        const curriculum = !curriculumList
          ? [course]
          : [...new Set([...curriculumList, course])] // Array deduplication
        return {
          curriculumList: curriculum,
          isOpen: !isOpen,
          selectedCourse: null,
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
      () => saveState(this.state.curriculumList),
    )
  }

  render() {
    const { curriculumList, isOpen, selectedCourse, ...rest } = this.state
    return (
      <>
        <Title />
        <Header />
        <CurriculumWrapper>
          <List
            curriculumList={curriculumList}
            removeCourse={this.removeCourse}
          />
          <Browser
            subjects={SUBJECTS}
            onSelectSubject={this.onSelectSubject}
            onSelectTopic={this.onSelectTopic}
            addCourse={this.onSelectCourse}
            {...rest}
          />
        </CurriculumWrapper>
        {isOpen ? (
          <Modal handleOutsideClick={this.handleOutsideClick}>
            {() => {
              const { title, description, icon } = selectedCourse
              return (
                <ModalBox ref={this.modalRef}>
                  <ModalContent>
                    <div>
                      <img alt="course icon" src={icon} />
                    </div>
                    <div>
                      <h4>{title}</h4>
                      <p>{description}</p>
                    </div>
                  </ModalContent>
                  <ModalButtonBox>
                    <Button
                      type="button"
                      onClick={() => this.addCourse(selectedCourse)}
                    >
                      Add
                    </Button>
                    <Button type="button" onClick={this.handleClose}>
                      Cancel
                    </Button>
                  </ModalButtonBox>
                </ModalBox>
              )
            }}
          </Modal>
        ) : null}
      </>
    )
  }
}

const TitleWrapper = styled.div`
  background-color: #fcfcfc;
  height: 1.75rem;
  border-bottom: 4px solid #d1fad7;
  padding: 0.4rem 0 0 0.5rem;

  h4 {
    font-weight: 400;
    margin: 0.2rem;
    color: #4caf50;
  }
`

function Title() {
  return (
    <TitleWrapper>
      <h4>Khan Curriculum List</h4>
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

  h1 {
    font-weight: 400;
    text-align: center;
    margin-top: 2.5rem;
  }
`

function Header() {
  return (
    <HeaderWrapper>
      <h1>What Would You Like to Learn Today?</h1>
    </HeaderWrapper>
  )
}

const modalRoot = document.getElementById('modal-root')

class Modal extends React.Component {
  element = document.createElement('div')

  handleModalEvent = event => {
    this.props.handleOutsideClick(event)
  }

  componentDidMount() {
    modalRoot.appendChild(this.element)
    document.addEventListener('click', this.handleModalEvent)
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.element)
    document.removeEventListener('click', this.handleModalEvent)
  }

  render() {
    return ReactDOM.createPortal(this.props.children(), this.element)
  }
}
