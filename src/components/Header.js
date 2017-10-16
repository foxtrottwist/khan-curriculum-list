import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  background-color: #4caf50;
  height: 5%;
  padding: 1%;
  color: white;
`;

const Heading = styled.h2`text-align: center;`;

const Header = () => (
  <HeaderWrapper>
    <Heading>What Do You Want to Learn Today?</Heading>
  </HeaderWrapper>
);

export default Header;
