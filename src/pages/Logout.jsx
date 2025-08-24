import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const {user,logout}=useAuth()
    const navigate=useNavigate()

    const HandleLogout=async()=>{
        await logout()
        navigate('/login')
    }

 return (
    <div className="container py-5 text-center">
      {user ? (
        <>
          <h3 className="mb-3">You are logged in as</h3>
          <p className="fw-bold text-success">{user.email}</p>
          <button className="btn btn-danger mt-3" onClick={HandleLogout}>
            Logout
          </button>
        </>
      ) : (
        <p className="text-muted">You are already logged out.</p>
      )}
    </div>
  );
}

export default Logout