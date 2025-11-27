import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password123');
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { loading, error, token } = useSelector(s => s.auth);

  React.useEffect(() => { if (token) nav('/notes'); }, [token]);

  const submit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div style={{ maxWidth: 420, margin: '40px auto' }}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" />
        <br />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" type="password" />
        <br />
        <button disabled={loading}>{loading ? 'Logging...' : 'Login'}</button>
      </form>
      {error && <p style={{color:'red'}}>{String(error)}</p>}
    </div>
  );
}
