import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; // Make sure to import the eye icons

import authService from './authServices';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await authService.register({ email, password });
      if (res.token) {
        localStorage.setItem('token', res.token);
        navigate('/main');
      }
    } catch (err) {
      setError('Error registering user');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="auth-container fade-in">
      <h1>Create Account</h1>
      <div className='borderHeading'></div>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
          <label>Email</label>
        </div>
        <div className="input-group password-input-group">
          <input 
            type={showPassword ? "text" : "password"} 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
          <label>Password</label>
          <button 
            type="button" 
            className="password-toggle"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <div className="input-group password-input-group">
          <input 
            type={showConfirmPassword ? "text" : "password"} 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required
          />
          <label>Confirm Password</label>
          <button 
            type="button" 
            className="password-toggle"
            onClick={toggleConfirmPasswordVisibility}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <button type="submit">Register</button>
      </form>
      <div className="auth-switch">
        <p>Already have an account? <Link to="/">Login</Link></p>
      </div>
    </div>
  );
}

export default Register;
