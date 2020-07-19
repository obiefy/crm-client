import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { addUser } from "../../store/actions/userActions";

const AddUser = ({ addUser, feedback, auth }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSave = (e) => {
    e.preventDefault();
    addUser({ name, email, password, role });
  };

  if (
    !auth.isAuthenticated ||
    !auth.user.role ||
    auth.user.role !== "super-admin"
  ) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="card">
      <div className="card-header">Create new User</div>
      <form onSubmit={onSave}>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">User Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
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
              name="name"
              placeholder="Email Address..."
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <h3>Role:</h3>
            <label className="form-label">
              <input
                type="radio"
                className="mr-1"
                name="role"
                value="super-admin"
                onChange={(e) => setRole(e.target.value)}
              />
              Super Admin
            </label>

            <label className="form-label">
              <input
                type="radio"
                className="mr-1"
                name="role"
                value="staff"
                onChange={(e) => setRole(e.target.value)}
              />
              Staff Member
            </label>
          </div>
        </div>
        <div className="card-footer">
          <button
            type="submit"
            className="btn btn-primary mr-2"
            disabled={feedback.isLoading ? "disabled" : ""}
          >
            {feedback.isLoading ? "Saving ... " : "Save"}
          </button>
          <Link to="/users" className="btn btn-light btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

AddUser.prototype = {
  addUser: propTypes.func.isRequired,
  feedback: propTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  feedback: state.feedback,
  auth: state.auth,
});
export default connect(mapStateToProps, { addUser })(AddUser);
