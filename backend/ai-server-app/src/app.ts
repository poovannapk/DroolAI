const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = 'your_secret_key';

// Dummy login route
app.post('/api/auth/login', (req, res) => {
  const { username } = req.body;
  // In production, validate username/password!
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// JWT middleware
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Protected AI chat endpoint
app.post('/api/ai/chat', authenticateJWT, (req, res) => {
  const { message } = req.body;
  // Simulate AI response
  res.json({ response: `AI says: ${message.split('').reverse().join('')}` });
});

app.listen(4000, () => console.log('Server running on http://localhost:4000'));