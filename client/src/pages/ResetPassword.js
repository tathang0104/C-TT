import { useState} from "react";
import { Link, useParams, useNavigate  } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate()

  let { resetToken } = useParams();

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords don't match");
    }

    try {
      const { data } = await axios.put(
        `/api/auth/passwordreset/${resetToken}`,
        {
          password,
        },
        config
      );

      console.log(data);
      setSuccess(data.data);
      
      navigate("/dashboard")

    } catch (error) {
      setError(error.response.data.error);
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
              onSubmit={resetPasswordHandler}
              className="login-screen__form"
            >
              <h3 className="login-screen__title text-primary">Forgot Password</h3>
              {error && <span className="error-message">{error} </span>}
              {success && (
                <span className="success-message">
                  {success} <Link to="/login">Login</Link>
                </span>
              )}
              <div className="row">
                <div className="col-md-12 mt-3 mb-4">
                  <div className="form-floating">
                    <input
                      className="form-control"
                      type="password"
                      required
                      id="password"
                      placeholder="Enter new password"
                      autoComplete="true"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      tabIndex={1}
                    />
                    <label htmlFor="password">New Password:</label>
                  </div>
                </div>
                <div className="col-md-12 mt-3 mb-4">
                  <div className="form-floating">
                    <input
                      className="form-control"
                      type="password"
                      required
                      id="confirmpassword"
                      placeholder="Confirm new password"
                      autoComplete="true"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      tabIndex={2}
                    />
                    <label htmlFor="password">Confirm new Password:</label>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary mb-2" style={{padding: "12px", fontSize: "20px"}}>
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
