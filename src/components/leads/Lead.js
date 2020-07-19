import React, { useEffect } from "react";
import { Card, Button, Dimmer } from "tabler-react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getLead, deleteLead } from "../../store/actions/leadActions";
import propTypes from "prop-types";
import { useParams, Link } from "react-router-dom";
const Lead = ({ getLead, deleteLead, lead, feedback, auth }) => {
  const { id } = useParams();
  useEffect(() => {
    getLead(id);
  }, []);

  const onDelete = (e) => {
    if (window.confirm("Are you sure?")) {
      deleteLead(lead.item._id);
    }
  };

  if (!auth.isAuthenticated || !auth.user.role || auth.user.role !== "staff") {
    return <Redirect to="/profile" />;
  }

  return (
    <Card>
      <Card.Header>
        <Card.Title>Client Information</Card.Title>
      </Card.Header>
      {lead.item.name ? (
        <>
          <Card.Body>
            <p>
              <strong>Name: </strong>
              {lead.item.name}
            </p>
            <p>
              <strong>Email: </strong>
              {lead.item.email}
            </p>
            <p>
              <strong>Phone: </strong>
              {lead.item.phone}
            </p>
          </Card.Body>
          <Card.Footer>
            <Link
              to={`/leads/${lead.item._id}/edit`}
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
            <Link to="/leads" className="btn btn-light text-secondary ml-2">
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

Lead.prototype = {
  getLead: propTypes.func.isRequired,
  deleteLead: propTypes.func.isRequired,
  lead: propTypes.object.isRequired,
  auth: propTypes.object.isRequired,
  feedback: propTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  lead: state.lead,
  auth: state.auth,
  feedback: state.feedback,
});

export default connect(mapStateToProps, { getLead, deleteLead })(Lead);
