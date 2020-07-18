import React, { useEffect } from "react";
import { Card, Dimmer, Table } from "tabler-react";
import { connect } from "react-redux";
import { getUsers } from "../../store/actions/userActions";
import propTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
const Users = ({ getUsers, user, auth }) => {
  useEffect(() => {
    getUsers();
  }, []);

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
        <Card.Title>Users List</Card.Title>
      </Card.Header>
      <div className="table-responsive">
        {user.list.length ? (
          <Table className="table card-table table-vcenter">
            <Table.Header>
              <Table.Row className="bg-light">
                <Table.Col>Name</Table.Col>
                <Table.Col>Email</Table.Col>
                <Table.Col>Actions</Table.Col>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {user.list.map((user) => (
                <Table.Row key={user._id}>
                  <Table.Col className="text-nowrap text-muted">
                    {user.name}
                  </Table.Col>
                  <Table.Col className="text-nowrap text-muted">
                    {user.email}
                  </Table.Col>
                  <Table.Col>
                    <Link
                      to={"/users/" + user._id}
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

Users.prototype = {
  getUsers: propTypes.func.isRequired,
  user: propTypes.object.isRequired,
  auth: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth,
});
export default connect(mapStateToProps, { getUsers })(Users);
