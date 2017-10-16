import React from 'react';
import Course from './Course';
import styled from 'styled-components';

const ListBox = styled.div`
  background-color: #c4f0c0;
  margin-top: 1.5em;
  width: 25%;
  max-height: 400px;
  min-height: 400px;
  heigth: 100%;
  border: solid black;
  overflow: auto;
  padding: 0.3%;

  > p {
    font-size: 0.9em;
    text-align: center;
  }
`;

const Heading = styled.h3`text-align: center;`;

const List = ({ curriculumList, onRemoval }) => (
  <ListBox>
    <Heading>Lesson Plan</Heading>
    {!curriculumList ? null : <Course courses={curriculumList} onRemoval={onRemoval} />}
  </ListBox>
);

export default List;
