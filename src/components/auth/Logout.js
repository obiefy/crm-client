import React from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { logout } from "../../store/actions/authActions";

const Logout = ({ logout }) => {
  return (
    <a className="nav-link pr-3" onClick={logout} href="#">
      Logout
    </a>
  );
};

Logout.prototype = {
  logout: propTypes.func.isRequired,
};
export default connect(null, { logout })(Logout);
