import React, { useState, useEffect } from 'react';
import UserService from '../services/UserService';
import { useNavigate, useParams } from 'react-router-dom';
import User from '../models/User';

function EditUser() {
  const initialUserState: User = {
    id: 0,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    dateOfBirth: '',
    status: '' 
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
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const updateUser = () => {
    UserService.update(user.id, user)
      .then(response => {
        console.log('User updated successfully:', response.data);
        navigate('/');
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  };

  return (
    <div className="container">
  <h2>Edit User</h2>
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
    </div>
  </div>
  <div className="row mt-3">
    <div className="col-md-6">
      <button className="btn btn-primary" onClick={updateUser}>Update User</button>
      <button className="btn btn-secondary" onClick={handleBack}>Back</button>
    </div>
  </div>
</div>

  );
}

export default EditUser;
