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
      <div className="form-group">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
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
          id="email"
          name="email"
          value={user.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={user.status}
          onChange={handleInputChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <button onClick={updateUser}>Update User</button>
    </div>
  );
}

export default EditUser;
