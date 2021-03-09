import './App.css';
import ComplaintForm from './ComplaintForm.js'
import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Login from './components/Login/Login';
import AuthLogin from './components/AuthLogin/AuthLogin';

class App extends Component {
  render(){
    return (
      <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/admin" component={AuthLogin}></Route>
        <Route path="/" render={() => (<Redirect to="/login" />)} />
      </Switch>
      </BrowserRouter>
    );
  }
}

export default App;