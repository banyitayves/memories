import React, { useState } from 'react';
import '../styles/Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isSignup) {
      if (!name || !email || !password) {
        setError('All fields are required');
        return;
      }
      const userData = {
        id: Date.now(),
        name,
        email,
        createdAt: new Date().toLocaleDateString(),
        folders: ['Documents', 'Images', 'Videos'],
        files: []
      };
      onLogin(userData);
    } else {
      if (!email || !password) {
        setError('Email and password are required');
        return;
      }
      const userData = {
        id: 1,
        name: 'John Doe',
        email,
        createdAt: new Date().toLocaleDateString(),
        folders: ['Documents', 'Images', 'Videos', 'Projects'],
        files: []
      };
      onLogin(userData);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>☁️ CloudVault</h1>
          <p>500GB Cloud Storage</p>
        </div>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-primary">
            {isSignup ? 'Create Account' : 'Login'}
          </button>
        </form>

        <div className="toggle-mode">
          <p>
            {isSignup ? 'Already have an account? ' : "Don't have an account? "}
            <button
              type="button"
              onClick={() => {
                setIsSignup(!isSignup);
                setError('');
              }}
              className="link-btn"
            >
              {isSignup ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </div>

        <div className="features">
          <h3>Features:</h3>
          <ul>
            <li>✓ 500GB Storage Space</li>
            <li>✓ File Upload & Download</li>
            <li>✓ Folder Organization</li>
            <li>✓ File Search & Filter</li>
            <li>✓ Share Files with Others</li>
            <li>✓ File Preview</li>
            <li>✓ Version Control</li>
            <li>✓ Drag & Drop Support</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Login;
