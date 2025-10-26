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
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Show success message if coming from email verification
    if (verified) {
      toast.success("🎉 Email verified successfully! You can now log in.");
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // still set the user object even if not emailVerified; we handle verification after login
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [verified]);

  // Handle redirect result (used as a fallback when popup sign-in is blocked)
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

          const role = ADMIN_EMAILS.includes(firebaseUser.email) ? "admin" : "customer";
          try {
            const token = await firebaseUser.getIdToken(true);
            localStorage.setItem("token", token);
            const resp = await fetch(`https://atomic-7jgw.onrender.com/api/users/set-role/${firebaseUser.uid}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
              },
              body: JSON.stringify({ role }),
            });
            if (!resp.ok) {
              console.error('set-role (redirect) failed', resp.status, await resp.text());
            }
          } catch (tokenErr) {
            console.error('Failed to get ID token after redirect sign-in:', tokenErr);
          }

          localStorage.setItem("role", role);
          localStorage.setItem("email", firebaseUser.email);

          if (role === "admin") navigate("/admin");
          else navigate("/");
        }
      } catch (err) {
        console.error('Error processing redirect sign-in result:', err);
      }
    };

    processRedirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // 🔹 Login
  const handleLogin = async (e) => {
    const trimmedEmail = email.trim();
    e.preventDefault();
    setIsLoading(true);
    try {
      const userCred = await signInWithEmailAndPassword(auth, trimmedEmail  , password);
      const firebaseUser = userCred.user;

      // Determine role locally
let role = "customer";

try {
  // Check if the email exists in the 'admins' collection
  const adminDoc = await getDoc(doc(db, "admins", firebaseUser.email));
  if (adminDoc.exists()) {
    role = "admin";
  }
} catch (err) {
  console.error("Error checking admin role:", err);
}

      // Get Firebase ID token and store it (force refresh to avoid expired tokens)
      const token = await firebaseUser.getIdToken(true);
      localStorage.setItem("token", token);

      // Inform backend about role (protected endpoint)
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
          const text = await resp.text();
          console.error('set-role failed', resp.status, text);
          toast.warn('Warning: could not set role on backend (see console)');
        }
      } catch (err) {
        console.error('Error calling set-role:', err);
      }

      // Check backend verification status BEFORE redirecting
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

      // Redirect accordingly
      if (role === "admin") {
        navigate("/admin");
      } else {
        const from = location.state?.from?.pathname || "/";
        navigate(from);
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Google sign-in
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      let result;
      try {
        // Try popup first (fast UX). In some production environments popups are blocked which
        // causes auth/invalid-credential or popup-blocked-like errors. We'll catch and fallback.
        result = await signInWithPopup(auth, googleProvider);
      } catch (popupErr) {
        console.warn("signInWithPopup failed, attempting redirect fallback:", popupErr);
        // If popup fails (third-party cookies blocked, popup blocked), fall back to redirect.
        // We don't await here because redirect will navigate away. Provide informative logging.
        try {
          // dynamic import to avoid bundle issues in some environments
          const { signInWithRedirect } = await import("firebase/auth");
          await signInWithRedirect(auth, googleProvider);
          // Do not continue beyond this point; redirect will reload the app.
          return;
        } catch (redirectErr) {
          console.error("signInWithRedirect also failed:", redirectErr);
          throw redirectErr;
        }
      }

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

      // Determine role and set it on backend
      const role = ADMIN_EMAILS.includes(firebaseUser.email) ? "admin" : "customer";

      // Retrieve a fresh ID token and log debugging info to help diagnose invalid-credential in prod
      try {
        const token = await firebaseUser.getIdToken(true);
        console.debug("Google sign-in ID token retrieved, length:", token?.length);
        localStorage.setItem("token", token);

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
            const text = await resp.text();
            console.error('set-role failed', resp.status, text);
            toast.warn('Warning: could not set role on backend (see console)');
          } else {
            console.debug('set-role succeeded', await resp.text());
          }
        } catch (err) {
          console.error('Error calling set-role:', err);
        }
      } catch (tokenErr) {
        console.error('Failed to get ID token after Google sign-in:', tokenErr);
        toast.warn('Signed in with Google locally but failed to obtain ID token for backend calls.');
      }

      localStorage.setItem("role", role);
      localStorage.setItem("email", firebaseUser.email);

      // Redirect based on role
      if (role === "admin") navigate("/admin");
      else navigate("/");

      toast.success("Signed in with Google!");
    } catch (error) {
      console.error("Google sign-in failed:", error);
      toast.error(error.message || "Google sign-in failed.");
    } finally {
      setIsLoading(false);
    }
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
