import React, { useState } from "react";
import { Card, Form, Button } from "tabler-react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { login } from "../../store/actions/authActions";

const Login = ({ login, auth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (auth.isAuthenticated) {
    return <Redirect to="/profile" />;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <>
      <Card className="p-5">
        <Card.Body>
          <Form onSubmit={onSubmit}>
            <h3 className="mb-3">Login to CRM</h3>
            <Form.Input
              type="email"
              label="Email"
              className="mb-3"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Input>
            <Form.Input
              type="password"
              label="Password"
              className="mb-3"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Input>
            <Button className="btn btn-primary btn-block mt-2">Login</Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

Login.prototype = {
  login: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { login })(Login);
