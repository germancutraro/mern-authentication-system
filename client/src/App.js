import React, { Component } from 'react';
import Routes from './Routes/Routes';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import store from './store';

if (localStorage.getItem('jwtToken')) {
  setAuthToken(localStorage.getItem('jwtToken'));
  const userDecoded = jwt_decode(localStorage.getItem('jwtToken'));
  store.dispatch(setCurrentUser(userDecoded));
  // Check for expired time
  const currentTime = Date.now() / 1000;
  if (userDecoded.exp < currentTime) {
    // Logout
    store.dispatch(logoutUser());
    // User
    store.dispatch(setCurrentUser({}));
    window.location.href = "/";
  }

}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

export default App;
