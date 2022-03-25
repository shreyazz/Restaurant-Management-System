import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const [addAdminMenu, setAddAdminMenu] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    newAdminEmail: "",
    newAdminPassword: "",
    newAdminUsername: "",
  });
  const [role, setRole] = useState("");
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (
      name === "newAdminEmail" ||
      name === "newAdminPassword" ||
      name === "newAdminUsername"
    ) {
      setNewAdmin({ ...newAdmin, [name]: value });
    }
  };

  // ! handles login
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/login/admin-login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert("Please fill out all the fields below");
    } else if (res.status === 404) {
      window.alert("Admin is not register");
    } else if (res.status === 401) {
      window.alert("Please enter valid credentials");
    } else if (res.status === 200) {
      window.alert("Login Successful");
      localStorage.setItem("jwt", data.jwt);
      setUser(data);
    }
    setRole(data.role);
  };

  const addAdmin = async () => {
    const res = await fetch("http://localhost:5000/register/admin-reg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.jwt}`,
      },
      
      body: JSON.stringify({
        email: newAdmin.newAdminEmail,
        username: newAdmin.newAdminUsername,
        password: newAdmin.newAdminPassword,
      }),
    });
    const data = await res.json();
    console.log(data);
    // if (data.status === 400 || !data) {
    //   window.alert("Some Error occurred");
    // } else {
    //   window.alert("Admin Added Successful");
    // }
    // const cookie_jwt = Cookies.get("jwt");
    // console.log(Cookies.get());
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Admin Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Admin Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <hr />
      <Container>
        <Form>
          <Row>
            <Col>
              <Form.Control
                placeholder="Email"
                onChange={handleChange}
                name="newAdminEmail"
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Username"
                onChange={handleChange}
                name="newAdminUsername"
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Password"
                onChange={handleChange}
                name="newAdminPassword"
              />
            </Col>
          </Row>
          <Button variant="primary mt-3" onClick={addAdmin}>
            Add
          </Button>
        </Form>
        <hr />
      </Container>
      <Container>
        <div className="d-flex justify-content-between">
          <Button
            variant="success mt-3"
            onClick={() => {
              setAddAdminMenu(!addAdminMenu);
            }}
          >
            Add Admin
          </Button>
          <>
            <Button variant="success mt-3 mr-2">Add Chef</Button>
            <Button variant="success mt-3">Add Waiter</Button>
          </>
        </div>
      </Container>
    </Container>
  );
};

export default AdminLogin;

// TODO: waiter -> name, role(auto), emp-id, password
// * admin -> email, role(auto), username, password
// * chef -> name, role(auto), emp-id, password
// TODO: food item -> name, price, category, description?
