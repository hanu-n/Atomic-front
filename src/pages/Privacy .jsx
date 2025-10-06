import { useNavigate } from "react-router-dom";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Privacy Policy</h2>

      <p>
        At <strong>Atomic MAS</strong>, we are committed to protecting your
        personal information and respecting your privacy. This Privacy Policy
        explains how we handle your data when you use our platform.
      </p>

      <ul>
        <li>
          <strong>Information We Collect:</strong> When you register, we collect
          basic information such as your name, email, and password. Additional
          details (phone, address, etc.) may be requested for orders.
        </li>
        <li>
          <strong>Use of Information:</strong> We use your information to create
          accounts, process orders, send verification emails, and improve our
          services.
        </li>
        <li>
          <strong>Data Security:</strong> We use encryption and secure storage
          to protect your information. However, no method of transmission over
          the internet is 100% secure.
        </li>
        <li>
          <strong>Third-Party Services:</strong> We may use trusted third-party
          tools (e.g., payment providers, Firebase) but they are not allowed to
          use your information for their own purposes.
        </li>
        <li>
          <strong>Your Rights:</strong> You can request access, correction, or
          deletion of your personal data at any time by contacting us.
        </li>
        <li>
          <strong>Cookies:</strong> Our platform may use cookies to improve user
          experience. You can disable cookies in your browser if you prefer.
        </li>
      </ul>

      <p className="mt-4">
        By using our platform, you agree to the practices described in this
        Privacy Policy.
      </p>

      <div className="text-center mt-5">
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Privacy;
