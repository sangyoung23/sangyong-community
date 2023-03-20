import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import firebase from "../firebase";

function Heading() {
  const user = useSelector((state) => state.user);
  let navigate = useNavigate();

  const LogoutHandler = () => {
    firebase.auth().signOut();
    navigate("/");
  };

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/">React-Community</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/"
              style={{ color: "white", textDecoration: "none" }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/upload"
              style={{ color: "white", textDecoration: "none" }}
            >
              Upload
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          {user.accessToken === "" ? (
            <Nav.Link
              as={Link}
              to="/login"
              style={{
                color: "white",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Login
            </Nav.Link>
          ) : (
            <Navbar.Text
              onClick={() => LogoutHandler()}
              style={{
                color: "white",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Logout
            </Navbar.Text>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Heading;
