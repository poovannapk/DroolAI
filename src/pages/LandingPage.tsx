import React, { useState } from 'react';
import { FiSend } from "react-icons/fi";
import './LandingPage.css';

const API_URL = 'http://localhost:4000';

export default function LandingPage() {
  const [input, setInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(localStorage.getItem('jwt'));
  const [error, setError] = useState<string | null>(null);

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const endpoint = mode === 'login' ? 'login' : 'signup';
    const res = await fetch(`${API_URL}/api/auth/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.token) {
      setToken(data.token);
      localStorage.setItem('jwt', data.token);
      setShowModal(false);
    } else {
      setError(data.message || 'Authentication failed');
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-100 via-cyan-200 to-lime-200">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-8 py-6 bg-white bg-opacity-80 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🤖</span>
          <span className="font-bold text-2xl text-gray-800 tracking-tight">DroolAI</span>
        </div>
        <nav className="flex gap-8 text-gray-700 font-medium">
          <a href="#" className="hover:text-teal-600">Community</a>
          <a href="#" className="hover:text-teal-600">Enterprise</a>
          <a href="#" className="hover:text-teal-600">Learn</a>
          <a href="#" className="hover:text-teal-600">Shipped</a>
        </nav>
        <div>
          {/* Show user info if logged in, else show Login button */}
          {token ? (
            <span className="text-teal-700 font-semibold">Welcome!</span>
          ) : (
            <button
              className="bg-teal-100 text-teal-700 px-4 py-2 rounded-full font-semibold shadow hover:bg-teal-200 transition"
              onClick={() => { setShowModal(true); setMode('login'); }}
            >
              Login
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 min-h-[600px] md:min-h-[700px] lg:min-h-[800px]">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
          Build something <span className="typewriter inline-block align-middle text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-cyan-500 to-lime-400">AImazing</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-700 mb-8 max-w-2xl">
          Unleash the power of AI for your business, projects, and creativity. Join DroolAI and start building smarter today.
        </p>
        <div className="w-full max-w-md flex items-center bg-white bg-opacity-80 rounded-xl shadow p-2">
          <input
            className="flex-1 px-4 py-2 rounded-l-xl focus:outline-none text-gray-700"
            type="text"
            placeholder="Ask anything about AI..."
            value={input}
            onChange={e => {
              setInput(e.target.value);
            }}
          />
          <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-r-xl font-semibold transition flex items-center justify-center text-xl" onClick={e => {
              if (!token) {
                setShowModal(true);
                setMode('login');
                return;
              }
              setInput(e.target.value);
            }}>
            <FiSend />
          </button>
        </div>
      </main>

      {/* Modal for Login/Signup */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative animate-fade-in">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-center text-teal-700 mb-6">
              {mode === 'login' ? 'Login to DroolAI' : 'Sign Up for DroolAI'}
            </h2>
            <div className="flex justify-center mb-6">
              <button
                className={`px-4 py-2 rounded-l-full font-semibold transition ${
                  mode === 'login'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-teal-100'
                }`}
                onClick={() => setMode('login')}
              >
                Login
              </button>
              <button
                className={`px-4 py-2 rounded-r-full font-semibold transition ${
                  mode === 'signup'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-teal-100'
                }`}
                onClick={() => setMode('signup')}
              >
                Sign Up
              </button>
            </div>
            <form onSubmit={handleAuth} className="space-y-4">
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition"
              >
                {mode === 'login' ? 'Login' : 'Sign Up'}
              </button>
            </form>
            {error && <div className="text-red-500 text-center mt-4">{error}</div>}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full bg-white bg-opacity-90 border-t border-gray-100 py-8 px-4 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Logo */}
          <div className="mb-8 md:mb-0 flex-shrink-0 flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 via-cyan-400 to-lime-400 flex items-center justify-center shadow">
              <span className="text-2xl font-bold text-white">D</span>
            </div>
          </div>
          {/* Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 flex-1">
            <div>
              <h3 className="font-semibold mb-2 text-gray-800">Company</h3>
              <ul className="space-y-1">
                <li><a href="#" className="hover:text-teal-600">Blog</a></li>
                <li><a href="#" className="hover:text-teal-600">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gray-800">Product</h3>
              <ul className="space-y-1">
                <li><a href="#" className="hover:text-teal-600">Import from Figma</a></li>
                <li className="flex items-center gap-1">
                  <a href="#" className="hover:text-teal-600">Videos</a>
                  <span className="inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                </li>
                <li><a href="#" className="hover:text-teal-600">Roadmap</a></li>
                <li><a href="#" className="hover:text-teal-600">Status</a></li>
                <li><a href="#" className="hover:text-teal-600">Changelog</a></li>
                <li><a href="#" className="hover:text-teal-600">Pricing</a></li>
                <li><a href="#" className="hover:text-teal-600">Solutions</a></li>
                <li><a href="#" className="hover:text-teal-600">Hire a Partner</a></li>
                <li><a href="#" className="hover:text-teal-600">How-To Guides</a></li>
                <li><a href="#" className="hover:text-teal-600">Become a Partner</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gray-800">Resources</h3>
              <ul className="space-y-1">
                <li><a href="#" className="hover:text-teal-600">Launched</a></li>
                <li><a href="#" className="hover:text-teal-600">Enterprise</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gray-800">Support</h3>
              <ul className="space-y-1">
                <li><a href="#" className="hover:text-teal-600">Contact</a></li>
                <li><a href="#" className="hover:text-teal-600">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gray-800">Legal</h3>
              <ul className="space-y-1">
                <li><a href="#" className="hover:text-teal-600">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-teal-600">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400 text-xs">
          &copy; {new Date().getFullYear()} DroolAI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}