import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext";
import { toast } from 'react-toastify';
// import { getToken } from '../../utils/authUtils'
import { auth } from '../../firebase';
import { getAuth } from 'firebase/auth';
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const { currentUser } = useAuth();
   const auth = getAuth();

  const fetchUsers = async () => {
    try {
      if (!currentUser || !currentUser.token) throw new Error('No auth token');
      const { data } = await axios.get('https://atomic-7jgw.onrender.com/api/users/all', {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const toggleUserVerification = async (userId, isVerified) => {
    try {
      await axios.put(`https://atomic-7jgw.onrender.com/api/users/${userId}/verify`, 
        { isVerified: !isVerified },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      
      setUsers(prev => prev.map(user => 
        user._id === userId ? { ...user, isVerified: !isVerified } : user
      ));
      
      toast.success(`User ${!isVerified ? 'verified' : 'unverified'} successfully`);
    } catch (error) {
      console.error('Failed to update user verification:', error);
      toast.error('Failed to update user verification');
    }
  };

  const toggleUserRole = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'customer' : 'admin';
    try {
      await axios.put(`https://atomic-7jgw.onrender.com/api/users/${userId}/role`, 
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      toast.success(`User role changed to ${newRole}`);
      // Refresh user list to reflect backend changes and claims
      await fetchUsers();
    } catch (error) {
      const msg = error?.response?.data?.message || 'Failed to update user role';
      console.error('Failed to update user role:', error);
      toast.error(msg);
    }
  };

  useEffect(() => {
  
    fetchUsers();
  }
, [auth]);


  // Filter users
  const filteredUsers = users.filter(user => {
    let matchesFilter = false;
    if (filter === 'all') matchesFilter = true;
    if (filter === 'verified' && user.isVerified) matchesFilter = true;
    if (filter === 'unverified' && !user.isVerified) matchesFilter = true;
    if (filter === 'admin' && user.role === 'admin') matchesFilter = true;

    const matchesSearch =
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const getVerificationBadge = (isVerified) => {
    return isVerified ? (
      <span className="badge bg-success">Verified ✅</span>
    ) : (
      <span className="badge bg-warning">Unverified ⏳</span>
    );
  };

  const getRoleBadge = (role) => {
    return role === 'admin' ? (
      <span className="badge bg-danger">Admin 👑</span>
    ) : (
      <span className="badge bg-primary">Customer 👤</span>
    );
  };

  if (!currentUser || !currentUser.token) {
    return (
      <div className="container-fluid text-center py-5">
        <div className="alert alert-danger">
          You must be logged in as admin to view users.
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">🔍</span>
            <input
              type="text"
              className="form-control"
              placeholder="Search users by email or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Users</option>
            <option value="verified">Verified Users</option>
            <option value="unverified">Unverified Users</option>
            <option value="admin">Admin Users</option>
          </select>
        </div>
        <div className="col-md-2">
          <button 
            className="btn btn-outline-success w-100"
            onClick={fetchUsers}
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12">
          <div className="alert alert-info">
            <strong>📊 User Statistics:</strong> 
            Total: {users.length} | 
            Verified: {users.filter(u => u.isVerified).length} | 
            Unverified: {users.filter(u => !u.isVerified).length} | 
            Admins: {users.filter(u => u.role === 'admin').length}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="alert alert-info">
          No users found matching your criteria.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-success">
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Status</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div>
                      <strong>{user.name || 'No Name'}</strong>
                      <br />
                      <small className="text-muted">ID: {user._id.slice(-8)}</small>
                    </div>
                  </td>
                 <td>
               <span>{user.email}</span>
               {user.phone && (
                 <>
                   <br />
                   <small className="text-muted">📞 {user.phone}</small>
                 </>
               )}
                 </td>

                  <td>
                    {getVerificationBadge(user.isVerified)}
                  </td>
                  <td>
                    {getRoleBadge(user.role)}
                  </td>
                  <td>
                    <small>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </small>
                  </td>
                  <td>
                    <div className="btn-group-vertical btn-group-sm">
                      <button
                        className={`btn btn-sm ${
                          user.isVerified ? 'btn-outline-warning' : 'btn-outline-success'
                        }`}
                        onClick={() => toggleUserVerification(user._id, user.isVerified)}
                        title={user.isVerified ? 'Unverify User' : 'Verify User'}
                      >
                        {user.isVerified ? '❌ Unverify' : '✅ Verify'}
                      </button>
                      
                      <button
                        className={`btn btn-sm ${
                          user.role === 'admin' ? 'btn-outline-primary' : 'btn-outline-danger'
                        }`}
                        onClick={() => toggleUserRole(user._id, user.role)}
                        title={user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                      >
                        {user.role === 'admin' ? '👤 Remove Admin' : '👑 Make Admin'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
