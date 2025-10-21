import React, { useState, useEffect } from "react";
import { auth, googleProvider } from "../firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") === "register" ? false : true;
  const verified = searchParams.get("verified") === "true";
  const [isLogin, setIsLogin] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Show success message if coming from email verification
    if (verified) {
      toast.success("🎉 Email verified successfully! You can now log in.");
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.emailVerified) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // 🔹 Register
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      toast.error("You must agree to the Terms and Privacy Policy.");
      return;
    }

    setIsLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCred.user;

      // Register in backend DB
      await fetch("https://atomic-7jgw.onrender.com/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firebaseUID: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || "",
        }),
      });

      localStorage.setItem("verify-email", firebaseUser.email);

      toast.success("Registered! Please check your email for verification.");
      setTimeout(() => navigate("/verify-email"), 1000);
    } catch (error) {
      let message = "Registration failed.";
      if (error.code === "auth/email-already-in-use") message = "This email is already registered.";
      if (error.code === "auth/invalid-email") message = "Invalid email format.";
      if (error.code === "auth/weak-password") message = "Password must be at least 6 characters.";
      toast.error(message);
    }
    setIsLoading(false);
  };

  // 🔹 Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCred.user;


const token = await firebaseUser.getIdToken(); // get Firebase ID token

await fetch(`https://atomic-7jgw.onrender.com/api/users/set-role/${firebaseUser.uid}`, {
  method: "PUT",
  headers: { 
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}` // send token
  },
  body: JSON.stringify({ role }),
});


localStorage.setItem("role", role);
localStorage.setItem("email", firebaseUser.email);



      // Redirect to previous page if available, unless admin
      if (role === "admin") {
        navigate("/admin");
      } else {
        const from = location.state?.from?.pathname || "/";
        navigate(from);
      }
 
  

      // Check backend if verified
      const res = await fetch(`https://atomic-7jgw.onrender.com/api/users/is-verified/${firebaseUser.uid}`);
      const { isVerified } = await res.json();

      if (!isVerified) {
        toast.error("Please verify your email before logging in.");
        await signOut(auth);
        localStorage.setItem("verify-email", firebaseUser.email);
        navigate("/verify-email");
        return;
      }

  toast.success("Login successful!");
    } catch (error) {
        console.error("Login failed:", error.code, error.message);
      toast.error("Login failed. Please check your credentials.");
     
    }
    setIsLoading(false);
  };

  // 🔹 Google sign-in
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      // Register in backend DB
      await fetch("https://atomic-7jgw.onrender.com/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firebaseUID: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || "",
        }),
      });

      toast.success("Signed in with Google!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Google sign-in failed.");
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    toast.info("Logged out successfully.");
  };

  return (
    <div className="container py-5">
      {!user ? (
        <div className="col-md-4 mx-auto">
          <h2 className="mb-3 text-center">{isLogin ? "Login" : "Register"}</h2>

          <form onSubmit={isLogin ? handleLogin : handleRegister}>
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

            <div className="mb-3 position-relative">
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <span
                style={{
                  position: "absolute",
                  top: "35px",
                  right: "10px",
                  cursor: "pointer",
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
              </span>
            </div>

            {!isLogin && (
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="termsCheckbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="termsCheckbox">
                  I agree to the <a href="/terms">Terms</a> and{" "}
                  <a href="/policy">Privacy Policy</a>
                </label>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={isLoading}
            >
              {isLoading ? <Spinner size="sm" animation="border" /> : (isLogin ? "Login" : "Register")}
            </button>
          </form>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="btn btn-danger w-100 mt-3"
            disabled={isLoading}
          >
            <i className="fab fa-google me-2"></i> Continue with Google
          </button>

          <p className="mt-3 text-center">
            {isLogin ? (
              <>Don’t have an account? <span className="text-primary" style={{cursor:"pointer"}} onClick={() => setIsLogin(false)}>Register</span></>
            ) : (
              <>Already have an account? <span className="text-primary" style={{cursor:"pointer"}} onClick={() => setIsLogin(true)}>Login</span></>
            )}
          </p>
        </div>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "50vh" }}>
          <h4 className="mb-3 text-success">You're already logged in</h4>
          <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        </div>
      )}
    </div>
  );
};

export default Auth;
