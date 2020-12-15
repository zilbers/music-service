import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { create } from '../modules/axios-module';
import '../CSS/Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    create('register', { email, password }).then((res) =>
      res.status === 200 ? history.push('/') : null
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <h1>Register</h1>
        <p>Please fill in this form to create an account.</p>

        <label for="email">
          <b>Email</b>
        </label>
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label for="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          id="psw"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label for="psw-repeat">
          <b>Repeat Password</b>
        </label>
        <input
          type="password"
          placeholder="Repeat Password"
          name="psw-repeat"
          id="psw-repeat"
          required
        />

        <p>
          By creating an account you agree to our{' '}
          <a href="#">Terms & Privacy</a>.
        </p>
        <button type="submit" className="registerbtn">
          Register
        </button>
      </div>

      <div className="container signin">
        <p>
          Already have an account? <a href="/">Sign in</a>.
        </p>
      </div>
    </form>
  );
}

export default Register;
