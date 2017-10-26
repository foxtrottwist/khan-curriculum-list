import React from 'react';
import styled from 'styled-components';

import Course from './Course';

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
`;

const Heading = styled.h3`text-align: center;`;

const List = ({ curriculumList, onRemoval }) => (
  <ListBox>
    <Heading>Lesson Plan</Heading>
    {!curriculumList ? null : <Course courses={curriculumList} onRemoval={onRemoval} />}
  </ListBox>
);

export default List;
