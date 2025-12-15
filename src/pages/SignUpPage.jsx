// src/pages/SignUpPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff, UserPlus } from 'lucide-react';
import '../styles/AuthPages.css';

const GOOGLE_ICON_URL = 'https://cdn.brandfetch.io/id6O2oGzv-/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const handleGoogleSignUp = () => {
    console.log('Sign up with Google');
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
            <UserPlus size={22} /> Create Account
          </h1>
          <p className="auth-subtitle">Get started with NYC Insight</p>

          <button className="google-button" onClick={handleGoogleSignUp}>
            <img src={GOOGLE_ICON_URL} alt="Google" className="google-icon" />
            Sign Up with Google
          </button>

          <div className="divider"><span>or sign up with email</span></div>

          <form onSubmit={handleSubmit} className="auth-form">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="form-input"
            />

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

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="terms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
              />
              <label htmlFor="terms">
                I agree to the <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" className="submit-button">Create Account</button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Login →</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;

