import React, { useState, useEffect } from "react";
import { Card, Dimmer } from "tabler-react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUser, updateUser } from "../../store/actions/userActions";
import propTypes from "prop-types";
import { useParams, Link } from "react-router-dom";

const EditUser = ({ user, feedback, auth, getUser, updateUser }) => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getUser(id);
    if (user.item.name) {
      setName(user.item.name);
      setEmail(user.item.email);
    }
  }, []);

  const onUpdate = (e) => {
    e.preventDefault();
    updateUser(id, { name, email });
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
        <Card.Title>Edit User</Card.Title>
      </Card.Header>
      {user.item.name ? (
        <form onSubmit={onUpdate}>
          <Card.Body>
            <div className="mb-3">
              <label className="form-label">User Name</label>
              <input
                type="text"
                className="form-control"
                name="example-text-input"
                placeholder="User Name..."
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                name="example-text-input"
                placeholder="Email Address..."
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </Card.Body>
          <Card.Footer>
            <button
              type="submit"
              className="btn btn-primary mr-2"
              disabled={feedback.isLoading ? "disabled" : ""}
            >
              {feedback.isLoading ? "Updating ... " : "Update"}
            </button>
            <Link
              to={`/users/${user.item._id}`}
              className="btn btn-light btn-secondary"
            >
              Cancel
            </Link>
          </Card.Footer>
        </form>
      ) : (
        <Dimmer active loader className="py-2 my-5"></Dimmer>
      )}
    </Card>
  );
};

EditUser.prototype = {
  getUser: propTypes.func.isRequired,
  updateUser: propTypes.func.isRequired,
  user: propTypes.object.isRequired,
  auth: propTypes.object.isRequired,
  feedback: propTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth,
  feedback: state.feedback,
});

export default connect(mapStateToProps, { getUser, updateUser })(EditUser);
