import React from 'react';
import { getAuth } from 'firebase/auth';

const DeleteAccount = () => {
  const handleDeleteAccount = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
      if (!confirmed) return;

      try {
        await user.delete();
        alert('Account deleted successfully');
        // Optional: redirect to home or login page
        window.location.href = '/';
      } catch (error) {
        console.error('Error deleting account:', error);

        // if (error.code === 'auth/requires-recent-login') {
        //   alert('Please log in again before deleting your account.');
        //   // Optionally, navigate them to the login page
        // } else {
        //   alert('Error deleting account.');
        // }
      }
    } else {
      alert('No user is currently logged in.');
    }
  };

  return (
    <div className="text-center mt-5">
      <button className="btn btn-danger" onClick={handleDeleteAccount}>
        Delete My Account
      </button>
    </div>
  );
};

export default DeleteAccount;
