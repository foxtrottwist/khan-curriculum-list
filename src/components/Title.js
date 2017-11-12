import React from 'react';
import styled from 'styled-components';

const Heading = styled.h4`
  margin: 0.2rem;
  color: #4caf50;
`;

const TitleBox = styled.div`
  background-color: #fcfcfc;
  height: 1.75rem;
  border-bottom: 4px solid #d1fad7;
  padding: 0.4rem 0 0 0.5rem;
`;

const Title = () => (
  <TitleBox>
    <Heading>Khan Curriculum List</Heading>
  </TitleBox>
);

export default Title;
