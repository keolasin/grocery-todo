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
  background: ${props => props.theme.background};
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 0.5fr 1fr repeat(2, 3fr) repeat(2, 0.5fr);
  grid-template-rows: 0.5fr repeat(2, 0.5fr) 3fr 1fr 0.5fr;
  grid-template-areas:
    ". . . . . ."
    ". nav nav nav toggle ."
    ". nav nav nav . ."
    ". aside main main main ."
    ". . footer footer . .";
    ". . . . . ."
  font-family: "Roboto";
  h1 {
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