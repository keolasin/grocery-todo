import React from 'react';
import { Switch, Route } from 'react-router-dom';
import '../styles/App.css';

// components
import Dashboard from '../views/Dashboard';
import Navbar from './Navbar';
import Login from './Login';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route path='/login' component={Login} />
      </Switch>
    </div>
  );
}

export default App;