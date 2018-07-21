import React, { Component } from 'react';
import './Private.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Private extends Component {

  componentDidMount() {
    const { isAuthenticated } = this.props.auth;
    if (!isAuthenticated) this.props.history.push('/login');
  }

  render() {
    return (
        <div className="Private-Wrapper">
          <h1 className="Success-Title">Yeah! you are logged!</h1>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(Private));