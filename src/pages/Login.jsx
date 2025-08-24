import React, { useEffect, useState } from "react";
import { auth } from "../firebase.js";
import { signInWithEmailAndPassword, signOut ,onAuthStateChanged} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const navigate=useNavigate()

useEffect(()=>{
  const unsubscribe =onAuthStateChanged(auth,(currentUser)=>{
    setUser(currentUser)
})
  return ()=> unsubscribe()
},[])




   const handleLogin=async(e)=>{
        e.preventDefault()
        try {
         const userCredential = await signInWithEmailAndPassword(auth,email,password)
         const user=userCredential.user
         console.log("Email verified?", auth.currentUser.emailVerified);

             await user.reload()
       if(!user.emailVerified){
        toast.error("Please verify your email before logging in.")
         await signOut(auth)
             navigate('/verify-email')
        return
       }
         toast.success("Logged in successfully!");
         navigate('/')
     

      } catch (error) {
            console.error("Login Error:", error.message);
  
  let message = "Login failed. Please try again."
  

  switch (error.code) {
    case "auth/user-not-found":
      message = "No account found with this email. Please register first.";
      break;
    case "auth/wrong-password":
      message = "Incorrect password. Please try again.";
      break;
    case "auth/invalid-email":
      message = "Please enter a valid email address.";
      break;
    case "auth/too-many-requests":
      message = "Too many login attempts. Try again later.";
      break;
    default:
      message ="Something went wrong. Please try again.";;
  }

  toast.error(message);
}

  };

  const handleLogout=async(e)=>{
    e.preventDefault()
     try {
      await signOut(auth)
      toast.info("Logged out successfully.");
     } catch (error) {
      console.error("Logout Error:", error.message);
      toast.error(error.message);
    }
  }


   return (
    <div className="container py-5">
      {!user ? (
        <>
          <h2 className="mb-3">Login</h2>
          <form onSubmit={handleLogin} className="col-md-4">
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-success">
              Login
            </button>
          </form>
        </>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "50vh" }}>
          <h4 className="mb-3 text-success">You're already logged in</h4>
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      )}

    </div>
  );

}

export default Login