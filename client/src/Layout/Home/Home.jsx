import React, { Component } from "react";
import './Home.css';
import NavBar from '../../Layout/NavBar/NavBar';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="Home-Content">
          <h1 className="Home-Title">Authentication System - MERN Stack</h1>    
          <Link to="/private">Go to the private route</Link>
        </div>
      </div>
    );
  }
}

export default Home;
