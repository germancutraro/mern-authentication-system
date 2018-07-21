import React, { Component } from "react";
import "./Login.css";
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from "classnames";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

import Error from "../Error/Error";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  componentDidMount() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) this.props.history.push('/');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors)
      this.setState({ errors: nextProps.errors });
  }

  onChangeHandler = e => this.setState({ [e.target.name]: e.target.value });

  signIn = async e => {
    e.preventDefault();
    e.preventDefault();
    const { email, password } = this.state;
    // Redux function   
    if (await this.props.loginUser({ email, password }))
      this.props.history.push('/');
  };

  render() {

    const { errors } = this.state;

    return (
      <div className="Login-Wrapper">
        <div className="Login-SubWrapper">
          <Link to="/"> <span className="fa fa-arrow-left" style={{color: '#333', fontSize: '15px'}}></span> </Link>
          <h1 className="Login-Form-Title">Sign In</h1>
          <div className="hr" />
          <form onSubmit={this.signIn}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              autoComplete="email"
              onChange={this.onChangeHandler}
              className={classnames("Login-Input", {
                invalid: errors.email
              })}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="current-password"
              onChange={this.onChangeHandler}
              className={classnames("Login-Input", {
                invalid: errors.password
              })}
            />
            <button type="submit" className="Login-Button">Sign In</button>
          </form>
          <div>
            {errors.name && <Error>{errors.name}</Error>}
            {errors.email && <Error>{errors.email}</Error>}
            {errors.password && <Error>{errors.password}</Error>}
            <p className="Login-To-Register">
                Do you need an account?{" "}
                <Link to="/register" className="Register-Login-Link">
                   Sign Up
                </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));
