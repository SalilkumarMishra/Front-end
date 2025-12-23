import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const submit = (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Email and password required'); return; }

    const ok = signup(email, password);
    if (ok) {
      alert('Account created (demo). You can now login.');
      navigate('/login');
    } else {
      setError('Account already exists.');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card p-4" style={{maxWidth:420, width:'100%'}}>
        <h4 className="text-center mb-3">Create Account</h4>

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

          <Button type="submit" className="w-100">Sign Up</Button>
        </form>

        <div className="mt-3 text-center">
          <small>Already have an account? <Link to="/login">Sign in</Link></small>
        </div>
      </div>
    </div>
  );
};

export default Signup;
