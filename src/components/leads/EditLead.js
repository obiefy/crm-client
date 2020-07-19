import React, { useState, useEffect } from "react";
import { Card, Dimmer } from "tabler-react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getLead, updateLead } from "../../store/actions/leadActions";
import propTypes from "prop-types";
import { useParams, Link } from "react-router-dom";

const EditLead = ({ lead, feedback, auth, getLead, updateLead }) => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    getLead(id);
    if (lead.item.name) {
      setName(lead.item.name);
      setEmail(lead.item.email);
      setPhone(lead.item.phone);
    }
  }, []);

  const onUpdate = (e) => {
    e.preventDefault();
    updateLead(id, { name, email, phone });
  };

  if (!auth.isAuthenticated || !auth.user.role || auth.user.role !== "staff") {
    return <Redirect to="/profile" />;
  }

  return (
    <Card>
      <Card.Header>
        <Card.Title>Edit Client</Card.Title>
      </Card.Header>
      {lead.item.name ? (
        <form onSubmit={onUpdate}>
          <Card.Body>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="example-text-input"
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
                name="example-text-input"
                placeholder="Email Address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                name="example-text-input"
                placeholder="User Name..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
              to={`/leads/${lead.item._id}`}
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

EditLead.prototype = {
  getLead: propTypes.func.isRequired,
  updateLead: propTypes.func.isRequired,
  lead: propTypes.object.isRequired,
  auth: propTypes.object.isRequired,
  feedback: propTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  lead: state.lead,
  auth: state.auth,
  feedback: state.feedback,
});

export default connect(mapStateToProps, { getLead, updateLead })(EditLead);
