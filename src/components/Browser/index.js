import React from 'react';
import styled from 'styled-components';

import Subjects from './Subjects';
import Topics from './Topics';
import Courses from './Courses';

const BrowserWrapper = styled.div`
  width: 66.66%;
  margin-top: 1.5em;
`;

const Browser = ({
  subjects,
  onSelect,
  selectedSubject,
  topics,
  onBrowse,
  selectedTopic,
  courses,
  onAdd,
}) => (
  <BrowserWrapper>
    <Subjects subjects={subjects} onSelect={onSelect} selectedSubject={selectedSubject} />
    {!topics ? null : (
      <Topics
        topics={topics}
        selectedTopic={selectedTopic}
        selectedSubject={selectedSubject}
        onBrowse={onBrowse}
      />
    )}
    {!courses ? null : <Courses courses={courses} onAdd={onAdd} />}
  </BrowserWrapper>
);

export default Browser;
