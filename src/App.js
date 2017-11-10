import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Header from './components/Header';
import List from './components/List';
import Browser from './components/Browser';
import { BASE_URL, SUBJECTS, RESOURCES } from './utils/constants';

const CurriculumWrapper = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSubject: '',
      topics: null,
      selectedTopic: '',
      courses: null,
      // eslint-disable-next-line
      curriculumList: JSON.parse(localStorage.getItem('curriculumList')) || null,
    };

    this.updateSubject = this.updateSubject.bind(this);
    this.browseKhan = this.browseKhan.bind(this);
    this.addCourse = this.addCourse.bind(this);
    this.removeCourse = this.removeCourse.bind(this);
  }

  getKhanTopics(endPoint) {
    // Checks the index of the selected subject in the SUBJECT array
    const resourceIndex = SUBJECTS.indexOf(endPoint);

    // Then uses the retured index value stored in resourceIndex,
    // to access the proper value in the RESOURCE array
    axios
      .get(BASE_URL + RESOURCES[resourceIndex])
      .then((response) => {
        this.setState(() => ({
          topics: response.data.children,
        }));
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
  }

  getKhanCourses(endPoint) {
    axios
      .get(BASE_URL + endPoint)
      .then((response) => {
        this.setState(() => ({
          courses: response.data.children,
        }));
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
  }

  browseKhan(topic) {
    this.setState(() => ({
      selectedTopic: topic,
      course: null,
    }));

    this.getKhanCourses(topic);
  }

  updateSubject(subject) {
    this.setState(() => ({
      selectedSubject: subject,
      topics: null,
      courses: null,
    }));

    this.getKhanTopics(subject);
  }

  addCourse(course) {
    this.setState(
      () => {
        const curriculum = !this.state.curriculumList
          ? [course]
          : this.state.curriculumList.filter(element => element !== course).concat([course]);
        return {
          selectedCourse: course.standalone_title,
          curriculumList: curriculum,
        };
      },
      () => {
        // eslint-disable-next-line
        localStorage.setItem('curriculumList', JSON.stringify(this.state.curriculumList));
      },
    );
  }

  removeCourse(course) {
    this.setState(
      () => {
        const curriculum =
          this.state.curriculumList.length === 1
            ? null
            : this.state.curriculumList.filter(element => element !== course);
        return {
          curriculumList: curriculum,
        };
      },
      () => {
        // eslint-disable-next-line
        localStorage.setItem('curriculumList', JSON.stringify(this.state.curriculumList));
      },
    );
  }

  render() {
    return (
      <div>
        <Header />
        <CurriculumWrapper>
          <List curriculumList={this.state.curriculumList} onRemoval={this.removeCourse} />
          <Browser
            subjects={SUBJECTS}
            selectedSubject={this.state.selectedSubject}
            onSelect={this.updateSubject}
            topics={this.state.topics}
            onBrowse={this.browseKhan}
            selectedTopic={this.state.selectedTopic}
            courses={this.state.courses}
            onAdd={this.addCourse}
          />
        </CurriculumWrapper>
      </div>
    );
  }
}

export default App;
