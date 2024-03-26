import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";
import User from "../models/User";
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import DeleteUser from "./DeleteUser";
import { Link } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    retrieveUsers();
  }, [searchTerm]); // Trigger retrieval whenever the searchTerm changes

  const retrieveUsers = () => {
    if (searchTerm.trim() === "") {
      // If search term is empty, fetch all users
      UserService.getAll()
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    } else {
      // If search term is provided, fetch users matching the search term
      UserService.search(searchTerm)
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.error("Error searching users:", error);
        });
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = () => {
    retrieveUsers(); // Refresh user list after successful deletion
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
    <Row >
      <Col md={6}>
        <Form.Group className="d-flex align-items-center" >
          <Form.Label htmlFor="searchInput" className="mr-2">Search:</Form.Label>
          <Form.Control
            type="text"
            id="searchInput"
            placeholder="Search by First Name, Last Name, or Phone Number"
            onChange={handleSearch}
            size="sm"
            className="mr-2"
          />
          <Link to="/create" className="btn btn-primary">
            <FontAwesomeIcon icon={faPlus} />
          </Link>
        </Form.Group>
      </Col>
    </Row>
    <Row className="mt-3">
      <Col md={12}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.email}</td>
                <td>
                <Link to={`/edit/${user.id}`} className="btn btn-sm btn-primary" style={{marginRight: '5px'}}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                  <DeleteUser userId={user.id} onDelete={handleDelete} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  </Container>
  );
}

export default UserList;
