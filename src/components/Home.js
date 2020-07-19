import React from "react";
import { Card } from "tabler-react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { Redirect, Link } from "react-router-dom";

const Profile = ({ auth }) => {
  return (
    <Card>
      <Card.Body className="m-4">
        <h1 className="mb-3">Welcome to CRM</h1>
        {auth.user ? (
          <Link to="/profile" className="btn btn-primary">
            Go to Profile
          </Link>
        ) : (
          <Link to="/profile" className="btn btn-primary">
            Login
          </Link>
        )}
      </Card.Body>
    </Card>
  );
};

Profile.prototype = {
  auth: propTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Profile);
