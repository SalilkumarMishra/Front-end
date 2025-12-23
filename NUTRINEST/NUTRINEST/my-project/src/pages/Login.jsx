import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

const Login = () => {
const { login } = useAuth();
const navigate = useNavigate();

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');

const submit = (e) => {
  e.preventDefault();
  const ok = login(email, password); // Pass credentials to login function
  if (ok) {
    navigate('/');
  } else {
    setError('Invalid credentials.');
  }
};




  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light ">
      <div className="card p-4 fixed-element" style={{maxWidth:420, width:'100%'}}>
        <h4 className="text-center mb-3">Admin Sign In</h4>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label small">Email</label>
            <input className="form-control" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label small">Password</label>
            <input className="form-control" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          </div>

          <Button type="submit" className="w-100">Sign In</Button>
        </form>

        <div className="mt-3 text-center">
          <small>Don't have an account? <Link to="/signup">Sign up</Link></small>
        </div>

        <div className="mt-3 p-2 bg-light border rounded">
          <small className="text-muted">Demo: <strong>admin@gmail.com</strong> / <strong>admin123</strong></small>
        </div>
      </div>
    </div>
  );
};

export default Login;
