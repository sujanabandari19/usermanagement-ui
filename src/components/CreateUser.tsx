import React, { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const initialUserState = {
    id: 0,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    dateOfBirth: "",
    status: "",
    addresses: [
      {
        streetAddress: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        addressType: "Home",
      },
    ],
  };
  const [user, setUser] = useState(initialUserState);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => {
      const updatedAddresses = [...prevUser.addresses];
      updatedAddresses[0] = {
        ...updatedAddresses[0],
        [name]: value,
      };
      return {
        ...prevUser,
        addresses: updatedAddresses,
      };
    });
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const saveUser = () => {
    UserService.create(user)
      .then((response) => {
        console.log("User created successfully:", response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };

  return (
    <Container>
      <h2>Create User</h2>
      <Row>
        <Col md={6}>
          <Form.Group>
            <Form.Label htmlFor="firstName">First Name:</Form.Label>
            <Form.Control
              type="text"
              id="firstName"
              name="firstName"
              value={user.firstName}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label htmlFor="lastName">Last Name:</Form.Label>
            <Form.Control
              type="text"
              id="lastName"
              name="lastName"
              value={user.lastName}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group>
            <Form.Label htmlFor="phoneNumber">Phone Number:</Form.Label>
            <Form.Control
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label htmlFor="email">Email:</Form.Label>
            <Form.Control
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group>
            <Form.Label htmlFor="dateOfBirth">Date of Birth:</Form.Label>
            <Form.Control
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={user.dateOfBirth}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col md={6}>
          <Form.Group>
            <Form.Label htmlFor="streetAddress">Street Address:</Form.Label>
            <Form.Control
              type="text"
              id="streetAddress"
              name="streetAddress"
              value={user.addresses[0].streetAddress}
              onChange={handleAddressChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label htmlFor="city">City:</Form.Label>
            <Form.Control
              type="text"
              id="city"
              name="city"
              value={user.addresses[0].city}
              onChange={handleAddressChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group>
            <Form.Label htmlFor="state">State:</Form.Label>
            <Form.Control
              type="text"
              id="state"
              name="state"
              value={user.addresses[0].state}
              onChange={handleAddressChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label htmlFor="postalCode">Postal Code:</Form.Label>
            <Form.Control
              type="text"
              id="postalCode"
              name="postalCode"
              value={user.addresses[0].postalCode}
              onChange={handleAddressChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group>
            <Form.Label htmlFor="country">Country:</Form.Label>
            <Form.Control
              type="text"
              id="country"
              name="country"
              value={user.addresses[0].country}
              onChange={handleAddressChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-3">
          <Col md={3}>
            <Button variant="primary" onClick={saveUser}>
              Save User
            </Button>
          </Col>
          <Col md={3}>
            <Button variant="secondary" onClick={handleBack}>
              Back
            </Button>
          </Col>
      </Row>
    </Container>
  );
}

export default CreateUser;
