import React, { useState, useEffect } from "react";
import { auth, googleProvider } from "../firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getRedirectResult,
} from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

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
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Handle email verification success
  useEffect(() => {
    if (verified) {
      toast.success("🎉 Email verified successfully! You can now log in.");
    }
  }, [verified]);

  // ✅ Handle Google redirect results
  useEffect(() => {
    const processRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          const firebaseUser = result.user;

          // Register in backend DB (idempotent)
          await fetch("https://atomic-7jgw.onrender.com/api/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firebaseUID: firebaseUser.uid,
              email: firebaseUser.email,
              name: firebaseUser.displayName || "",
            }),
          });

          // Determine role from Firestore
          let role = "customer";
          try {
            const adminDoc = await getDoc(doc(db, "admins", firebaseUser.email));
            if (adminDoc.exists()) role = "admin";
          } catch (err) {
            console.error("Error checking admin role:", err);
          }

          const token = await firebaseUser.getIdToken(true);
          localStorage.setItem("token", token);
          localStorage.setItem("role", role);
          localStorage.setItem("email", firebaseUser.email);

          if (role === "admin") navigate("/admin");
          else navigate("/");
        }
      } catch (err) {
        console.error("Error processing redirect sign-in result:", err);
      }
    };

    processRedirect();
  }, [navigate]);

  // ✅ Register
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

      // Register in backend DB (idempotent)
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

  // ✅ Login
  const handleLogin = async (e) => {
    const trimmedEmail = email.trim();
    e.preventDefault();
    setIsLoading(true);
    try {
      const userCred = await signInWithEmailAndPassword(auth, trimmedEmail, password);
      const firebaseUser = userCred.user;

      // Check role from Firestore
      let role = "customer";
      try {
        const adminDoc = await getDoc(doc(db, "admins", firebaseUser.email));
        if (adminDoc.exists()) {
          role = "admin";
        }
      } catch (err) {
        console.error("Error checking admin role:", err);
      }

      // Get token and store
      const token = await firebaseUser.getIdToken(true);
      localStorage.setItem("token", token);

      // Inform backend
      try {
        const resp = await fetch(`https://atomic-7jgw.onrender.com/api/users/set-role/${firebaseUser.uid}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ role }),
        });
        if (!resp.ok) {
          console.error("set-role failed", resp.status);
        }
      } catch (err) {
        console.error("Error calling set-role:", err);
      }

      // Check verification status
      const res = await fetch(`https://atomic-7jgw.onrender.com/api/users/is-verified/${firebaseUser.uid}`);
      const { isVerified } = await res.json();
      if (!isVerified) {
        toast.error("Please verify your email before logging in.");
        await signOut(auth);
        localStorage.setItem("verify-email", firebaseUser.email);
        navigate("/verify-email");
        return;
      }

      localStorage.setItem("role", role);
      localStorage.setItem("email", firebaseUser.email);
      toast.success("Login successful!");

      // Redirect based on role
      if (role === "admin") navigate("/admin");
      else navigate(location.state?.from?.pathname || "/");

    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Google sign-in
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      // Register in backend
      await fetch("https://atomic-7jgw.onrender.com/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firebaseUID: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || "",
        }),
      });

      // Determine role
      let role = "customer";
      try {
        const adminDoc = await getDoc(doc(db, "admins", firebaseUser.email));
        if (adminDoc.exists()) role = "admin";
      } catch (err) {
        console.error("Error checking admin role:", err);
      }

      const token = await firebaseUser.getIdToken(true);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("email", firebaseUser.email);

      toast.success("Signed in with Google!");
      if (role === "admin") navigate("/admin");
      else navigate("/");

    } catch (error) {
      console.error("Google sign-in failed:", error);
      toast.error(error.message || "Google sign-in failed.");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Logout
  const handleLogout = async () => {
    await signOut(auth);
    toast.info("Logged out successfully.");
  };

  return (
    <div className="container py-5">
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
            <>Don’t have an account? <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => setIsLogin(false)}>Register</span></>
          ) : (
            <>Already have an account? <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => setIsLogin(true)}>Login</span></>
          )}
        </p>

      
      </div>
    </div>
  );
};

export default Auth;
