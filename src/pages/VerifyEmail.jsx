
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const error = searchParams.get("error");
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (success === "true") {
      toast.success("🎉 Email verified successfully! You can now log in.");
      setTimeout(() => {
        navigate("/auth?mode=login&verified=true");
      }, 2000);
    }

    if (error) {
      let errorMessage = "Verification failed. Please try again.";
      switch (error) {
        case "invalid_token":
          errorMessage = "Invalid verification link.";
          break;
        case "user_not_found":
          errorMessage = "User not found. Please register again.";
          break;
        case "invalid_or_expired":
          errorMessage = "Verification link expired. Please request a new one.";
          break;
      }
      toast.error(errorMessage);
    }
  }, [success, error, navigate]);

  const resend = async () => {
    try {
      setSending(true);
      const email = localStorage.getItem("verify-email");
      if (!email) {
        toast.info("No email found. Please register again.");
        navigate("/auth?mode=register");
        return;
      }

      const res = await fetch("https://atomic-7jgw.onrender.com/api/users/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.success) toast.success("📩 Verification email resent!");
      else toast.error(data.message || "Failed to resend.");
    } catch (e) {
      toast.error("Resend failed. Try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="container py-5 text-center">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-5">
              {success === "true" ? (
                <div>
                  <div className="text-success mb-3">
                    <i className="fas fa-check-circle" style={{ fontSize: "4rem" }}></i>
                  </div>
                  <h3 className="text-success">🎉 Email Verified!</h3>
                  <p className="text-muted">Redirecting you to login page...</p>
                  <div className="mt-4">
                    <button 
                      className="btn btn-success"
                      onClick={() => navigate("/auth?mode=login&verified=true")}
                    >
                      Go to Login
                    </button>
                  </div>
                </div>
              ) : error ? (
                <div>
                  <div className="text-danger mb-3">
                    <i className="fas fa-exclamation-triangle" style={{ fontSize: "4rem" }}></i>
                  </div>
                  <h3 className="text-danger">Verification Failed</h3>
                  <p className="text-muted">There was an issue verifying your email.</p>
                  <div className="mt-4">
                    <button 
                      className="btn btn-primary me-2"
                      onClick={() => navigate("/auth?mode=register")}
                    >
                      Register Again
                    </button>
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={resend}
                      disabled={sending}
                    >
                      {sending ? "Sending..." : "Resend Email"}
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-info mb-3">
                    <i className="fas fa-envelope" style={{ fontSize: "4rem" }}></i>
                  </div>
                  <h3>Check Your Email</h3>
                  <p className="text-muted">We've sent you a verification link.</p>
                  <p className="text-muted">Please check your email and click the verification link.</p>
                  <div className="mt-4">
                    <button 
                      className="btn btn-outline-primary me-2"
                      onClick={() => navigate("/auth?mode=login")}
                    >
                      Back to Login
                    </button>
                    <button 
                      className="btn btn-primary"
                      onClick={resend}
                      disabled={sending}
                    >
                      {sending ? "Sending..." : "Resend Email"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
