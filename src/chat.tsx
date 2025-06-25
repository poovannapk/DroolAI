import React, { useState } from 'react';

const API_URL = 'http://localhost:4000';

export default function Chat() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('jwt'));
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Dummy login
  async function login() {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'user1' }),
    });
    const data = await res.json();
    setToken(data.token);
    localStorage.setItem('jwt', data.token);
  }

  async function sendMessage() {
    if (!token) {
      setError('Not authenticated');
      return;
    }
    setError(null);
    const res = await fetch(`${API_URL}/api/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message }),
    });
    if (!res.ok) {
      setError('Failed to send message');
      return;
    }
    const data = await res.json();
    setChat((prev) => [...prev, `You: ${message}`, `AI: ${data.response}`]);
    setMessage('');
  }

  return (
    <div>
      {!token ? (
        <button onClick={login}>Login</button>
      ) : (
        <div>
          <div style={{ minHeight: 100, border: '1px solid #ccc', marginBottom: 8, padding: 8 }}>
            {chat.map((line, i) => <div key={i}>{line}</div>)}
          </div>
          <input
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={sendMessage}>Send</button>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
      )}
    </div>
  );
}