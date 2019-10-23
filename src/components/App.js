import React from 'react';
import { Switch, Route } from 'react-router-dom';
import '../styles/App.css';

// components
import Navbar from './Navbar';
import FoodList from './FoodList';
import CreateFood from './CreateFood';
import Login from './Login';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path='/' component={FoodList}/>
        <Route exact path='/create' component={CreateFood}/>
        <Route exact path='/Login' component={Login}/>
      </Switch>
    </div>
  );
}

export default App;