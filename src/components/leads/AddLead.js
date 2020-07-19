import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { addLead } from "../../store/actions/leadActions";

const AddLead = ({ addLead, feedback, auth }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const onSave = (e) => {
    e.preventDefault();
    addLead({ name, email, phone });
  };

  if (!auth.isAuthenticated || !auth.user.role || auth.user.role !== "staff") {
    return <Redirect to="/profile" />;
  }

  return (
    <div className="card">
      <div className="card-header">Create new Lead</div>
      <form onSubmit={onSave}>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="User Name..."
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="tex"
              className="form-control"
              name="password"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
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
          <Link to="/leads" className="btn btn-light btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

AddLead.prototype = {
  addLead: propTypes.func.isRequired,
  feedback: propTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  feedback: state.feedback,
  auth: state.auth,
});
export default connect(mapStateToProps, { addLead })(AddLead);
