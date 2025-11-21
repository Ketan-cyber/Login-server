// app.js
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const USERS_FILE = path.join(__dirname, 'users.json');
if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, JSON.stringify([],'',2));

const app = express();
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'change_this_secret';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name: 'sid',
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

function readUsers() {
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE));
  } catch (e) {
    return [];
  }
}
function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// API: register
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password || password.length < 6) {
    return res.status(400).json({ error: 'Username and password (min 6 chars) required.' });
  }
  const users = readUsers();
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ error: 'Username already exists.' });
  }
  const hashed = await bcrypt.hash(password, 10);
  users.push({ id: Date.now(), username, password: hashed });
  writeUsers(users);
  req.session.user = { username };
  res.json({ ok: true });
});

// API: login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ error: 'Invalid credentials.' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: 'Invalid credentials.' });
  req.session.user = { username };
  res.json({ ok: true });
});

// API: logout
app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: 'Logout failed.' });
    res.clearCookie('sid');
    res.json({ ok: true });
  });
});

// API: check auth & get user
app.get('/api/me', (req, res) => {
  if (!req.session.user) return res.status(401).json({ error: 'unauthenticated' });
  res.json({ user: req.session.user });
});

// Serve dashboard only if logged in (fallback)
app.get('/dashboard', (req, res) => {
  if (!req.session.user) return res.redirect('/');
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Start
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

