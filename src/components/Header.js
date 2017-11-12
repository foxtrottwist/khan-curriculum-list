import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  background-color: #4caf50;
  height: 8rem;
  padding: 0.3%;
  color: #d1fad7;
  margin-bottom: 0.5%;
  box-shadow: 0px 1px 6px #ccc;
`;

const Heading = styled.h2`
  text-align: center;
  margin-top: 2.5rem;
`;

const Header = () => (
  <HeaderWrapper>
    <Heading>What Would You Like to Learn Today?</Heading>
  </HeaderWrapper>
);

export default Header;
