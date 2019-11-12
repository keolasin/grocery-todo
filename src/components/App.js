import React from 'react';
import { Switch, Route } from 'react-router-dom';
import '../styles/App.css';

// components
import GroupList from './GroupList';
import Welcome from './Welcome';
import Navbar from './Navbar';
import Login from './Login';
import FoodList from './FoodList';

function App() {
  return (
    <div className="App">
      <Navbar />
      <aside>
        <GroupList />
      </aside>
      <Switch>
        <Route exact path='/' component={Welcome} />
        <Route path='/login' component={Login} />
        <Route path='/groups/:group' component={FoodList} />
      </Switch>
    </div>
  );
}

export default App;