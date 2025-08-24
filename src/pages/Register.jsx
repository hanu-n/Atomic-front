import React, { useState } from "react";
import { auth } from "../firebase.js";
import { createUserWithEmailAndPassword,sendEmailVerification  } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";


const Register = () => {
  const navigate=useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleRegister=async(e)=>{
         e.preventDefault()
         setIsLoading(true)
         try {
          const userCredential =await createUserWithEmailAndPassword(auth,email,password)
            await sendEmailVerification(userCredential.user)
            localStorage.setItem('verify-email',email)
             toast.success("Registration successful! Please verify your email.");
             setTimeout(() => navigate("/verify-email"), 1500);
 

            } catch (error) {
             console.error(error);
  let message = "Registration failed. Please try again.";

    switch (error.code) {
      case "auth/email-already-in-use":
        message = "This email is already registered.";
        break;
      case "auth/invalid-email":
        message = "Invalid email format.";
        break;
      case "auth/weak-password":
        message = "Password must be at least 6 characters.";
        break;
    }
               toast.error(message);
   }setIsLoading(false)

  }

   return (
    <div className="container py-5">
      <h2 className="mb-3">Register</h2>
      <form onSubmit={handleRegister} className="col-md-4">
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email}
                 onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" value={password}
                 onChange={(e) => setPassword(e.target.value)} required />
        </div>
<button type="submit" className="btn btn-success" disabled={isLoading}>
  {isLoading ? (
    <>
      <Spinner size="sm" animation="border" /> Registering...
    </>
  ) : (
    "Register"
  )}
</button>
      </form>
    
    </div>
  );

}

export default Register