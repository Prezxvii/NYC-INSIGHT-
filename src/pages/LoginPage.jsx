// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff, LogIn } from 'lucide-react';
import '../styles/AuthPages.css';

const GOOGLE_ICON_URL = 'https://cdn.brandfetch.io/id6O2oGzv-/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const handleGoogleLogin = () => {
    console.log('Login with Google');
  };

  return (
    <div className="auth-page">
      <motion.div
        className="auth-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button className="back-button" onClick={() => navigate('/')}
        >
          <ArrowLeft size={24} />
        </button>

        <div className="auth-content">
          <h1 className="auth-title">
            <LogIn size={22} /> Welcome Back
          </h1>
          <p className="auth-subtitle">Sign in to continue</p>

          <button className="google-button" onClick={handleGoogleLogin}>
            <img src={GOOGLE_ICON_URL} alt="Google" className="google-icon" />
            Login with Google
          </button>

          <div className="divider"><span>or login with email</span></div>

          <form onSubmit={handleSubmit} className="auth-form">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />

            <div className="form-group password-group">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-input"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="form-footer">
              <a href="/forgot-password" className="forgot-link">Forgot Password?</a>
            </div>

            <button type="submit" className="submit-button">Login</button>
          </form>

          <p className="auth-footer">
            Don&apos;t have an account? <Link to="/signup">Sign Up →</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;

