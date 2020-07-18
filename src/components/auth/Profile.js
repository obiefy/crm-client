import React from "react";
import { Card } from "tabler-react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { Redirect } from "react-router-dom";

const Profile = ({ auth }) => {
  if (!auth.isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <Card>
      <Card.Header>
        <Card.Title>Your Profile</Card.Title>
      </Card.Header>
      <Card.Body>
        {auth.user ? (
          <>
            <p>
              <strong>User name: </strong>
              {auth.user.name}
            </p>
            <p>
              <strong>Email: </strong>
              {auth.user.email}
            </p>
          </>
        ) : (
          ""
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
