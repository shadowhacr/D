const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataDir = path.join(__dirname, '..', 'data');
const templatesDir = path.join(__dirname, '..', 'templates');
const templatesMetaFile = path.join(dataDir, 'templatesMeta.json');

function readTemplatesMeta() {
  return JSON.parse(fs.readFileSync(templatesMetaFile, 'utf8'));
}

function writeTemplatesMeta(meta) {
  fs.writeFileSync(templatesMetaFile, JSON.stringify(meta, null, 2));
}

// Get all categories
router.get('/categories', (req, res) => {
  const meta = readTemplatesMeta();
  res.json(meta.categories);
});

// Get templates by category
router.get('/category/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  const { page = 1, limit = 20, search = '' } = req.query;

  const meta = readTemplatesMeta();
  let templates = meta.templates.filter(t => t.category === categoryId);

  if (search) {
    const searchLower = search.toLowerCase();
    templates = templates.filter(t =>
      t.name.toLowerCase().includes(searchLower) ||
      t.description.toLowerCase().includes(searchLower) ||
      t.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  const start = (page - 1) * limit;
  const end = start + parseInt(limit);
  const paginated = templates.slice(start, end);

  res.json({
    templates: paginated,
    total: templates.length,
    page: parseInt(page),
    totalPages: Math.ceil(templates.length / limit)
  });
});

// Get all templates with pagination and search
router.get('/all', (req, res) => {
  const { page = 1, limit = 20, search = '', category = '' } = req.query;

  const meta = readTemplatesMeta();
  let templates = meta.templates;

  if (category) {
    templates = templates.filter(t => t.category === category);
  }

  if (search) {
    const searchLower = search.toLowerCase();
    templates = templates.filter(t =>
      t.name.toLowerCase().includes(searchLower) ||
      t.description.toLowerCase().includes(searchLower) ||
      t.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  const start = (page - 1) * limit;
  const end = start + parseInt(limit);
  const paginated = templates.slice(start, end);

  res.json({
    templates: paginated,
    total: templates.length,
    page: parseInt(page),
    totalPages: Math.ceil(templates.length / limit)
  });
});

// Get single template
router.get('/:templateId', (req, res) => {
  const meta = readTemplatesMeta();
  const template = meta.templates.find(t => t.id === req.params.templateId);

  if (!template) {
    return res.status(404).json({ error: 'Template not found' });
  }

  // Read the actual template HTML file
  const templatePath = path.join(templatesDir, `${template.id}.html`);
  let html = '';
  if (fs.existsSync(templatePath)) {
    html = fs.readFileSync(templatePath, 'utf8');
  }

  res.json({ ...template, html });
});

// Get template preview HTML
router.get('/:templateId/preview', (req, res) => {
  const meta = readTemplatesMeta();
  const template = meta.templates.find(t => t.id === req.params.templateId);

  if (!template) {
    return res.status(404).json({ error: 'Template not found' });
  }

  const templatePath = path.join(templatesDir, `${template.id}.html`);
  if (fs.existsSync(templatePath)) {
    const html = fs.readFileSync(templatePath, 'utf8');
    res.send(html);
  } else {
    res.status(404).json({ error: 'Template file not found' });
  }
});

// Admin: Add template
router.post('/add', (req, res) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== 'SHADOW') return res.status(403).json({ error: 'Unauthorized' });

  const { name, description, category, tags, html, fields, thumbnail } = req.body;

  const meta = readTemplatesMeta();
  const newTemplate = {
    id: `tpl_${Date.now()}`,
    name,
    description,
    category,
    tags: tags || [],
    thumbnail: thumbnail || null,
    fields: fields || [],
    createdAt: new Date().toISOString(),
    deployments: 0
  };

  meta.templates.push(newTemplate);

  // Update category count
  const cat = meta.categories.find(c => c.id === category);
  if (cat) cat.count++;

  writeTemplatesMeta(meta);

  // Save HTML file
  const templatePath = path.join(templatesDir, `${newTemplate.id}.html`);
  fs.writeFileSync(templatePath, html);

  res.json({ success: true, template: newTemplate });
});

// Admin: Delete template
router.delete('/:templateId', (req, res) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== 'SHADOW') return res.status(403).json({ error: 'Unauthorized' });

  const meta = readTemplatesMeta();
  const idx = meta.templates.findIndex(t => t.id === req.params.templateId);

  if (idx === -1) return res.status(404).json({ error: 'Template not found' });

  const template = meta.templates[idx];
  meta.templates.splice(idx, 1);

  // Update category count
  const cat = meta.categories.find(c => c.id === template.category);
  if (cat) cat.count--;

  writeTemplatesMeta(meta);

  // Delete HTML file
  const templatePath = path.join(templatesDir, `${template.id}.html`);
  if (fs.existsSync(templatePath)) {
    fs.unlinkSync(templatePath);
  }

  res.json({ success: true });
});

module.exports = router;
