import React, { MouseEventHandler, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = { userEmail: email, userPw: password };
    const res = await axios.post('http://localhost:8080/api/auth/login', form);
    console.log(res);
    if (res.status === 200) {
      window.localStorage.setItem('token', res.data.token);
      navigate('/');
    }
  };
  useEffect(() => {}, []);
  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default LoginPage;
