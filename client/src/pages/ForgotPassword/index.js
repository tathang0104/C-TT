import { useState } from "react";
import axios from "axios";
import "./style.css"

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/forgotpassword",
        { email },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="login-screen">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-8">
            <div className="back-ground"></div>
          </div>
          <div className="col-md-4">
            <form
              onSubmit={forgotPasswordHandler}
              className="login-screen__form"
            >
              <h3 className="login-screen__title text-primary">Forgot Password</h3>
              {error && <span className="error-message">{error}</span>}
              {success && <span className="success-message">{success}</span>}
                <p className="forgotpassword-screen__subtext">
                  Please enter the email address you register your account with. We
                  will send you reset password confirmation to this email
                </p>
              <div className="row">
                <div className="col-md-12 mt-3 mb-4">
                  <div className="form-floating">
                    <input
                    type="email"
                    className="form-control"
                    required
                    id="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    tabIndex={1}
                    />
                    <label htmlFor="email">Email:</label>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary mb-2" style={{padding: "12px", fontSize: "20px"}}>
                Send Email
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
