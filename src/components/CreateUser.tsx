import React, { useState } from 'react';
import UserService from '../services/UserService';
import { useNavigate } from 'react-router-dom';


function CreateUser() {
  const initialUserState = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    dateOfBirth: '',
    status: 'Active'
  };
  const [user, setUser] = useState(initialUserState);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const saveUser = () => {
    UserService.create(user)
      .then(response => {
        console.log('User created successfully:', response.data);
        navigate('/');
      })
      .catch(error => {
        console.error('Error creating user:', error);
      });
  };

  return (
    <div className="container">
  <h2>Create User</h2>
  <div className="row">
    <div className="col-md-6">
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
    </div>
    <div className="col-md-6">
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
    </div>
  </div>
  <div className="row">
    <div className="col-md-6">
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
    </div>
    <div className="col-md-6">
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
    </div>
  </div>
  <div className="row">
    <div className="col-md-6">
      <div className="form-group">
        <label htmlFor="dateOfBirth">Date of Birth:</label>
        <input
          type="date"
          className="form-control"
          id="dateOfBirth"
          name="dateOfBirth"
          value={user.dateOfBirth}
          onChange={handleInputChange}
        />
      </div>
    </div>
  </div>
  <div className="row">
    <div className="col-md-6">
      <button className="btn btn-primary" onClick={saveUser}>Save User</button>
      <button className="btn btn-secondary" onClick={handleBack}>Back</button>
    </div>
  </div>
</div>

  );
}

export default CreateUser;
