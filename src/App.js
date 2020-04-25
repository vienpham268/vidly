import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import Movies from './components/movies'
import Customers from './components/customers';
import NotFound from './components/notFound';
import Rentals from './components/rentals';
import NavBar from './components/commons/navBar'
import MovieForm from './components/movieForm';
import './App.css';


class App extends Component {
  state = {}
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className='container'>
          <Switch>
            <Route path="/movies/:id" component={MovieForm}></Route>
            <Route path="/movies" component={Movies}></Route>
            <Route path="/customers" exact component={Customers}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Route path="/rentals" exact component={Rentals}></Route>
            <Redirect from="/" exact to="/movies"></Redirect>
            <Redirect to="/not-found"></Redirect>
          </Switch>

        </main>

      </React.Fragment>

    );
  }
}

export default App;

