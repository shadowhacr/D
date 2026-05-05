const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataDir = path.join(__dirname, '..', 'data');
const templatesDir = path.join(__dirname, '..', 'templates');
const deployDir = path.join(__dirname, '..', '..', 'deployments');
const usersFile = path.join(dataDir, 'users.json');
const deploymentsFile = path.join(dataDir, 'deployments.json');
const dailyLimitsFile = path.join(dataDir, 'dailyLimits.json');
const creditsFile = path.join(dataDir, 'credits.json');
const adminFile = path.join(dataDir, 'admin.json');

function readJSON(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function getToday() {
  return new Date().toISOString().split('T')[0];
}

// Check deploy eligibility
router.post('/check', (req, res) => {
  const { username } = req.body;
  const users = readJSON(usersFile);
  const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());

  if (!user) return res.status(404).json({ error: 'User not found' });

  const admin = readJSON(adminFile);
  const today = getToday();

  // Reset daily count if new day
  if (user.lastDeployDate !== today) {
    user.deploysToday = 0;
  }

  const freeDeploysLeft = Math.max(0, admin.limits.freeDeploysPerDay - user.deploysToday);
  const canDeploy = freeDeploysLeft > 0 || user.credits > 0;

  res.json({
    canDeploy,
    freeDeploysLeft,
    credits: user.credits,
    creditCost: admin.limits.creditCostPerDeploy
  });
});

// Deploy a template
router.post('/', (req, res) => {
  const { username, templateId, data } = req.body;

  if (!username || !templateId) {
    return res.status(400).json({ error: 'Username and templateId required' });
  }

  const users = readJSON(usersFile);
  const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());

  if (!user) return res.status(404).json({ error: 'User not found' });
  if (user.isBanned) return res.status(403).json({ error: 'Account banned' });

  const admin = readJSON(adminFile);

  // Check maintenance mode
  if (admin.maintenanceMode && !user.isAdmin) {
    return res.status(503).json({ error: 'Website under maintenance' });
  }

  const today = getToday();

  // Reset daily count if new day
  if (user.lastDeployDate !== today) {
    user.deploysToday = 0;
  }

  const freeDeploysLeft = Math.max(0, admin.limits.freeDeploysPerDay - user.deploysToday);

  // Check if user can deploy
  if (freeDeploysLeft === 0 && user.credits < admin.limits.creditCostPerDeploy) {
    return res.status(403).json({
      error: 'No deploys remaining',
      freeDeploysLeft: 0,
      credits: user.credits,
      creditCost: admin.limits.creditCostPerDeploy
    });
  }

  // Read template HTML
  const templatePath = path.join(templatesDir, `${templateId}.html`);
  if (!fs.existsSync(templatePath)) {
    return res.status(404).json({ error: 'Template not found' });
  }

  let html = fs.readFileSync(templatePath, 'utf8');

  // Replace placeholders with user data
  if (data) {
    Object.keys(data).forEach(key => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      html = html.replace(regex, data[key] || '');
    });
  }

  // Generate unique deployment ID
  const deployId = `${username.toLowerCase()}_${Date.now()}`;
  const deployPath = path.join(deployDir, deployId);

  if (!fs.existsSync(deployPath)) {
    fs.mkdirSync(deployPath, { recursive: true });
  }

  // Write the deployed HTML file
  const indexPath = path.join(deployPath, 'index.html');
  fs.writeFileSync(indexPath, html);

  // Update user deploy counts
  if (freeDeploysLeft > 0) {
    user.deploysToday++;
  } else {
    user.credits -= admin.limits.creditCostPerDeploy;
  }
  user.lastDeployDate = today;
  user.totalDeploys++;

  writeJSON(usersFile, users);

  // Save deployment record
  const deployments = readJSON(deploymentsFile);
  const deployment = {
    id: deployId,
    username: user.username,
    templateId,
    url: `/site/${deployId}`,
    data,
    deployedAt: new Date().toISOString(),
    views: 0
  };
  deployments.push(deployment);
  writeJSON(deploymentsFile, deployments);

  // Update daily limits
  const dailyLimits = readJSON(dailyLimitsFile);
  const todayLimit = dailyLimits.find(l => l.date === today);
  if (todayLimit) {
    todayLimit.count++;
  } else {
    dailyLimits.push({ date: today, count: 1 });
  }
  // Keep only last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const filteredLimits = dailyLimits.filter(l => new Date(l.date) >= thirtyDaysAgo);
  writeJSON(dailyLimitsFile, filteredLimits);

  res.json({
    success: true,
    deployment,
    freeDeploysLeft: Math.max(0, admin.limits.freeDeploysPerDay - user.deploysToday),
    credits: user.credits
  });
});

// Get user's deployments
router.get('/user/:username', (req, res) => {
  const deployments = readJSON(deploymentsFile);
  const userDeployments = deployments.filter(d =>
    d.username.toLowerCase() === req.params.username.toLowerCase()
  );
  res.json(userDeployments);
});

// Delete deployment
router.delete('/:deployId', (req, res) => {
  const { username } = req.body;
  const deployments = readJSON(deploymentsFile);
  const idx = deployments.findIndex(d => d.id === req.params.deployId);

  if (idx === -1) return res.status(404).json({ error: 'Deployment not found' });

  const deployment = deployments[idx];
  if (deployment.username.toLowerCase() !== username.toLowerCase()) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  // Delete deployment folder
  const deployPath = path.join(deployDir, deployment.id);
  if (fs.existsSync(deployPath)) {
    fs.rmSync(deployPath, { recursive: true });
  }

  deployments.splice(idx, 1);
  writeJSON(deploymentsFile, deployments);

  res.json({ success: true });
});

module.exports = router;
