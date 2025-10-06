import React from 'react';
import { getAuth } from 'firebase/auth';
import { toast } from "react-toastify";

const DeleteAccount = () => {
  const handleDeleteAccount = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
      if (!confirmed) return;

      try {
        await user.delete();
        toast.success('Account deleted successfully');
        // Optional: redirect to home or login page
        window.location.href = '/';
      } catch (error) {
        console.error('Error deleting account:', error);

       
      }
    } else {
      toast.success('No user is currently logged in.');
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


