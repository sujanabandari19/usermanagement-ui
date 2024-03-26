import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";
import { useNavigate, useParams } from "react-router-dom";
import User from "../models/User";
import { Container, Col, Row } from "react-bootstrap";

function EditUser() {
  const initialUserState: User = {
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
        addressType: "",
      },
    ],
  };

  const [user, setUser] = useState<User>(initialUserState);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    let id1 = id as string;
    return retrieveUser(id1);
  }, [id]);

  const retrieveUser = (id: string) => {
    UserService.get(Number(id))
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const updateUser = () => {
    UserService.update(user.id, user)
      .then((response) => {
        console.log("User updated successfully:", response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <Container>
      <h2>Edit User</h2>
      <Row>
        <Col md={6}>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={user.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={user.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select
              className="form-control"
              id="status"
              name="status"
              value={user.status}
              onChange={handleInputChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={3}>
          <button className="btn btn-primary btn-block" onClick={updateUser}>
            Update User
          </button>
        </Col>
        <Col md={3}>
          <button className="btn btn-secondary btn-block" onClick={handleBack}>
            Back
          </button>
        </Col>
      </Row>
    </Container>
  );
}

export default EditUser;
