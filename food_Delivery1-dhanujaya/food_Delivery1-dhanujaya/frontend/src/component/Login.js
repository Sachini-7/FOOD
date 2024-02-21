import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import HeaderMain from "./Header";  // Assuming you have a HeaderMain component

function Login() {
  const [nic, setNic] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Load saved NIC and password from local storage
    const savedData = JSON.parse(localStorage.getItem('loginData'));
    if (savedData) {
      setNic(savedData.nic || '');
      setPassword(savedData.password || '');
    }
  }, []);

  const handleNicChange = (e) => {
    setNic(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to the backend for user login
      const response = await axios.post('http://localhost:8070/customers/loginCus', { nic, password });

      if (response.status === 200) {
        // Save the logged-in user's NIC to local storage
        localStorage.setItem('loggedInUserNIC', nic);
        setNic("");
        setPassword("");
        setLoginSuccess(true);
        navigate('/AllCus');
      } else {
        alert('Invalid NIC or password');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Invalid NIC or password');
      } else {
        console.error('An error occurred', error);
        alert('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div>
      <HeaderMain />
      <div className="background-container-yapa">
        <div className={`login-container-yapa center-vertically-sachini login-pag-sachini ${location.pathname === './images/background.jpg' ? 'login-bg-sachini' : ''}`}>
          <h1>Login</h1>
          <br></br>
          {loginSuccess ? (
            <p className="success-message-sachini">Login successful!</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group-sachini">
                <label htmlFor="nic">NIC </label>
                <input
                  type="text"
                  id="nic"
                  name="nic"
                  value={nic}
                  onChange={handleNicChange}
                  required
                  autoComplete="off"
                  style={{ textAlign: 'center' }}
                />
              </div>
              <div className="form-group-sachini">
                <label htmlFor="password">Password </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  autoComplete="off"
                  style={{ textAlign: 'center' }}
                />
              </div>
              <div className="form-group-sachini">
                <button type="submit">Login</button>
              </div>
              <p className="signup-message-sachini">
                Haven't an account?{' '}
              </p>
              <center>
                <Link to="/add" className="signup-link-sachini">
                  Sign up
                </Link>
              </center>
            </form>
          )}
          {errorMessage && <p className="error-message-sachini">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;

