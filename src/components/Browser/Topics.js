import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: ${({ selected, item }) => (selected === item ? '#4CAF50' : '#fff')};
  border: 0.2em solid #c4f0c0;
  border-radius: 3px;
  color: black;
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

const Topics = ({
  selectedSubject, topics, onBrowse, selectedTopic,
}) => {
  if (selectedSubject === 'Math') {
    return (
      <BrowserBox>
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
              type="button"
              height="4.5em"
              key={topic.internal_id}
              item={topic.node_slug}
              selected={selectedTopic}
              onClick={onBrowse.bind(null, topic.node_slug)}
            >
              <p>{topic.standalone_title}</p>
            </Button>
          ))}
      </BrowserBox>
    );
  }
  return (
    <BrowserBox>
      {topics.map(topic => (
        <Button
          type="button"
          height="4.5em"
          key={topic.internal_id}
          item={topic.node_slug}
          selected={selectedTopic}
          onClick={onBrowse.bind(null, topic.node_slug)}
        >
          <span>{topic.standalone_title}</span>
        </Button>
      ))}
    </BrowserBox>
  );
};

export default Topics;
