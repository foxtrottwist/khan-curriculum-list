import React from 'react';
import styled from 'styled-components';

const Button = styled.a`
  background: ${({ selected, item }) => (selected === item ? '#4CAF50' : '#fff')};
  border: 0.2em solid #c4f0c0;
  border-radius: 35%;
  color: black;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 0.9em;
  cursor: pointer;
  margin: 1%;
  padding: 0.5%;
  height: 2em;
  width: 10em;
  border-radius: 2%;
`;

const Subjects = ({ subjects, onSelect, selectedSubject }) => (
  <div>
    {subjects.map((subject, index) => (
      <Button
        key={index}
        selected={selectedSubject}
        item={subject}
        onClick={onSelect.bind(null, subject)}
      >
        {subject}
      </Button>
    ))}
  </div>
);

export default Subjects;
