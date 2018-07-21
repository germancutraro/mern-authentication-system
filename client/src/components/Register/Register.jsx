import React, { Component } from "react";
import "./Register.css";
import { withRouter } from 'react-router-dom';
import classnames from "classnames";
import PropTypes from 'prop-types';

import Error from "../Error/Error";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { registerUser } from '../../actions/authActions';

class Register extends Component {
  state = {
    name: "",
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

  signUp = async e => {
    e.preventDefault();
    const { name, email, password } = this.state,
       newUser = { name, email, password };
    // Redux function
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="Register-Wrapper">
        <div className="Register-SubWrapper">
          <Link to="/"> <span className="fa fa-arrow-left" style={{color: '#333', fontSize: '15px'}}></span> </Link>
          <h1 className="Register-Form-Title">Sign Up</h1>
          <div className="hr" />
          <form onSubmit={this.signUp} className="Register-Form">
            <input
              type="text"
              placeholder="NAME"
              name="name"
              autoComplete="name"
              onChange={this.onChangeHandler}
              className={classnames("Register-Input", {
                invalid: errors.name
              })}
            />
            <input
              type="email"
              placeholder="EMAIL"
              name="email"
              autoComplete="email"
              onChange={this.onChangeHandler}
              className={classnames("Register-Input", {
                invalid: errors.email
              })}
            />
            <input
              type="password"
              placeholder="PASSWORD"
              name="password"
              autoComplete="current-password"
              onChange={this.onChangeHandler}
              className={classnames("Register-Input", {
                invalid: errors.password
              })}
            />
            <button type="submit" className="Register-Button">
              FINISH
            </button>
          </form>
          <div>
            {errors.name && <Error>{errors.name}</Error>}
            {errors.email && <Error>{errors.email}</Error>}
            {errors.password && <Error>{errors.password}</Error>}
            <p className="Register-To-Login">
              Already have an account?{" "}
              <Link to="/login" className="Register-Login-Link">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
