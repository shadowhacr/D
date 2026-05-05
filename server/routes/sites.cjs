const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const deployDir = path.join(__dirname, '..', '..', 'deployments');
const deploymentsFile = path.join(__dirname, '..', 'data', 'deployments.json');

// Serve deployed site
router.get('/:deployId', (req, res) => {
  const { deployId } = req.params;
  const indexPath = path.join(deployDir, deployId, 'index.html');

  if (fs.existsSync(indexPath)) {
    // Track view
    try {
      const deployments = JSON.parse(fs.readFileSync(deploymentsFile, 'utf8'));
      const deploy = deployments.find(d => d.id === deployId);
      if (deploy) {
        deploy.views = (deploy.views || 0) + 1;
        fs.writeFileSync(deploymentsFile, JSON.stringify(deployments, null, 2));
      }
    } catch (e) {
      // Silently fail tracking
    }

    res.sendFile(indexPath);
  } else {
    res.status(404).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Site Not Found</title>
        <style>
          body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: #0f0f23; color: white; }
          .container { text-align: center; }
          h1 { font-size: 3rem; margin-bottom: 1rem; }
          p { color: #888; }
          a { color: #6366f1; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Site Not Found</h1>
          <p>This deployment does not exist or has been removed.</p>
          <p><a href="/">Go back home</a></p>
        </div>
      </body>
      </html>
    `);
  }
});

// Serve assets from deployment folder (Express v5 compatible)
router.get('/:deployId/{*splat}', (req, res) => {
  const { deployId } = req.params;
  const splat = req.params.splat || '';
  const filePath = path.join(deployDir, deployId, splat);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('File not found');
  }
});

module.exports = router;
