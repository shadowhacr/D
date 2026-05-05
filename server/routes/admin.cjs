const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataDir = path.join(__dirname, '..', 'data');
const usersFile = path.join(dataDir, 'users.json');
const deploymentsFile = path.join(dataDir, 'deployments.json');
const adminFile = path.join(dataDir, 'admin.json');
const activityFile = path.join(dataDir, 'activity.json');
const templatesMetaFile = path.join(dataDir, 'templatesMeta.json');
const creditsFile = path.join(dataDir, 'credits.json');

function readJSON(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// Middleware to check admin password
function adminAuth(req, res, next) {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== 'SHADOW') {
    return res.status(403).json({ error: 'Invalid admin password' });
  }
  next();
}

// Login
router.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === 'SHADOW') {
    res.json({ success: true, token: 'SHADOW' });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
});

// Change password
router.post('/change-password', adminAuth, (req, res) => {
  const { newPassword } = req.body;
  if (!newPassword || newPassword.length < 4) {
    return res.status(400).json({ error: 'Password must be at least 4 characters' });
  }

  const admin = readJSON(adminFile);
  admin.password = newPassword;
  writeJSON(adminFile, admin);

  // Update all files that check for SHADOW
  res.json({ success: true, message: 'Password changed. Restart server to apply.' });
});

// Get dashboard stats
router.get('/stats', adminAuth, (req, res) => {
  const users = readJSON(usersFile);
  const deployments = readJSON(deploymentsFile);
  const admin = readJSON(adminFile);
  const meta = readJSON(templatesMetaFile);

  // Today's deployments
  const today = new Date().toISOString().split('T')[0];
  const todayDeploys = deployments.filter(d => d.deployedAt.startsWith(today));

  // This week's deployments
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekDeploys = deployments.filter(d => new Date(d.deployedAt) >= weekAgo);

  res.json({
    totalUsers: users.length,
    totalDeployments: deployments.length,
    totalTemplates: meta.templates.length,
    todayDeploys: todayDeploys.length,
    weekDeploys: weekDeploys.length,
    maintenanceMode: admin.maintenanceMode,
    freeDeploysPerDay: admin.limits.freeDeploysPerDay
  });
});

// Get all users
router.get('/users', adminAuth, (req, res) => {
  const users = readJSON(usersFile);
  res.json(users);
});

// Ban/unban user
router.post('/user/ban', adminAuth, (req, res) => {
  const { username, ban } = req.body;
  const users = readJSON(usersFile);
  const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());

  if (!user) return res.status(404).json({ error: 'User not found' });

  user.isBanned = ban;
  writeJSON(usersFile, users);

  res.json({ success: true, user });
});

// Get all deployments
router.get('/deployments', adminAuth, (req, res) => {
  const deployments = readJSON(deploymentsFile);
  res.json(deployments);
});

// Get theme settings
router.get('/theme', adminAuth, (req, res) => {
  const admin = readJSON(adminFile);
  res.json(admin.theme);
});

// Update theme
router.post('/theme', adminAuth, (req, res) => {
  const admin = readJSON(adminFile);
  admin.theme = { ...admin.theme, ...req.body };
  writeJSON(adminFile, admin);
  res.json({ success: true, theme: admin.theme });
});

// Get contact info
router.get('/contact', adminAuth, (req, res) => {
  const admin = readJSON(adminFile);
  res.json(admin.contact);
});

// Update contact info
router.post('/contact', adminAuth, (req, res) => {
  const admin = readJSON(adminFile);
  admin.contact = { ...admin.contact, ...req.body };
  writeJSON(adminFile, admin);
  res.json({ success: true, contact: admin.contact });
});

// Toggle maintenance mode
router.post('/maintenance', adminAuth, (req, res) => {
  const { enabled, message } = req.body;
  const admin = readJSON(adminFile);
  admin.maintenanceMode = enabled;
  if (message) admin.maintenanceMessage = message;
  writeJSON(adminFile, admin);
  res.json({ success: true, maintenanceMode: enabled });
});

// Get maintenance status (public)
router.get('/maintenance-status', (req, res) => {
  const admin = readJSON(adminFile);
  res.json({
    enabled: admin.maintenanceMode,
    message: admin.maintenanceMessage
  });
});

// Get activity log
router.get('/activity', adminAuth, (req, res) => {
  const activities = readJSON(activityFile);
  res.json(activities.slice(0, 100));
});

// Get settings
router.get('/settings', adminAuth, (req, res) => {
  const admin = readJSON(adminFile);
  res.json({
    limits: admin.limits,
    contact: admin.contact,
    theme: admin.theme
  });
});

// Update limits
router.post('/limits', adminAuth, (req, res) => {
  const { freeDeploysPerDay, creditCostPerDeploy } = req.body;
  const admin = readJSON(adminFile);

  if (freeDeploysPerDay !== undefined) admin.limits.freeDeploysPerDay = parseInt(freeDeploysPerDay);
  if (creditCostPerDeploy !== undefined) admin.limits.creditCostPerDeploy = parseInt(creditCostPerDeploy);

  writeJSON(adminFile, admin);
  res.json({ success: true, limits: admin.limits });
});

// Get public settings (for frontend)
router.get('/public-settings', (req, res) => {
  const admin = readJSON(adminFile);
  res.json({
    theme: admin.theme,
    contact: admin.contact,
    limits: admin.limits,
    maintenanceMode: admin.maintenanceMode,
    maintenanceMessage: admin.maintenanceMessage
  });
});

module.exports = router;
