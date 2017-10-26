import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: ${({ selected, item }) => (selected === item ? '#c4f0c0' : '#fff')};
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

  span {
    margin: auto;
  }
`;

const BrowserBox = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 2em;
  border-bottom: 0.1em solid #4caf50;
`;

const Subjects = ({ subjects, onSelect, selectedSubject }) => (
  <BrowserBox>
    {subjects.map((subject, index) => (
      <Button
        type="button"
        key={index}
        selected={selectedSubject}
        item={subject}
        onClick={onSelect.bind(null, subject)}
      >
        <span>{subject}</span>
      </Button>
    ))}
  </BrowserBox>
);

export default Subjects;
