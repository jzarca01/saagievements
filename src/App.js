import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Achievements } from './pages/Achievements';
import { NewAchievement } from './pages/NewAchievement';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Achievements />
          </Route>
          <Route exact path="/new-achievement">
            <NewAchievement />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
