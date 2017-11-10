import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  background-color: #4caf50;
  height: 8rem;
  padding: 1%;
  color: #d1fad7;
  margin-bottom: 0.5%;
`;

const Heading = styled.h2`text-align: center;`;

const Header = () => (
  <HeaderWrapper>
    <Heading>What Do You Want to Learn Today?</Heading>
  </HeaderWrapper>
);

export default Header;
