import { useNavigate } from "react-router-dom";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Terms & Conditions</h2>

      <p>
        Welcome to <strong>Atomic MAS</strong>. By registering and using our
        platform, you agree to the following terms and conditions:
      </p>

      <ul>
        <li>
          <strong>Account Responsibility:</strong> You are responsible for
          maintaining the confidentiality of your account and password.
        </li>
        <li>
          <strong>Accurate Information:</strong> You agree to provide accurate,
          current, and complete information when registering.
        </li>
        <li>
          <strong>Prohibited Activities:</strong> You may not use the platform
          for any unlawful or unauthorized purpose.
        </li>
        <li>
          <strong>Email Verification:</strong> Registration requires a valid
          email address that must be verified before access is granted.
        </li>
        <li>
          <strong>Privacy:</strong> We value your privacy. Your data will not be
          shared with third parties except as required by law.
        </li>
        <li>
          <strong>Modifications:</strong> We may update these terms at any time,
          and continued use of the platform means you accept the new terms.
        </li>
      </ul>

      <p className="mt-4">
        If you do not agree with these terms, please discontinue using the
        platform.
      </p>

      <div className="text-center mt-5">
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Terms;
