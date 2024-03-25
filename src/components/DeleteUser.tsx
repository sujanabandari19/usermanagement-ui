import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import UserService from '../services/UserService';
import { useNavigate } from 'react-router-dom';

interface Props {
  userId: number;
  onDelete: () => void; // Callback function to refresh user list

}

const DeleteUser: React.FC<Props> = ({ userId, onDelete }) => {

  const navigate = useNavigate();

  const deleteUser = () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      UserService.remove(userId)
        .then(() => {
          console.log('User deleted successfully');
          onDelete(); // Call the callback function after successful deletion

        })
        .catch(error => {
          console.error('Error deleting user:', error);
          // Handle deletion error
        });
    }
  };

  return (
    <button onClick={deleteUser}>
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
};

export default DeleteUser;
