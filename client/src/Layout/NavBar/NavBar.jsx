import React, { Component, Fragment } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class NavBar extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <div>
        <Link to="/login">Sign In</Link> |
        <Link to="/register"> Sign Up</Link>
      </div>
    );

    const guestLinks = (
    <p onClick={this.props.logoutUser} style={{ cursor: 'pointer' }}>
      <span className="fa fa-sign-out"></span> {" "}
      Logout
    </p>
    );
    return (
      <nav className="NavBar-Wrapper">
        <div className="User-Info-Wrapper">
          {Object.keys(user).length > 0 && (
            <Fragment>
              <img src={user.avatar} alt="" className="User-Avatar" />
              <p className="User-Name">{user.name}</p>
            </Fragment>
          )}
        </div>
        <div className="NavBar-Auth-Links">
          {isAuthenticated ? guestLinks : authLinks}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(NavBar);
