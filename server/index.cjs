const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// Import routes
const authRoutes = require('./routes/auth.cjs');
const templateRoutes = require('./routes/templates.cjs');
const deployRoutes = require('./routes/deploy.cjs');
const adminRoutes = require('./routes/admin.cjs');
const creditRoutes = require('./routes/credits.cjs');
const siteRoutes = require('./routes/sites.cjs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Ensure templates directory exists
const templatesDir = path.join(__dirname, 'templates');
if (!fs.existsSync(templatesDir)) {
  fs.mkdirSync(templatesDir, { recursive: true });
}

// Ensure deployments directory exists
const deployDir = path.join(__dirname, '..', 'deployments');
if (!fs.existsSync(deployDir)) {
  fs.mkdirSync(deployDir, { recursive: true });
}

// Initialize default data files
require('./initData.cjs')();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/deploy', deployRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/credits', creditRoutes);

// Serve deployed sites
app.use('/site', siteRoutes);

// Serve static files from public directory
app.use('/assets', express.static(path.join(__dirname, '..', 'public', 'assets')));

// Serve React app - always serve dist folder
app.use(express.static(path.join(__dirname, '..', 'dist')));

// SPA fallback - serve index.html for all non-API routes
app.get('/{*splat}', (req, res, next) => {
  if (req.url.startsWith('/api') || req.url.startsWith('/site')) {
    return next();
  }
  const indexPath = path.join(__dirname, '..', 'dist', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({ error: 'Frontend not built. Run npm run build first.' });
  }
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
  console.log('Data directory: ' + dataDir);
  console.log('Templates directory: ' + templatesDir);
  console.log('Deployments directory: ' + deployDir);
});

module.exports = app;
