import { useState } from 'react';
import axios from 'axios';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Form validation
    if (!email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', { email, password });
      console.log(response.data?.data?.token);
      localStorage.setItem('token', response.data?.data?.token);
      window.location.href = '/eventDisplay';  // Redirect to the dashboard
    } catch (err) {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
      <a href="/signup">Sign up</a>
    </div>
  );
};

export default Login;
