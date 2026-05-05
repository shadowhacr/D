const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');

function initData() {
  // Users file
  const usersFile = path.join(dataDir, 'users.json');
  if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, JSON.stringify([], null, 2));
  }

  // Deployments file
  const deploymentsFile = path.join(dataDir, 'deployments.json');
  if (!fs.existsSync(deploymentsFile)) {
    fs.writeFileSync(deploymentsFile, JSON.stringify([], null, 2));
  }

  // Admin settings file
  const adminFile = path.join(dataDir, 'admin.json');
  if (!fs.existsSync(adminFile)) {
    fs.writeFileSync(adminFile, JSON.stringify({
      password: 'SHADOW',
      theme: {
        primaryColor: '#6366f1',
        secondaryColor: '#8b5cf6',
        accentColor: '#06b6d4',
        backgroundColor: '#0f0f23',
        cardColor: '#1a1a2e',
        textColor: '#ffffff',
        title: 'Template Builder Platform',
        logo: null,
        favicon: null
      },
      maintenanceMode: false,
      maintenanceMessage: 'Website is under maintenance. Please check back later.',
      contact: {
        whatsapp: '+1234567890',
        telegram: '@admin',
        email: 'admin@templatebuilder.com'
      },
      limits: {
        freeDeploysPerDay: 2,
        creditCostPerDeploy: 1
      },
      analytics: {
        totalUsers: 0,
        totalDeployments: 0,
        totalTemplates: 1000,
        activeUsers: 0
      }
    }, null, 2));
  }

  // Credits file
  const creditsFile = path.join(dataDir, 'credits.json');
  if (!fs.existsSync(creditsFile)) {
    fs.writeFileSync(creditsFile, JSON.stringify([], null, 2));
  }

  // Daily limits tracking
  const dailyLimitsFile = path.join(dataDir, 'dailyLimits.json');
  if (!fs.existsSync(dailyLimitsFile)) {
    fs.writeFileSync(dailyLimitsFile, JSON.stringify([], null, 2));
  }

  // Templates metadata file
  const templatesMetaFile = path.join(dataDir, 'templatesMeta.json');
  if (!fs.existsSync(templatesMetaFile)) {
    fs.writeFileSync(templatesMetaFile, JSON.stringify({
      categories: [
        { id: 'gaming', name: 'Gaming', icon: 'Gamepad2', count: 0 },
        { id: 'business', name: 'Business', icon: 'Briefcase', count: 0 },
        { id: 'landing-page', name: 'Landing Pages', icon: 'Rocket', count: 0 },
        { id: 'portfolio', name: 'Portfolio', icon: 'User', count: 0 },
        { id: 'social-media', name: 'Social Media', icon: 'Share2', count: 0 },
        { id: 'automation', name: 'Automation', icon: 'Bot', count: 0 },
        { id: 'ecommerce', name: 'E-Commerce', icon: 'ShoppingCart', count: 0 },
        { id: 'education', name: 'Education', icon: 'GraduationCap', count: 0 },
        { id: 'entertainment', name: 'Entertainment', icon: 'Film', count: 0 },
        { id: 'tools', name: 'Tools & Utilities', icon: 'Wrench', count: 0 },
        { id: 'fun', name: 'Fun & Quirky', icon: 'Sparkles', count: 0 },
        { id: 'freelancing', name: 'Freelancing', icon: 'Laptop', count: 0 },
        { id: 'health', name: 'Health & Fitness', icon: 'Heart', count: 0 },
        { id: 'food', name: 'Food & Restaurant', icon: 'Utensils', count: 0 },
        { id: 'travel', name: 'Travel & Tourism', icon: 'Plane', count: 0 },
        { id: 'real-estate', name: 'Real Estate', icon: 'Home', count: 0 },
        { id: 'technology', name: 'Technology', icon: 'Cpu', count: 0 },
        { id: 'fashion', name: 'Fashion & Beauty', icon: 'Shirt', count: 0 },
        { id: 'music', name: 'Music & Audio', icon: 'Music', count: 0 },
        { id: 'sports', name: 'Sports & Fitness', icon: 'Trophy', count: 0 }
      ],
      templates: []
    }, null, 2));
  }

  // Activity log
  const activityFile = path.join(dataDir, 'activity.json');
  if (!fs.existsSync(activityFile)) {
    fs.writeFileSync(activityFile, JSON.stringify([], null, 2));
  }

  console.log('All data files initialized successfully');
}

module.exports = initData;
