import React, { useEffect } from "react";
import { Card, Dimmer, Table } from "tabler-react";
import { connect } from "react-redux";
import { getLeads } from "../../store/actions/leadActions";
import propTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";

const Leads = ({ getLeads, lead, auth }) => {
  useEffect(() => {
    getLeads();
  }, []);

  if (!auth.isAuthenticated || !auth.user.role || auth.user.role !== "staff") {
    return <Redirect to="/profile" />;
  }
  return (
    <Card>
      <Card.Header>
        <Card.Title>Client List</Card.Title>
      </Card.Header>
      <div className="table-responsive">
        {lead.list.length ? (
          <Table className="table card-table table-vcenter">
            <Table.Header>
              <Table.Row className="bg-light">
                <Table.Col>Name</Table.Col>
                <Table.Col>Email</Table.Col>
                <Table.Col>Phone</Table.Col>
                <Table.Col>Actions</Table.Col>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {lead.list.map((lead) => (
                <Table.Row key={lead._id}>
                  <Table.Col className="text-nowrap text-muted">
                    {lead.name}
                  </Table.Col>
                  <Table.Col className="text-nowrap text-muted">
                    {lead.email}
                  </Table.Col>
                  <Table.Col className="text-nowrap text-muted">
                    {lead.phone}
                  </Table.Col>
                  <Table.Col>
                    <Link
                      to={"/leads/" + lead._id}
                      className="btn btn-secondary btn-sm text-light"
                    >
                      View
                    </Link>
                  </Table.Col>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <Dimmer active loader className="py-2 my-5"></Dimmer>
        )}
      </div>
    </Card>
  );
};

Leads.prototype = {
  getLeads: propTypes.func.isRequired,
  lead: propTypes.object.isRequired,
  auth: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  lead: state.lead,
  auth: state.auth,
});
export default connect(mapStateToProps, { getLeads })(Leads);
