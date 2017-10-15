import React from 'react';
import Header from './components/Header';
import List from './components/List';
import Browser from './components/Browser';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
`;

const App = () => (
  <Wrapper>
    <Header />
    <List />
    <Browser />
  </Wrapper>
);

export default App;
