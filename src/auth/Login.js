import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import authService from './authServices';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await authService.login({ email, password });
      if (res.token) {
        localStorage.setItem('token', res.token);
        navigate('/main');
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-container fade-in">
      <h1 className='heading1'>Welcome Back</h1>
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
        <button type="submit">Login</button>
      </form>
      <div className="auth-switch">
        <p>Don't have an account? <Link to="/register">Sign up</Link></p>
      </div>
    </div>
  );
}

export default Login;
