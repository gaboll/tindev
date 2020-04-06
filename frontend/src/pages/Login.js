import React, { useState } from 'react';

import api from '../services/api';

import './Login.css';
import logo from '../assets/logo.svg';

export default function Login({ history }) {
  const [username, setUserName] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post('/devs', {
      username,
    });

    const { id } = response.data

    history.push(`/dev/${id}`)
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Tindev" />
        <input
          placeholder="Digite seu usuário no GitHub"
          value={username}
          onChange={e => setUserName(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};