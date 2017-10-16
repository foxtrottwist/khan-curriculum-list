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

const Topics = ({
  selectedSubject, topics, onBrowse, selectedTopic,
}) => {
  if (selectedSubject === 'Math') {
    return (
      <div>
        {topics
          .filter((title) => {
            const topic = title.standalone_title;
            return (
              topic === '1st grade' ||
              topic === '2nd grade' ||
              topic === '3rd grade' ||
              topic === '4th grade' ||
              topic === '5th grade' ||
              topic === '6th grade' ||
              topic === '7th grade' ||
              topic === '8th grade'
            );
          })
          .map(topic => (
            <Button
              key={topic.internal_id}
              item={topic.node_slug}
              selected={selectedTopic}
              onClick={onBrowse.bind(null, topic.node_slug)}
            >
              {topic.standalone_title}
            </Button>
          ))}
      </div>
    );
  }
  return (
    <div>
      {topics.map(topic => (
        <Button
          key={topic.internal_id}
          item={topic.node_slug}
          selected={selectedTopic}
          onClick={onBrowse.bind(null, topic.node_slug)}
        >
          {topic.standalone_title}
        </Button>
      ))}
    </div>
  );
};

export default Topics;
