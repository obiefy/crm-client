import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";
import Logout from "./auth/Logout";
const Menu = ({ auth }) => {
  const { isAuthenticated, user } = auth;
  const authLinks = (
    <>
      {user && user.role === "super-admin" ? (
        <>
          <li className="nav-item">
            <Link to="/users/create" className="nav-link pr-3">
              New User
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/users" className="nav-link pr-3">
              Users
            </Link>
          </li>
        </>
      ) : (
        <>
          <li className="nav-item">
            <Link to="/leads/create" className="nav-link pr-3">
              New Lead
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/leads" className="nav-link pr-3">
              Leads
            </Link>
          </li>
        </>
      )}
      <li className="nav-item">
        <Link to="/profile" className="nav-link pr-3">
          Profile
        </Link>
      </li>
      <li className="nav-item">
        <Logout />
      </li>
    </>
  );
  const guestLinks = (
    <>
      <li className="nav-item">
        <Link to="/login" className="nav-link pr-3">
          Login
        </Link>
      </li>
    </>
  );
  return (
    <nav className="navbar navbar-dark mb-5 bg-faded justify-content-between flex-nowrap flex-row">
      <div className="container">
        <Link to="/" className="navbar-brand">
          CRM
        </Link>
        <ul className="nav navbar-nav flex-row">
          {isAuthenticated ? authLinks : guestLinks}
        </ul>
      </div>
    </nav>
  );
};

Menu.prototype = {
  auth: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Menu);
