import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { sendEmailVerification } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  // Check user and send verification email on page load
  useEffect(() => {
    const checkUserAndSendEmail = async () => {
      const user = auth.currentUser;
      if (user) {
        await user.reload();
        setEmail(user.email);

        if (!user.emailVerified) {
          try {
            await sendEmailVerification(user);
            toast.success("Verification email sent!");
          } catch (error) {
            console.error("Send failed:", error.message);
            toast.error("Failed to send verification email.");
          }
        } else {
          toast.success("Email already verified!");
          navigate("/");
        }
      } else {
        // Fallback if session expired
        const storedEmail = localStorage.getItem("verify-email");
        if (storedEmail) setEmail(storedEmail);
        toast.error("Session expired. Please login again.");
      }
    };

    checkUserAndSendEmail();
  }, [navigate]);

  // Handle Resend
  const handleResend = async () => {
    
    const user = auth.currentUser;
    if (!user) {
      toast.error("No user found. Please log in again.");
      return;
    }

    try {
      await user.reload();
      if (user.emailVerified) {
        setVerified(true);
        toast.info("Email already verified.");
      } else {
        await sendEmailVerification(user);
        
        toast.success("Verification email resent!");
      }
    } catch (error) {
      console.error("Resend error:", error.message);
      toast.error("Could not resend verification email.");
    }
   
  };

  // Auto-check every 3 sec
  useEffect(() => {
    const interval = setInterval(async () => {
      const user = auth.currentUser;
      if (user) {
        await user.reload();
        if (user.emailVerified) {
          toast.success("Email verified! Redirecting to login...");
          localStorage.removeItem("verify-email");
          clearInterval(interval);
          setTimeout(() => navigate("/login"), 2000);
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="container py-5 text-center">
      <h2>Verify Your Email</h2>
      <p>
        A verification link has been sent to:{" "}
        <strong>{email || "your email"}</strong>. Please check your inbox.
      </p>
      <button  className="btn btn-warning mt-3" onClick={handleResend} >Resend Verification Email</button>

      
    </div>
  );
};

export default VerifyEmail;












// import { useEffect, useState } from "react";
// import { auth } from "../firebase";
// import { sendEmailVerification } from "firebase/auth";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const VerifyEmail = () => {
//   const [email, setEmail] = useState("");
//     const [verified, setVerified] = useState(false);

//   const navigate=useNavigate()

// useEffect(() => {
//   const checkAndSendVerification = async () => {
//     try {
//       const user = auth.currentUser;

//       if (!user) {
//         // User is not logged in (session expired or not properly set)
//         const storedEmail = localStorage.getItem("verify-email");
//         if (storedEmail) {
//           setEmail(storedEmail);
//         }
//         toast.error("User not found. Please log in again.");
//         return;
//       }

//       await user.reload(); // Make sure we get the latest state
//       setEmail(user.email);

//       if (!user.emailVerified) {
//         await sendEmailVerification(user); // Only call this if user exists and is unverified
//         toast.success("Verification email sent!");
//       } else {
//         toast.success("Email already verified!");
//         navigate("/");
//       }

//     } catch (error) {
//       console.error("Verification Error:", error);
//       toast.error("Failed to send verification email. Please try again.");
//     }
//   };

//   checkAndSendVerification();
// }, []);



// //  useEffect(() => {
// //   const user = auth.currentUser;
// //   if (user) {
// //     setEmail(user.email);
// //     if (!user.emailVerified) {
// //       sendEmailVerification(user)
// //         .then(() => {
// //           toast.success("Verification email sent!");
// //         })
// //         .catch((error) => {
// //           toast.error("Failed to send verification email.");
// //         });
// //     }
// //   } else {
// //     const storedEmail = localStorage.getItem("verify-email");
// //     if (storedEmail) {
// //       setEmail(storedEmail);
// //     }
// //   }
// // }, []);

//   const handleResend = async () => {
//     const user = auth.currentUser;

//     if (user) {
//           await user.reload(); 
//       try {
        
//         if (user.emailVerified) {
//            setVerified(true);
//           toast.info("Email already verified.");
//         } else {
//           await sendEmailVerification(user);
//           toast.success("Verification email resent!");
//         }
//       } catch (error) {
//         console.error("Resend Error:", error.message);
//         toast.error("Failed to resend email. Please try again.");
//       }
//     } else {
//       toast.error("No user found. Please register first.");
//     }
//   };

//     useEffect(() => {
//     const interval = setInterval(async () => {
//       const user = auth.currentUser;
//       if (user) {
//         await user.reload(); 
//         if (user.emailVerified) {
//           toast.success("Email verified! Redirecting to login...");
//           clearInterval(interval);
//           localStorage.removeItem("verify-email"); 
//           setTimeout(() => navigate("/login"), 2000);
//         }
//       }
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [navigate]);

//   return (
//     <div className="container py-5 text-center">
//       <h2>Verify Your Email</h2>
//       <p>
//         A verification link has been sent to your email address:{" "}
//         <strong>{email}</strong>. Please check your inbox or spam folder.
//       </p>
//       <button className="btn btn-warning" onClick={handleResend}>
//         Resend Verification Email
//       </button>
//     </div>
//   );
// };

// export default VerifyEmail;
