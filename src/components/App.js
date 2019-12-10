import React from 'react';
import { Switch, Route } from 'react-router-dom';

// components
import GroupList from './GroupList';
import Welcome from './Welcome';
import Navbar from './Navbar';
import Login from './Login';
import FoodList from './FoodList';
import ThemeToggler from './ThemeToggler';

// styling
import styled from '@emotion/styled';

const Wrapper = styled('div')`
  label: app-container;
  font-family: ${props => props.theme.fontFamily};
  font-size: ${props => props.theme.fontSizes.body};
  background: ${props => props.theme.background};
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 0.5fr 2fr repeat(2, 2fr) repeat(2, 0.5fr);
  grid-template-rows: 0.1fr repeat(2, 0.5fr) 3fr 1fr 0.1fr;
  grid-gap: 2px;
  grid-template-areas:
    ". . . . . ."
    ". nav nav nav toggle ."
    ". nav nav nav . ."
    ". aside main main main ."
    ". footer footer footer footer ."
    ". . . . . .";
  color: ${props => props.theme.text};
  place-items: stretch;
  h1,h2,h3,h4,h5,h6 {
    margin-block-start: 0px;
    margin-block-end: 0px;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
  h1 {
    font-size: ${props => props.theme.fontSizes.mainHeading};
  }
  h2 {
    font-size: ${props => props.theme.fontSizes.secondaryHeading};
  }
  a {
    text-decoration: none;
    color: ${props => props.theme.text};
    cursor: pointer;
  }
  a:visited {
    text-decoration: none;
  }
  a:hover {
    color: ${props => props.theme.hover};
  }
  a:focus {
    outline: 1px solid ${props => props.theme.body};
    background-color: ${props => props.theme.focus};
  }
  a:active {
    color: ${props => props.theme.active};
  }
  input {
    padding: 5px 10px;
    margin: 0px 10px;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.body};
  }
`;

function App() {
  return (
      <Wrapper>
        <Navbar />
        <ThemeToggler />
        <GroupList />
        <Switch>
          <Route exact path='/' component={Welcome} />
          <Route path='/login' component={Login} />
          <Route path='/groups/:group' component={FoodList} />
        </Switch>
      </Wrapper>
  );
}

export default App;