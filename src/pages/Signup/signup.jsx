import { useState } from 'react';
import axios from 'axios';
import './signup.css'

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    try {
      await axios.post('http://localhost:4000/api/auth/signup', { name, email, password });
      window.location.href = '/login';  // Redirect to Login page
    } catch (err) {
      setErrorMessage('Error signing up. Try again later.')
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
