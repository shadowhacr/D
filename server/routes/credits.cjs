const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataDir = path.join(__dirname, '..', 'data');
const usersFile = path.join(dataDir, 'users.json');
const creditsFile = path.join(dataDir, 'credits.json');

function readJSON(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// Get user credits
router.get('/:username', (req, res) => {
  const users = readJSON(usersFile);
  const user = users.find(u => u.username.toLowerCase() === req.params.username.toLowerCase());

  if (!user) return res.status(404).json({ error: 'User not found' });

  const credits = readJSON(creditsFile);
  const userCredits = credits.filter(c => c.username.toLowerCase() === req.params.username.toLowerCase());

  res.json({
    credits: user.credits,
    history: userCredits
  });
});

// Admin: Assign credits
router.post('/assign', (req, res) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== 'SHADOW') return res.status(403).json({ error: 'Unauthorized' });

  const { username, amount, note = '' } = req.body;

  if (!username || !amount || amount <= 0) {
    return res.status(400).json({ error: 'Username and positive amount required' });
  }

  const users = readJSON(usersFile);
  const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());

  if (!user) return res.status(404).json({ error: 'User not found' });

  user.credits += parseInt(amount);
  writeJSON(usersFile, users);

  // Log credit transaction
  const credits = readJSON(creditsFile);
  credits.unshift({
    id: Date.now().toString(),
    username,
    amount: parseInt(amount),
    type: 'added',
    note,
    timestamp: new Date().toISOString()
  });
  writeJSON(creditsFile, credits);

  res.json({ success: true, userCredits: user.credits });
});

// Admin: Remove credits
router.post('/remove', (req, res) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== 'SHADOW') return res.status(403).json({ error: 'Unauthorized' });

  const { username, amount, note = '' } = req.body;

  if (!username || !amount || amount <= 0) {
    return res.status(400).json({ error: 'Username and positive amount required' });
  }

  const users = readJSON(usersFile);
  const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());

  if (!user) return res.status(404).json({ error: 'User not found' });

  user.credits = Math.max(0, user.credits - parseInt(amount));
  writeJSON(usersFile, users);

  // Log credit transaction
  const credits = readJSON(creditsFile);
  credits.unshift({
    id: Date.now().toString(),
    username,
    amount: parseInt(amount),
    type: 'removed',
    note,
    timestamp: new Date().toISOString()
  });
  writeJSON(creditsFile, credits);

  res.json({ success: true, userCredits: user.credits });
});

module.exports = router;
