import { useState, useEffect } from "react";
// import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { login, getProfile } from '../redux/actions';
import { currentUserLoginedToken } from "../redux/selectors";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const userLoginedToken = useSelector(currentUserLoginedToken);
  const navigate = useNavigate()
  
  useEffect(() => {
    if (localStorage.getItem("authToken") && userLoginedToken ) {
      dispatch(getProfile.getProfileRequest(userLoginedToken));
      navigate("/dashboard")
    }
  }, [dispatch, navigate, userLoginedToken]);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(login.loginRequest(data));
      console.log(1)
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="login-screen">
      <form onSubmit={loginHandler} className="login-screen__form">
        <h3 className="login-screen__title">Login</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            value={data.email}
            tabIndex={1}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password:{" "}
            <Link to="/forgotpassword" className="login-screen__forgotpassword">
              Forgot Password?
            </Link>
          </label>
          <input
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Enter password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            value={data.password}
            tabIndex={2}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>

        <span className="login-screen__subtext">
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
