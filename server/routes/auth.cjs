const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataDir = path.join(__dirname, '..', 'data');
const usersFile = path.join(dataDir, 'users.json');
const activityFile = path.join(dataDir, 'activity.json');

function readUsers() {
  return JSON.parse(fs.readFileSync(usersFile, 'utf8'));
}

function writeUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

function logActivity(action, details) {
  const activities = JSON.parse(fs.readFileSync(activityFile, 'utf8'));
  activities.unshift({
    id: Date.now().toString(),
    action,
    details,
    timestamp: new Date().toISOString()
  });
  if (activities.length > 1000) activities.pop();
  fs.writeFileSync(activityFile, JSON.stringify(activities, null, 2));
}

// Check username availability
router.get('/check/:username', (req, res) => {
  const users = readUsers();
  const exists = users.find(u => u.username.toLowerCase() === req.params.username.toLowerCase());
  res.json({ available: !exists });
});

// Register
router.post('/register', (req, res) => {
  const { username } = req.body;
  if (!username || username.trim().length < 3) {
    return res.status(400).json({ error: 'Username must be at least 3 characters' });
  }

  const users = readUsers();
  if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
    return res.status(400).json({ error: 'Username already taken' });
  }

  const newUser = {
    id: Date.now().toString(),
    username: username.trim(),
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    deploysToday: 0,
    lastDeployDate: null,
    totalDeploys: 0,
    credits: 0,
    isAdmin: false,
    isBanned: false
  };

  users.push(newUser);
  writeUsers(users);
  logActivity('USER_REGISTER', { username });

  res.json({ success: true, user: newUser });
});

// Login
router.post('/login', (req, res) => {
  const { username } = req.body;
  const users = readUsers();
  const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (user.isBanned) {
    return res.status(403).json({ error: 'Account banned' });
  }

  user.lastLogin = new Date().toISOString();
  writeUsers(users);
  logActivity('USER_LOGIN', { username });

  res.json({ success: true, user });
});

// Get user by username
router.get('/user/:username', (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.username.toLowerCase() === req.params.username.toLowerCase());
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// Get all users (admin)
router.get('/users', (req, res) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== 'SHADOW') return res.status(403).json({ error: 'Unauthorized' });

  const users = readUsers();
  res.json(users);
});

module.exports = router;
