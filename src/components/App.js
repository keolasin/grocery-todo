import React from 'react';
import { Switch, Route } from 'react-router-dom';
import '../styles/App.css';

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
  background: ${props => props.theme.background};
  width: 100vw;
  height: 100vh;
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
        <aside>
          <GroupList />
        </aside>
        <Switch>
          <Route exact path='/' component={Welcome} />
          <Route path='/login' component={Login} />
          <Route path='/groups/:group' component={FoodList} />
        </Switch>
      </Wrapper>
  );
}

export default App;