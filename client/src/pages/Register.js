import { useState } from "react";
import { useDispatch } from 'react-redux';
import { register } from '../redux/actions';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const registerHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      dispatch(register.registerRequest({
        username,
        email,
        password,
      }));

      navigate("/")
    } catch (err) {
      console.log(err)
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
              <form onSubmit={registerHandler} className="login-screen__form">
                <h3 className="login-screen__title text-primary">REGISTER</h3>
                {error && <span className="error-message">{error}</span>}
                <div className="row">
                  <div className="col-md-12 mt-3 mb-4">
                    <div className="form-floating">
                      <input
                      type="  text"
                      className="form-control"
                      required
                      id="username"
                      value={username}
                      placeholder="Enter username"
                      tabIndex={1}
                      onChange={(e) => setUsername(e.target.value)}
                      />
                      <label htmlFor="username">Username:</label>
                    </div>
                  </div>
                  <div className="col-md-12 mt-3 mb-4">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        required
                        id="email"
                        placeholder="Enter email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        tabIndex={2}
                      />
                      <label htmlFor="email">Email:</label>
                    </div>
                  </div>
                  <div className="col-md-12 mt-3 mb-3">
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control"
                        required
                        id="password"
                        autoComplete="true"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        tabIndex={3}
                      />
                      <label htmlFor="password">Password:</label>
                    </div>
                  </div>
                  <div className="col-md-12 mt-3 mb-3">
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control"
                        required
                        id="password"
                        autoComplete="true"
                        placeholder="Enter password"
                        value={confirmpassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        tabIndex={3}
                      />
                      <label htmlFor="confirmpassword">Confirm Password:</label>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary mb-2" style={{padding: "12px", fontSize: "20px"}}>
                  Register
                </button>

                <span className="login-screen__subtext">
                  Already have an account? <Link to="/login">Login</Link>
                </span>
              </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
