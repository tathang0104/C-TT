import { useState, useEffect } from "react";
// import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { login, getProfile } from '../redux/actions';
import { currentUserLogined, currentUserLoginedToken } from "../redux/selectors";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const userLoginedToken = useSelector(currentUserLoginedToken);
  const userLogined = useSelector(currentUserLogined);
  const navigate = useNavigate()
  
  useEffect(() => {
    if (localStorage.getItem("authToken") && userLoginedToken ) {
      dispatch(getProfile.getProfileRequest(userLoginedToken));
    }
  }, [dispatch, userLoginedToken]);

  useEffect(() => {
    if (userLogined) {
      localStorage.setItem("userLoginedRole", userLogined?.user?.role)
    }
    userLogined?.user.role === "ADMIN" && navigate("/dashboard")
    userLogined?.user.role === "USER" && navigate("/")
  },[navigate, userLogined])
  
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(login.loginRequest(data));
      
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
            <form onSubmit={loginHandler} className="login-screen__form">
              <h1 className="login-screen__title text-primary">LOGIN</h1>
              {error && <span className="error-message">{error}</span>}
              <div className="row">
                <div className="col-md-12 mt-3 mb-4">
                  <div className="form-floating">
                    <input
                    type="email"
                    className="form-control"
                    required
                    id="email"
                    placeholder="Email address"
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    value={data.email}
                    tabIndex={1}
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
                      tabIndex={2}
                      onChange={(e) => setData({ ...data, password: e.target.value })}
                    />
                    <label htmlFor="password">Password:</label>
                  </div>
                </div>
              </div>
            
              <Link to="/forgotpassword" className="login-screen__forgotpassword mb-3">
                Forgot Password?
              </Link>
              <button type="submit" className="btn btn-primary mb-2" style={{padding: "12px", fontSize: "20px"}}>
                Login
              </button>

              <div className="login-screen__subtext mt-2">
                Don't have an account? <Link to="/register">Register</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
