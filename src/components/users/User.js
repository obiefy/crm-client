import React, { useEffect } from "react";
import { Card, Button, Dimmer } from "tabler-react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUser, deleteUser } from "../../store/actions/userActions";
import propTypes from "prop-types";
import { useParams, Link } from "react-router-dom";
const User = ({ getUser, deleteUser, user, feedback, auth }) => {
  const { id } = useParams();
  useEffect(() => {
    getUser(id);
  }, []);

  const onDelete = (e) => {
    if (window.confirm("Are you sure?")) {
      deleteUser(user.item._id);
    }
  };

  if (
    !auth.isAuthenticated ||
    !auth.user.role ||
    auth.user.role !== "super-admin"
  ) {
    return <Redirect to="/login" />;
  }

  return (
    <Card>
      <Card.Header>
        <Card.Title>Users Information</Card.Title>
      </Card.Header>
      {user.item.name ? (
        <>
          <Card.Body>
            <p>
              <strong>User name: </strong>
              {user.item.name}
            </p>
            <p>
              <strong>Email: </strong>
              {user.item.email}
            </p>
            <p>
              <strong>Role: </strong>
              {user.item.role}
            </p>
            <p>
              <strong>Created ar: </strong>
              {user.item.created_at}
            </p>
          </Card.Body>
          <Card.Footer>
            <Link
              to={`/users/${user.item._id}/edit`}
              className="btn btn-light text-primary"
            >
              Edit
            </Link>
            <Button
              className="btn btn-light text-danger ml-2"
              onClick={onDelete}
              disabled={feedback.isLoading ? "disabled" : ""}
            >
              {feedback.isLoading ? "Deleting ... " : "Delete"}
            </Button>
            <Link to="/users" className="btn btn-light text-secondary ml-2">
              Cancel
            </Link>
          </Card.Footer>
        </>
      ) : (
        <Dimmer active loader className="py-2 my-5"></Dimmer>
      )}
    </Card>
  );
};

User.prototype = {
  getUser: propTypes.func.isRequired,
  deleteUser: propTypes.func.isRequired,
  user: propTypes.object.isRequired,
  auth: propTypes.object.isRequired,
  feedback: propTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth,
  feedback: state.feedback,
});

export default connect(mapStateToProps, { getUser, deleteUser })(User);
