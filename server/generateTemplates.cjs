const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'templates');
const dataDir = path.join(__dirname, 'data');
const templatesMetaFile = path.join(dataDir, 'templatesMeta.json');

// Ensure directories exist
if (!fs.existsSync(templatesDir)) fs.mkdirSync(templatesDir, { recursive: true });
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const categories = [
  { id: 'gaming', name: 'Gaming', count: 80 },
  { id: 'business', name: 'Business', count: 80 },
  { id: 'landing-page', name: 'Landing Pages', count: 100 },
  { id: 'portfolio', name: 'Portfolio', count: 60 },
  { id: 'social-media', name: 'Social Media', count: 50 },
  { id: 'automation', name: 'Automation', count: 40 },
  { id: 'ecommerce', name: 'E-Commerce', count: 60 },
  { id: 'education', name: 'Education', count: 40 },
  { id: 'entertainment', name: 'Entertainment', count: 50 },
  { id: 'tools', name: 'Tools & Utilities', count: 60 },
  { id: 'fun', name: 'Fun & Quirky', count: 40 },
  { id: 'freelancing', name: 'Freelancing', count: 50 },
  { id: 'health', name: 'Health & Fitness', count: 40 },
  { id: 'food', name: 'Food & Restaurant', count: 40 },
  { id: 'travel', name: 'Travel & Tourism', count: 40 },
  { id: 'real-estate', name: 'Real Estate', count: 30 },
  { id: 'technology', name: 'Technology', count: 50 },
  { id: 'fashion', name: 'Fashion & Beauty', count: 30 },
  { id: 'music', name: 'Music & Audio', count: 30 },
  { id: 'sports', name: 'Sports & Fitness', count: 30 }
];

const colorPalettes = [
  { primary: '#6366f1', secondary: '#8b5cf6', accent: '#06b6d4', bg: '#0f0f23', card: '#1a1a2e' },
  { primary: '#f59e0b', secondary: '#ef4444', accent: '#f97316', bg: '#1a1000', card: '#2a1a00' },
  { primary: '#10b981', secondary: '#059669', accent: '#34d399', bg: '#001a0f', card: '#002a1a' },
  { primary: '#ec4899', secondary: '#db2777', accent: '#f472b6', bg: '#1a0010', card: '#2a001a' },
  { primary: '#3b82f6', secondary: '#2563eb', accent: '#60a5fa', bg: '#001020', card: '#001a30' },
  { primary: '#f43f5e', secondary: '#e11d48', accent: '#fb7185', bg: '#1a0005', card: '#2a000a' },
  { primary: '#14b8a6', secondary: '#0d9488', accent: '#2dd4bf', bg: '#001a1a', card: '#002a2a' },
  { primary: '#a855f7', secondary: '#9333ea', accent: '#c084fc', bg: '#14001a', card: '#1f002a' },
  { primary: '#eab308', secondary: '#ca8a04', accent: '#facc15', bg: '#1a1500', card: '#2a2200' },
  { primary: '#22c55e', secondary: '#16a34a', accent: '#4ade80', bg: '#001a05', card: '#002a0a' },
  { primary: '#e11d48', secondary: '#be123c', accent: '#fb7185', bg: '#1a0005', card: '#2a0008' },
  { primary: '#6366f1', secondary: '#4f46e5', accent: '#818cf8', bg: '#0a0a1a', card: '#12122a' },
  { primary: '#0ea5e9', secondary: '#0284c7', accent: '#38bdf8', bg: '#001020', card: '#001a30' },
  { primary: '#d946ef', secondary: '#c026d3', accent: '#e879f9', bg: '#1a001a', card: '#2a002a' },
  { primary: '#f97316', secondary: '#ea580c', accent: '#fb923c', bg: '#1a0a00', card: '#2a1000' },
  { primary: '#84cc16', secondary: '#65a30d', accent: '#a3e635', bg: '#0a1a00', card: '#102a00' },
  { primary: '#06b6d4', secondary: '#0891b2', accent: '#22d3ee', bg: '#001a20', card: '#002a30' },
  { primary: '#8b5cf6', secondary: '#7c3aed', accent: '#a78bfa', bg: '#10001a', card: '#1a002a' },
  { primary: '#ef4444', secondary: '#dc2626', accent: '#f87171', bg: '#1a0000', card: '#2a0000' },
  { primary: '#64748b', secondary: '#475569', accent: '#94a3b8', bg: '#0a0a0f', card: '#141420' }
];

// Generate unique HTML templates based on category and style
function generateTemplateHTML(category, index, palette, style) {
  const colors = colorPalettes[palette % colorPalettes.length];
  const id = `${category}_${index}`;

  switch (category) {
    case 'gaming': return generateGamingTemplate(id, colors, style);
    case 'business': return generateBusinessTemplate(id, colors, style);
    case 'landing-page': return generateLandingTemplate(id, colors, style);
    case 'portfolio': return generatePortfolioTemplate(id, colors, style);
    case 'social-media': return generateSocialMediaTemplate(id, colors, style);
    case 'automation': return generateAutomationTemplate(id, colors, style);
    case 'ecommerce': return generateEcommerceTemplate(id, colors, style);
    case 'education': return generateEducationTemplate(id, colors, style);
    case 'entertainment': return generateEntertainmentTemplate(id, colors, style);
    case 'tools': return generateToolsTemplate(id, colors, style);
    case 'fun': return generateFunTemplate(id, colors, style);
    case 'freelancing': return generateFreelancingTemplate(id, colors, style);
    case 'health': return generateHealthTemplate(id, colors, style);
    case 'food': return generateFoodTemplate(id, colors, style);
    case 'travel': return generateTravelTemplate(id, colors, style);
    case 'real-estate': return generateRealEstateTemplate(id, colors, style);
    case 'technology': return generateTechnologyTemplate(id, colors, style);
    case 'fashion': return generateFashionTemplate(id, colors, style);
    case 'music': return generateMusicTemplate(id, colors, style);
    case 'sports': return generateSportsTemplate(id, colors, style);
    default: return generateGenericTemplate(id, colors, style);
  }
}

function generateGamingTemplate(id, colors, style) {
  const gradients = [
    `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
    `radial-gradient(circle at 30% 30%, ${colors.primary}, ${colors.bg})`,
    `conic-gradient(from 45deg, ${colors.primary}, ${colors.secondary}, ${colors.accent})`
  ];
  const grad = gradients[style % 3];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}} - Gaming Hub</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: ${colors.bg}; color: #fff; overflow-x: hidden; }
    .hero { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; background: ${grad}; position: relative; }
    .hero::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="0.5" x="0" y="0" width="100" height="100"/><line x1="0" y1="0" x2="100" y2="100" stroke="rgba(255,255,255,0.03)" stroke-width="0.5"/><line x1="100" y1="0" x2="0" y2="100" stroke="rgba(255,255,255,0.03)" stroke-width="0.5"/></svg>'); background-size: 50px 50px; opacity: 0.5; }
    .hero-content { position: relative; z-index: 2; text-align: center; padding: 2rem; }
    .hero h1 { font-size: clamp(2.5rem, 8vw, 5rem); font-weight: 900; text-transform: uppercase; letter-spacing: -2px; margin-bottom: 1rem; text-shadow: 0 0 40px ${colors.primary}80; }
    .hero p { font-size: clamp(1rem, 2.5vw, 1.4rem); opacity: 0.9; max-width: 600px; margin: 0 auto 2rem; }
    .btn { display: inline-block; padding: 1rem 2.5rem; background: ${colors.accent}; color: #000; font-weight: 700; text-decoration: none; border-radius: 50px; text-transform: uppercase; letter-spacing: 1px; transition: all 0.3s ease; border: none; cursor: pointer; }
    .btn:hover { transform: translateY(-3px); box-shadow: 0 10px 30px ${colors.accent}60; }
    .features { padding: 5rem 2rem; background: ${colors.card}; }
    .container { max-width: 1200px; margin: 0 auto; }
    .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; margin-top: 3rem; }
    .feature-card { background: ${colors.bg}; border-radius: 20px; padding: 2.5rem; text-align: center; border: 1px solid ${colors.primary}30; transition: all 0.3s ease; }
    .feature-card:hover { transform: translateY(-10px); border-color: ${colors.primary}; box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
    .feature-icon { font-size: 3rem; margin-bottom: 1rem; }
    .feature-card h3 { font-size: 1.4rem; margin-bottom: 0.5rem; color: ${colors.accent}; }
    .feature-card p { opacity: 0.8; line-height: 1.6; }
    .games-section { padding: 5rem 2rem; }
    .section-title { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; background: ${grad}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .games-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
    .game-card { position: relative; border-radius: 20px; overflow: hidden; background: ${colors.card}; border: 1px solid ${colors.primary}20; transition: all 0.3s ease; }
    .game-card:hover { transform: scale(1.03); }
    .game-img { height: 200px; background: ${grad}; display: flex; align-items: center; justify-content: center; font-size: 4rem; }
    .game-info { padding: 1.5rem; }
    .game-info h3 { font-size: 1.3rem; margin-bottom: 0.5rem; color: ${colors.accent}; }
    .game-info p { opacity: 0.7; font-size: 0.9rem; }
    .stats { display: flex; justify-content: center; gap: 3rem; padding: 3rem 2rem; background: ${colors.card}; flex-wrap: wrap; }
    .stat { text-align: center; }
    .stat-number { font-size: 2.5rem; font-weight: 900; color: ${colors.accent}; }
    .stat-label { opacity: 0.7; font-size: 0.9rem; }
    .footer { text-align: center; padding: 3rem 2rem; background: ${colors.bg}; border-top: 1px solid ${colors.primary}20; }
    .footer p { opacity: 0.5; }
    .nav { position: fixed; top: 0; left: 0; right: 0; display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; background: rgba(15,15,35,0.9); backdrop-filter: blur(10px); z-index: 1000; border-bottom: 1px solid ${colors.primary}20; }
    .nav-logo { font-size: 1.5rem; font-weight: 900; color: ${colors.accent}; }
    .nav-links { display: flex; gap: 2rem; list-style: none; }
    .nav-links a { color: #fff; text-decoration: none; opacity: 0.8; transition: opacity 0.3s; }
    .nav-links a:hover { opacity: 1; color: ${colors.accent}; }
    .tag { display: inline-block; padding: 0.3rem 1rem; background: ${colors.primary}30; border: 1px solid ${colors.primary}50; border-radius: 20px; font-size: 0.8rem; color: ${colors.accent}; margin: 0.5rem 0.3rem; }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
    .float { animation: float 3s ease-in-out infinite; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
    .pulse { animation: pulse 2s ease-in-out infinite; }
    @media (max-width: 768px) { .nav-links { display: none; } .stats { gap: 1.5rem; } }
  </style>
</head>
<body>
  <nav class="nav">
    <div class="nav-logo">{{LOGO_TEXT}}</div>
    <ul class="nav-links">
      <li><a href="#home">Home</a></li>
      <li><a href="#games">Games</a></li>
      <li><a href="#features">Features</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>

  <section class="hero" id="home">
    <div class="hero-content">
      <span class="tag pulse">{{TAGLINE}}</span>
      <h1>{{HEADING}}</h1>
      <p>{{DESCRIPTION}}</p>
      <a href="#games" class="btn">{{CTA_BUTTON}}</a>
    </div>
  </section>

  <section class="stats">
    <div class="stat"><div class="stat-number">{{STAT_1_VALUE}}</div><div class="stat-label">{{STAT_1_LABEL}}</div></div>
    <div class="stat"><div class="stat-number">{{STAT_2_VALUE}}</div><div class="stat-label">{{STAT_2_LABEL}}</div></div>
    <div class="stat"><div class="stat-number">{{STAT_3_VALUE}}</div><div class="stat-label">{{STAT_3_LABEL}}</div></div>
  </section>

  <section class="features" id="features">
    <div class="container">
      <h2 class="section-title">{{FEATURES_TITLE}}</h2>
      <div class="features-grid">
        <div class="feature-card float">
          <div class="feature-icon">{{FEATURE_1_ICON}}</div>
          <h3>{{FEATURE_1_TITLE}}</h3>
          <p>{{FEATURE_1_DESC}}</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">{{FEATURE_2_ICON}}</div>
          <h3>{{FEATURE_2_TITLE}}</h3>
          <p>{{FEATURE_2_DESC}}</p>
        </div>
        <div class="feature-card float">
          <div class="feature-icon">{{FEATURE_3_ICON}}</div>
          <h3>{{FEATURE_3_TITLE}}</h3>
          <p>{{FEATURE_3_DESC}}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="games-section" id="games">
    <div class="container">
      <h2 class="section-title">{{GAMES_TITLE}}</h2>
      <div class="games-grid">
        <div class="game-card">
          <div class="game-img">{{GAME_1_IMAGE}}</div>
          <div class="game-info">
            <h3>{{GAME_1_NAME}}</h3>
            <p>{{GAME_1_DESC}}</p>
          </div>
        </div>
        <div class="game-card">
          <div class="game-img">{{GAME_2_IMAGE}}</div>
          <div class="game-info">
            <h3>{{GAME_2_NAME}}</h3>
            <p>{{GAME_2_DESC}}</p>
          </div>
        </div>
        <div class="game-card">
          <div class="game-img">{{GAME_3_IMAGE}}</div>
          <div class="game-info">
            <h3>{{GAME_3_NAME}}</h3>
            <p>{{GAME_3_DESC}}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <footer class="footer" id="contact">
    <p>{{FOOTER_TEXT}} | Contact: {{CONTACT_EMAIL}}</p>
  </footer>
</body>
</html>`;
}

function generateBusinessTemplate(id, colors, style) {
  const layouts = ['classic', 'modern', 'minimal'];
  const layout = layouts[style % 3];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}} - Business Solutions</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', system-ui, sans-serif; background: ${layout === 'minimal' ? '#fff' : colors.bg}; color: ${layout === 'minimal' ? '#1a1a2e' : '#fff'}; }
    .header { background: ${layout === 'minimal' ? '#fff' : colors.card}; border-bottom: 1px solid ${colors.primary}20; padding: 1rem 2rem; position: sticky; top: 0; z-index: 100; }
    .header-inner { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 1.5rem; font-weight: 800; color: ${colors.primary}; }
    .nav { display: flex; gap: 2rem; list-style: none; }
    .nav a { text-decoration: none; color: inherit; opacity: 0.7; transition: all 0.3s; font-weight: 500; }
    .nav a:hover { opacity: 1; color: ${colors.primary}; }
    .hero { padding: 6rem 2rem; ${layout !== 'minimal' ? `background: linear-gradient(135deg, ${colors.bg} 0%, ${colors.card} 100%);` : ''} }
    .hero-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
    .hero h1 { font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem; }
    .hero h1 span { color: ${colors.primary}; }
    .hero p { font-size: 1.1rem; opacity: 0.8; line-height: 1.7; margin-bottom: 2rem; }
    .btn { display: inline-block; padding: 0.9rem 2rem; background: ${colors.primary}; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; transition: all 0.3s; border: none; cursor: pointer; }
    .btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px ${colors.primary}40; }
    .btn-outline { background: transparent; border: 2px solid ${colors.primary}; color: ${layout === 'minimal' ? colors.primary : '#fff'}; margin-left: 1rem; }
    .hero-visual { display: flex; align-items: center; justify-content: center; min-height: 300px; background: ${colors.primary}10; border-radius: 20px; border: 1px solid ${colors.primary}20; font-size: 5rem; }
    .services { padding: 5rem 2rem; ${layout === 'minimal' ? '' : `background: ${colors.card};`} }
    .section-header { text-align: center; max-width: 600px; margin: 0 auto 3rem; }
    .section-header h2 { font-size: 2.5rem; margin-bottom: 1rem; }
    .section-header p { opacity: 0.7; }
    .services-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
    .service-card { padding: 2.5rem; border-radius: 16px; background: ${layout === 'minimal' ? '#f8f9fa' : colors.bg}; border: 1px solid ${colors.primary}15; transition: all 0.3s; }
    .service-card:hover { transform: translateY(-5px); border-color: ${colors.primary}40; box-shadow: 0 15px 35px rgba(0,0,0,0.1); }
    .service-icon { width: 60px; height: 60px; background: ${colors.primary}15; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin-bottom: 1.5rem; color: ${colors.primary}; }
    .service-card h3 { font-size: 1.3rem; margin-bottom: 0.5rem; }
    .service-card p { opacity: 0.7; line-height: 1.6; }
    .about { padding: 5rem 2rem; }
    .about-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
    .about-img { min-height: 350px; background: ${colors.secondary}10; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 5rem; border: 1px solid ${colors.secondary}20; }
    .about h2 { font-size: 2.5rem; margin-bottom: 1rem; }
    .about h2 span { color: ${colors.primary}; }
    .about p { opacity: 0.8; line-height: 1.7; margin-bottom: 1rem; }
    .about ul { list-style: none; }
    .about ul li { padding: 0.5rem 0; opacity: 0.8; }
    .about ul li:before { content: '\\2713 '; color: ${colors.primary}; font-weight: bold; margin-right: 0.5rem; }
    .testimonials { padding: 5rem 2rem; ${layout === 'minimal' ? 'background: #f8f9fa;' : `background: ${colors.card};`} }
    .testimonials-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
    .testimonial { padding: 2rem; border-radius: 16px; background: ${layout === 'minimal' ? '#fff' : colors.bg}; border: 1px solid ${colors.primary}15; }
    .testimonial-text { font-style: italic; opacity: 0.8; line-height: 1.6; margin-bottom: 1rem; }
    .testimonial-author { display: flex; align-items: center; gap: 1rem; }
    .testimonial-avatar { width: 50px; height: 50px; border-radius: 50%; background: ${colors.primary}; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #fff; }
    .testimonial-name { font-weight: 600; }
    .testimonial-role { font-size: 0.85rem; opacity: 0.6; }
    .cta { padding: 5rem 2rem; text-align: center; background: ${colors.primary}; }
    .cta h2 { font-size: 2.5rem; margin-bottom: 1rem; color: #fff; }
    .cta p { color: rgba(255,255,255,0.9); margin-bottom: 2rem; max-width: 500px; margin-left: auto; margin-right: auto; }
    .cta .btn { background: #fff; color: ${colors.primary}; }
    .footer { padding: 3rem 2rem; text-align: center; border-top: 1px solid ${colors.primary}15; }
    .footer p { opacity: 0.5; }
    @media (max-width: 768px) { .hero-inner, .about-inner { grid-template-columns: 1fr; } .nav { display: none; } }
  </style>
</head>
<body>
  <header class="header">
    <div class="header-inner">
      <div class="logo">{{COMPANY_NAME}}</div>
      <ul class="nav">
        <li><a href="#home">Home</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#testimonials">Reviews</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  </header>

  <section class="hero" id="home">
    <div class="hero-inner">
      <div>
        <h1>{{HEADING}} <span>{{HEADING_HIGHLIGHT}}</span></h1>
        <p>{{DESCRIPTION}}</p>
        <a href="#services" class="btn">{{CTA_PRIMARY}}</a>
        <a href="#contact" class="btn btn-outline">{{CTA_SECONDARY}}</a>
      </div>
      <div class="hero-visual">{{HERO_IMAGE}}</div>
    </div>
  </section>

  <section class="services" id="services">
    <div class="section-header">
      <h2>{{SERVICES_TITLE}}</h2>
      <p>{{SERVICES_SUBTITLE}}</p>
    </div>
    <div class="services-grid">
      <div class="service-card">
        <div class="service-icon">{{SERVICE_1_ICON}}</div>
        <h3>{{SERVICE_1_TITLE}}</h3>
        <p>{{SERVICE_1_DESC}}</p>
      </div>
      <div class="service-card">
        <div class="service-icon">{{SERVICE_2_ICON}}</div>
        <h3>{{SERVICE_2_TITLE}}</h3>
        <p>{{SERVICE_2_DESC}}</p>
      </div>
      <div class="service-card">
        <div class="service-icon">{{SERVICE_3_ICON}}</div>
        <h3>{{SERVICE_3_TITLE}}</h3>
        <p>{{SERVICE_3_DESC}}</p>
      </div>
    </div>
  </section>

  <section class="about" id="about">
    <div class="about-inner">
      <div class="about-img">{{ABOUT_IMAGE}}</div>
      <div>
        <h2>{{ABOUT_TITLE}} <span>{{ABOUT_HIGHLIGHT}}</span></h2>
        <p>{{ABOUT_PARA_1}}</p>
        <p>{{ABOUT_PARA_2}}</p>
        <ul>
          <li>{{ABOUT_POINT_1}}</li>
          <li>{{ABOUT_POINT_2}}</li>
          <li>{{ABOUT_POINT_3}}</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="testimonials" id="testimonials">
    <div class="section-header">
      <h2>{{TESTIMONIALS_TITLE}}</h2>
      <p>{{TESTIMONIALS_SUBTITLE}}</p>
    </div>
    <div class="testimonials-grid">
      <div class="testimonial">
        <p class="testimonial-text">"{{REVIEW_1_TEXT}}"</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">{{REVIEW_1_INITIAL}}</div>
          <div><div class="testimonial-name">{{REVIEW_1_NAME}}</div><div class="testimonial-role">{{REVIEW_1_ROLE}}</div></div>
        </div>
      </div>
      <div class="testimonial">
        <p class="testimonial-text">"{{REVIEW_2_TEXT}}"</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">{{REVIEW_2_INITIAL}}</div>
          <div><div class="testimonial-name">{{REVIEW_2_NAME}}</div><div class="testimonial-role">{{REVIEW_2_ROLE}}</div></div>
        </div>
      </div>
      <div class="testimonial">
        <p class="testimonial-text">"{{REVIEW_3_TEXT}}"</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">{{REVIEW_3_INITIAL}}</div>
          <div><div class="testimonial-name">{{REVIEW_3_NAME}}</div><div class="testimonial-role">{{REVIEW_3_ROLE}}</div></div>
        </div>
      </div>
    </div>
  </section>

  <section class="cta" id="contact">
    <h2>{{CTA_TITLE}}</h2>
    <p>{{CTA_DESCRIPTION}}</p>
    <a href="mailto:{{CONTACT_EMAIL}}" class="btn">{{CTA_BUTTON}}</a>
  </section>

  <footer class="footer">
    <p>{{FOOTER_TEXT}} | {{COMPANY_NAME}} &copy; {{YEAR}}</p>
  </footer>
</body>
</html>`;
}

function generateLandingTemplate(id, colors, style) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', 'Segoe UI', sans-serif; background: ${colors.bg}; color: #fff; }
    .page { min-height: 100vh; display: flex; flex-direction: column; }
    .hero { flex: 1; display: flex; align-items: center; justify-content: center; padding: 4rem 2rem; background: linear-gradient(135deg, ${colors.bg}, ${colors.card}); position: relative; overflow: hidden; }
    .hero::before { content: ''; position: absolute; width: 600px; height: 600px; background: radial-gradient(circle, ${colors.primary}20, transparent 70%); top: -200px; right: -200px; border-radius: 50%; }
    .hero::after { content: ''; position: absolute; width: 400px; height: 400px; background: radial-gradient(circle, ${colors.accent}15, transparent 70%); bottom: -100px; left: -100px; border-radius: 50%; }
    .hero-content { position: relative; z-index: 2; max-width: 900px; text-align: center; }
    .badge { display: inline-block; padding: 0.4rem 1.2rem; background: ${colors.primary}20; border: 1px solid ${colors.primary}40; border-radius: 50px; font-size: 0.85rem; color: ${colors.accent}; margin-bottom: 1.5rem; }
    .hero h1 { font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 900; line-height: 1.1; margin-bottom: 1.5rem; }
    .hero h1 span { background: linear-gradient(135deg, ${colors.primary}, ${colors.accent}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .hero p { font-size: 1.15rem; opacity: 0.8; max-width: 600px; margin: 0 auto 2.5rem; line-height: 1.6; }
    .hero-buttons { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
    .btn { padding: 1rem 2.5rem; border-radius: 12px; font-weight: 600; font-size: 1rem; cursor: pointer; transition: all 0.3s; text-decoration: none; display: inline-block; }
    .btn-primary { background: ${colors.primary}; color: #fff; border: none; }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 30px ${colors.primary}40; }
    .btn-secondary { background: transparent; color: #fff; border: 2px solid ${colors.primary}40; }
    .btn-secondary:hover { border-color: ${colors.primary}; background: ${colors.primary}10; }
    .preview { padding: 4rem 2rem; background: ${colors.card}; }
    .preview-inner { max-width: 1000px; margin: 0 auto; text-align: center; }
    .preview-box { background: ${colors.bg}; border-radius: 20px; padding: 3rem; margin-top: 2rem; border: 1px solid ${colors.primary}20; min-height: 300px; display: flex; align-items: center; justify-content: center; font-size: 4rem; }
    .features { padding: 5rem 2rem; }
    .features-inner { max-width: 1100px; margin: 0 auto; }
    .features h2 { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; }
    .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; }
    .feature { padding: 2rem; background: ${colors.card}; border-radius: 16px; border: 1px solid ${colors.primary}15; transition: all 0.3s; }
    .feature:hover { transform: translateY(-5px); border-color: ${colors.primary}40; }
    .feature-icon { font-size: 2.5rem; margin-bottom: 1rem; }
    .feature h3 { font-size: 1.2rem; margin-bottom: 0.5rem; color: ${colors.accent}; }
    .feature p { opacity: 0.7; font-size: 0.9rem; line-height: 1.5; }
    .pricing { padding: 5rem 2rem; background: ${colors.card}; }
    .pricing h2 { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; }
    .pricing-grid { max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
    .pricing-card { padding: 2.5rem; border-radius: 20px; background: ${colors.bg}; border: 1px solid ${colors.primary}15; text-align: center; }
    .pricing-card.popular { border: 2px solid ${colors.primary}; position: relative; }
    .popular-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: ${colors.primary}; color: #fff; padding: 0.3rem 1rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600; }
    .pricing-card h3 { font-size: 1.3rem; margin-bottom: 0.5rem; }
    .price { font-size: 3rem; font-weight: 900; color: ${colors.accent}; margin: 1rem 0; }
    .price span { font-size: 1rem; opacity: 0.6; }
    .pricing-card ul { list-style: none; text-align: left; margin: 1.5rem 0; }
    .pricing-card ul li { padding: 0.5rem 0; opacity: 0.8; font-size: 0.9rem; }
    .pricing-card ul li::before { content: '\\2713'; color: ${colors.primary}; margin-right: 0.5rem; }
    .faq { padding: 5rem 2rem; }
    .faq h2 { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; }
    .faq-list { max-width: 800px; margin: 0 auto; }
    .faq-item { margin-bottom: 1rem; border: 1px solid ${colors.primary}15; border-radius: 12px; overflow: hidden; }
    .faq-question { padding: 1.2rem 1.5rem; background: ${colors.card}; cursor: pointer; font-weight: 600; display: flex; justify-content: space-between; align-items: center; }
    .faq-answer { padding: 1.2rem 1.5rem; opacity: 0.8; line-height: 1.6; border-top: 1px solid ${colors.primary}10; }
    .footer { padding: 3rem 2rem; text-align: center; border-top: 1px solid ${colors.primary}15; }
    .footer p { opacity: 0.5; }
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    .animate { animation: fadeInUp 0.8s ease forwards; }
    @media (max-width: 768px) { .hero-buttons { flex-direction: column; align-items: center; } }
  </style>
</head>
<body>
  <div class="page">
    <section class="hero">
      <div class="hero-content animate">
        <span class="badge">{{BADGE_TEXT}}</span>
        <h1>{{HEADING}} <span>{{HEADING_HIGHLIGHT}}</span></h1>
        <p>{{DESCRIPTION}}</p>
        <div class="hero-buttons">
          <a href="#pricing" class="btn btn-primary">{{CTA_PRIMARY}}</a>
          <a href="#preview" class="btn btn-secondary">{{CTA_SECONDARY}}</a>
        </div>
      </div>
    </section>
  </div>

  <section class="preview" id="preview">
    <div class="preview-inner">
      <h2>{{PREVIEW_TITLE}}</h2>
      <div class="preview-box">{{PREVIEW_CONTENT}}</div>
    </div>
  </section>

  <section class="features" id="features">
    <div class="features-inner">
      <h2>{{FEATURES_TITLE}}</h2>
      <div class="features-grid">
        <div class="feature">
          <div class="feature-icon">{{FEATURE_1_ICON}}</div>
          <h3>{{FEATURE_1_TITLE}}</h3>
          <p>{{FEATURE_1_DESC}}</p>
        </div>
        <div class="feature">
          <div class="feature-icon">{{FEATURE_2_ICON}}</div>
          <h3>{{FEATURE_2_TITLE}}</h3>
          <p>{{FEATURE_2_DESC}}</p>
        </div>
        <div class="feature">
          <div class="feature-icon">{{FEATURE_3_ICON}}</div>
          <h3>{{FEATURE_3_TITLE}}</h3>
          <p>{{FEATURE_3_DESC}}</p>
        </div>
        <div class="feature">
          <div class="feature-icon">{{FEATURE_4_ICON}}</div>
          <h3>{{FEATURE_4_TITLE}}</h3>
          <p>{{FEATURE_4_DESC}}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="pricing" id="pricing">
    <h2>{{PRICING_TITLE}}</h2>
    <div class="pricing-grid">
      <div class="pricing-card">
        <h3>{{PLAN_1_NAME}}</h3>
        <div class="price">{{PLAN_1_PRICE}}<span>/{{PLAN_1_PERIOD}}</span></div>
        <ul>
          <li>{{PLAN_1_FEATURE_1}}</li>
          <li>{{PLAN_1_FEATURE_2}}</li>
          <li>{{PLAN_1_FEATURE_3}}</li>
        </ul>
        <a href="#" class="btn btn-secondary">{{PLAN_1_CTA}}</a>
      </div>
      <div class="pricing-card popular">
        <span class="popular-badge">MOST POPULAR</span>
        <h3>{{PLAN_2_NAME}}</h3>
        <div class="price">{{PLAN_2_PRICE}}<span>/{{PLAN_2_PERIOD}}</span></div>
        <ul>
          <li>{{PLAN_2_FEATURE_1}}</li>
          <li>{{PLAN_2_FEATURE_2}}</li>
          <li>{{PLAN_2_FEATURE_3}}</li>
          <li>{{PLAN_2_FEATURE_4}}</li>
        </ul>
        <a href="#" class="btn btn-primary">{{PLAN_2_CTA}}</a>
      </div>
      <div class="pricing-card">
        <h3>{{PLAN_3_NAME}}</h3>
        <div class="price">{{PLAN_3_PRICE}}<span>/{{PLAN_3_PERIOD}}</span></div>
        <ul>
          <li>{{PLAN_3_FEATURE_1}}</li>
          <li>{{PLAN_3_FEATURE_2}}</li>
          <li>{{PLAN_3_FEATURE_3}}</li>
          <li>{{PLAN_3_FEATURE_4}}</li>
          <li>{{PLAN_3_FEATURE_5}}</li>
        </ul>
        <a href="#" class="btn btn-secondary">{{PLAN_3_CTA}}</a>
      </div>
    </div>
  </section>

  <section class="faq" id="faq">
    <h2>{{FAQ_TITLE}}</h2>
    <div class="faq-list">
      <div class="faq-item">
        <div class="faq-question">{{FAQ_1_Q}}</div>
        <div class="faq-answer">{{FAQ_1_A}}</div>
      </div>
      <div class="faq-item">
        <div class="faq-question">{{FAQ_2_Q}}</div>
        <div class="faq-answer">{{FAQ_2_A}}</div>
      </div>
      <div class="faq-item">
        <div class="faq-question">{{FAQ_3_Q}}</div>
        <div class="faq-answer">{{FAQ_3_A}}</div>
      </div>
    </div>
  </section>

  <footer class="footer">
    <p>{{FOOTER_TEXT}} | &copy; {{YEAR}} {{BRAND_NAME}}</p>
  </footer>
</body>
</html>`;
}

// Additional template generators for other categories
function generatePortfolioTemplate(id, colors, style) {
  const gradients = [
    `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
    `linear-gradient(45deg, ${colors.bg}, ${colors.card})`
  ];
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}} - Portfolio</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', sans-serif; background: ${colors.bg}; color: #fff; }
    .sidebar { position: fixed; left: 0; top: 0; bottom: 0; width: 300px; background: ${colors.card}; border-right: 1px solid ${colors.primary}20; padding: 3rem 2rem; display: flex; flex-direction: column; z-index: 100; }
    .profile { text-align: center; margin-bottom: 2rem; }
    .profile-img { width: 120px; height: 120px; border-radius: 50%; background: ${gradients[0]}; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; font-size: 3rem; }
    .profile h2 { font-size: 1.5rem; margin-bottom: 0.3rem; }
    .profile p { opacity: 0.6; font-size: 0.9rem; }
    .nav { list-style: none; }
    .nav li { margin-bottom: 0.5rem; }
    .nav a { display: block; padding: 0.8rem 1rem; color: #fff; text-decoration: none; border-radius: 10px; transition: all 0.3s; opacity: 0.8; }
    .nav a:hover, .nav a.active { background: ${colors.primary}20; opacity: 1; color: ${colors.accent}; }
    .main { margin-left: 300px; }
    .hero { min-height: 100vh; display: flex; align-items: center; padding: 4rem; background: ${gradients[1]}; }
    .hero h1 { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; margin-bottom: 1rem; }
    .hero h1 span { color: ${colors.primary}; }
    .hero p { font-size: 1.1rem; opacity: 0.8; max-width: 500px; line-height: 1.7; margin-bottom: 2rem; }
    .social { display: flex; gap: 1rem; }
    .social a { width: 45px; height: 45px; border-radius: 12px; background: ${colors.primary}20; display: flex; align-items: center; justify-content: center; color: ${colors.accent}; text-decoration: none; font-size: 1.2rem; transition: all 0.3s; }
    .social a:hover { background: ${colors.primary}; color: #fff; }
    .section { padding: 4rem; }
    .section h2 { font-size: 2rem; margin-bottom: 2rem; }
    .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
    .project { background: ${colors.card}; border-radius: 16px; overflow: hidden; border: 1px solid ${colors.primary}15; transition: all 0.3s; }
    .project:hover { transform: translateY(-5px); border-color: ${colors.primary}40; }
    .project-img { height: 200px; background: ${gradients[0]}; display: flex; align-items: center; justify-content: center; font-size: 3rem; }
    .project-info { padding: 1.5rem; }
    .project-info h3 { margin-bottom: 0.5rem; color: ${colors.accent}; }
    .project-info p { opacity: 0.7; font-size: 0.9rem; }
    .skills { display: flex; flex-wrap: wrap; gap: 0.8rem; }
    .skill { padding: 0.5rem 1rem; background: ${colors.primary}15; border: 1px solid ${colors.primary}30; border-radius: 20px; font-size: 0.85rem; color: ${colors.accent}; }
    .contact-form { max-width: 600px; }
    .form-group { margin-bottom: 1.5rem; }
    .form-group label { display: block; margin-bottom: 0.5rem; opacity: 0.8; }
    .form-group input, .form-group textarea { width: 100%; padding: 1rem; background: ${colors.card}; border: 1px solid ${colors.primary}20; border-radius: 10px; color: #fff; font-size: 1rem; }
    .form-group input:focus, .form-group textarea:focus { outline: none; border-color: ${colors.primary}; }
    .btn { padding: 1rem 2rem; background: ${colors.primary}; color: #fff; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; transition: all 0.3s; }
    .btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px ${colors.primary}40; }
    .footer { padding: 2rem 4rem; text-align: center; border-top: 1px solid ${colors.primary}15; opacity: 0.5; }
    @media (max-width: 768px) { .sidebar { width: 100%; position: relative; } .main { margin-left: 0; } }
  </style>
</head>
<body>
  <aside class="sidebar">
    <div class="profile">
      <div class="profile-img">{{PROFILE_IMAGE}}</div>
      <h2>{{NAME}}</h2>
      <p>{{TITLE}}</p>
    </div>
    <ul class="nav">
      <li><a href="#home" class="active">Home</a></li>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#skills">Skills</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </aside>

  <main class="main">
    <section class="hero" id="home">
      <div>
        <h1>Hi, I'm <span>{{NAME}}</span></h1>
        <p>{{BIO}}</p>
        <div class="social">
          <a href="{{GITHUB_URL}}">GH</a>
          <a href="{{LINKEDIN_URL}}">LI</a>
          <a href="{{TWITTER_URL}}">TW</a>
          <a href="{{EMAIL}}">@</a>
        </div>
      </div>
    </section>

    <section class="section" id="projects">
      <h2>My Projects</h2>
      <div class="projects-grid">
        <div class="project">
          <div class="project-img">{{PROJECT_1_IMAGE}}</div>
          <div class="project-info">
            <h3>{{PROJECT_1_NAME}}</h3>
            <p>{{PROJECT_1_DESC}}</p>
          </div>
        </div>
        <div class="project">
          <div class="project-img">{{PROJECT_2_IMAGE}}</div>
          <div class="project-info">
            <h3>{{PROJECT_2_NAME}}</h3>
            <p>{{PROJECT_2_DESC}}</p>
          </div>
        </div>
        <div class="project">
          <div class="project-img">{{PROJECT_3_IMAGE}}</div>
          <div class="project-info">
            <h3>{{PROJECT_3_NAME}}</h3>
            <p>{{PROJECT_3_DESC}}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="skills">
      <h2>Skills</h2>
      <div class="skills">
        <span class="skill">{{SKILL_1}}</span>
        <span class="skill">{{SKILL_2}}</span>
        <span class="skill">{{SKILL_3}}</span>
        <span class="skill">{{SKILL_4}}</span>
        <span class="skill">{{SKILL_5}}</span>
        <span class="skill">{{SKILL_6}}</span>
      </div>
    </section>

    <section class="section" id="contact">
      <h2>Get In Touch</h2>
      <form class="contact-form">
        <div class="form-group">
          <label>Name</label>
          <input type="text" placeholder="Your name">
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" placeholder="your@email.com">
        </div>
        <div class="form-group">
          <label>Message</label>
          <textarea rows="5" placeholder="Your message..."></textarea>
        </div>
        <button type="submit" class="btn">Send Message</button>
      </form>
    </section>

    <footer class="footer">
      <p>&copy; {{YEAR}} {{NAME}}. All rights reserved.</p>
    </footer>
  </main>
</body>
</html>`;
}

function generateSocialMediaTemplate(id, colors, style) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}} - Social Media</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', sans-serif; background: ${colors.bg}; color: #fff; }
    .header { background: ${colors.card}; padding: 1rem 2rem; border-bottom: 1px solid ${colors.primary}20; }
    .header-inner { max-width: 900px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 1.5rem; font-weight: 800; color: ${colors.primary}; }
    .header-actions { display: flex; gap: 1rem; }
    .icon-btn { width: 40px; height: 40px; border-radius: 50%; background: ${colors.primary}15; border: none; color: ${colors.accent}; cursor: pointer; font-size: 1.2rem; }
    .container { max-width: 900px; margin: 0 auto; padding: 2rem; }
    .profile-header { background: ${colors.card}; border-radius: 20px; padding: 2rem; margin-bottom: 2rem; border: 1px solid ${colors.primary}15; }
    .profile-cover { height: 150px; background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary}); border-radius: 16px; margin-bottom: -50px; }
    .profile-info { display: flex; align-items: flex-end; gap: 1.5rem; padding: 0 1rem; }
    .profile-avatar { width: 100px; height: 100px; border-radius: 50%; background: ${colors.accent}; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; border: 4px solid ${colors.card}; }
    .profile-details h2 { font-size: 1.5rem; margin-bottom: 0.2rem; }
    .profile-details p { opacity: 0.6; font-size: 0.9rem; }
    .profile-stats { display: flex; gap: 2rem; margin-top: 1.5rem; padding: 1rem; border-top: 1px solid ${colors.primary}15; }
    .stat { text-align: center; }
    .stat-value { font-weight: 700; color: ${colors.accent}; }
    .stat-label { font-size: 0.8rem; opacity: 0.6; }
    .post { background: ${colors.card}; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; border: 1px solid ${colors.primary}15; }
    .post-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
    .post-avatar { width: 45px; height: 45px; border-radius: 50%; background: ${colors.primary}; display: flex; align-items: center; justify-content: center; font-weight: bold; }
    .post-meta h4 { font-size: 1rem; }
    .post-meta span { font-size: 0.8rem; opacity: 0.5; }
    .post-content { margin-bottom: 1rem; line-height: 1.6; }
    .post-image { width: 100%; height: 300px; background: linear-gradient(135deg, ${colors.primary}30, ${colors.secondary}30); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 3rem; margin-bottom: 1rem; }
    .post-actions { display: flex; gap: 1.5rem; padding-top: 1rem; border-top: 1px solid ${colors.primary}10; }
    .post-action { display: flex; align-items: center; gap: 0.5rem; opacity: 0.6; cursor: pointer; transition: all 0.3s; }
    .post-action:hover { opacity: 1; color: ${colors.accent}; }
    .trending { margin-top: 2rem; }
    .trending h3 { margin-bottom: 1rem; color: ${colors.accent}; }
    .trending-tags { display: flex; flex-wrap: wrap; gap: 0.8rem; }
    .tag { padding: 0.5rem 1rem; background: ${colors.primary}15; border: 1px solid ${colors.primary}30; border-radius: 20px; font-size: 0.85rem; color: ${colors.accent}; cursor: pointer; transition: all 0.3s; }
    .tag:hover { background: ${colors.primary}30; }
    @media (max-width: 768px) { .profile-info { flex-direction: column; align-items: center; text-align: center; } }
  </style>
</head>
<body>
  <header class="header">
    <div class="header-inner">
      <div class="logo">{{PLATFORM_NAME}}</div>
      <div class="header-actions">
        <button class="icon-btn">&#128269;</button>
        <button class="icon-btn">&#128276;</button>
        <button class="icon-btn">&#9993;</button>
      </div>
    </div>
  </header>

  <div class="container">
    <div class="profile-header">
      <div class="profile-cover"></div>
      <div class="profile-info">
        <div class="profile-avatar">{{PROFILE_AVATAR}}</div>
        <div class="profile-details">
          <h2>{{PROFILE_NAME}}</h2>
          <p>@{{USERNAME}}</p>
        </div>
      </div>
      <div class="profile-stats">
        <div class="stat"><div class="stat-value">{{FOLLOWERS}}</div><div class="stat-label">Followers</div></div>
        <div class="stat"><div class="stat-value">{{FOLLOWING}}</div><div class="stat-label">Following</div></div>
        <div class="stat"><div class="stat-value">{{POSTS}}</div><div class="stat-label">Posts</div></div>
        <div class="stat"><div class="stat-value">{{LIKES}}</div><div class="stat-label">Likes</div></div>
      </div>
    </div>

    <div class="post">
      <div class="post-header">
        <div class="post-avatar">{{POST_1_AVATAR}}</div>
        <div class="post-meta">
          <h4>{{POST_1_AUTHOR}}</h4>
          <span>{{POST_1_TIME}}</span>
        </div>
      </div>
      <p class="post-content">{{POST_1_CONTENT}}</p>
      <div class="post-image">{{POST_1_IMAGE}}</div>
      <div class="post-actions">
        <span class="post-action">&#10084; {{POST_1_LIKES}}</span>
        <span class="post-action">&#128172; {{POST_1_COMMENTS}}</span>
        <span class="post-action">&#9851; {{POST_1_SHARES}}</span>
      </div>
    </div>

    <div class="post">
      <div class="post-header">
        <div class="post-avatar">{{POST_2_AVATAR}}</div>
        <div class="post-meta">
          <h4>{{POST_2_AUTHOR}}</h4>
          <span>{{POST_2_TIME}}</span>
        </div>
      </div>
      <p class="post-content">{{POST_2_CONTENT}}</p>
      <div class="post-image">{{POST_2_IMAGE}}</div>
      <div class="post-actions">
        <span class="post-action">&#10084; {{POST_2_LIKES}}</span>
        <span class="post-action">&#128172; {{POST_2_COMMENTS}}</span>
        <span class="post-action">&#9851; {{POST_2_SHARES}}</span>
      </div>
    </div>

    <div class="trending">
      <h3>Trending Topics</h3>
      <div class="trending-tags">
        <span class="tag">{{TAG_1}}</span>
        <span class="tag">{{TAG_2}}</span>
        <span class="tag">{{TAG_3}}</span>
        <span class="tag">{{TAG_4}}</span>
        <span class="tag">{{TAG_5}}</span>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function generateAutomationTemplate(id, colors, style) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}} - Automation</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', sans-serif; background: ${colors.bg}; color: #fff; }
    .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 4rem 2rem; background: linear-gradient(135deg, ${colors.bg}, ${colors.card}); position: relative; }
    .hero::before { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(45deg, transparent, transparent 35px, ${colors.primary}05 35px, ${colors.primary}05 70px); }
    .hero-content { position: relative; z-index: 2; max-width: 900px; text-align: center; }
    .hero h1 { font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 900; margin-bottom: 1.5rem; }
    .hero h1 span { color: ${colors.accent}; }
    .hero p { font-size: 1.1rem; opacity: 0.8; max-width: 600px; margin: 0 auto 2rem; line-height: 1.6; }
    .btn { display: inline-block; padding: 1rem 2.5rem; background: ${colors.primary}; color: #fff; text-decoration: none; border-radius: 12px; font-weight: 600; transition: all 0.3s; border: none; cursor: pointer; }
    .btn:hover { transform: translateY(-2px); box-shadow: 0 10px 30px ${colors.primary}40; }
    .workflow { padding: 5rem 2rem; background: ${colors.card}; }
    .workflow h2 { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; }
    .steps { max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 2rem; }
    .step { text-align: center; padding: 2rem; }
    .step-num { width: 60px; height: 60px; background: ${colors.primary}; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 700; margin: 0 auto 1rem; }
    .step h3 { margin-bottom: 0.5rem; color: ${colors.accent}; }
    .step p { opacity: 0.7; font-size: 0.9rem; }
    .features { padding: 5rem 2rem; }
    .features h2 { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; }
    .features-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
    .feature { padding: 2rem; background: ${colors.card}; border-radius: 16px; border: 1px solid ${colors.primary}15; }
    .feature h3 { color: ${colors.accent}; margin-bottom: 0.5rem; }
    .feature p { opacity: 0.7; line-height: 1.5; }
    .integrations { padding: 5rem 2rem; background: ${colors.card}; }
    .integrations h2 { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; }
    .integrations-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 1.5rem; max-width: 800px; margin: 0 auto; }
    .integration { padding: 1rem 2rem; background: ${colors.bg}; border-radius: 12px; border: 1px solid ${colors.primary}20; font-weight: 600; }
    .cta { padding: 5rem 2rem; text-align: center; background: ${colors.primary}; }
    .cta h2 { font-size: 2.5rem; margin-bottom: 1rem; }
    .cta p { opacity: 0.9; margin-bottom: 2rem; }
    .cta .btn { background: #fff; color: ${colors.primary}; }
    .footer { padding: 3rem 2rem; text-align: center; border-top: 1px solid ${colors.primary}15; opacity: 0.5; }
  </style>
</head>
<body>
  <section class="hero">
    <div class="hero-content">
      <h1>{{HEADING}} <span>{{HEADING_HIGHLIGHT}}</span></h1>
      <p>{{DESCRIPTION}}</p>
      <a href="#workflow" class="btn">{{CTA_BUTTON}}</a>
    </div>
  </section>

  <section class="workflow" id="workflow">
    <h2>{{WORKFLOW_TITLE}}</h2>
    <div class="steps">
      <div class="step">
        <div class="step-num">1</div>
        <h3>{{STEP_1_TITLE}}</h3>
        <p>{{STEP_1_DESC}}</p>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <h3>{{STEP_2_TITLE}}</h3>
        <p>{{STEP_2_DESC}}</p>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <h3>{{STEP_3_TITLE}}</h3>
        <p>{{STEP_3_DESC}}</p>
      </div>
      <div class="step">
        <div class="step-num">4</div>
        <h3>{{STEP_4_TITLE}}</h3>
        <p>{{STEP_4_DESC}}</p>
      </div>
    </div>
  </section>

  <section class="features" id="features">
    <h2>{{FEATURES_TITLE}}</h2>
    <div class="features-grid">
      <div class="feature">
        <h3>{{FEATURE_1_TITLE}}</h3>
        <p>{{FEATURE_1_DESC}}</p>
      </div>
      <div class="feature">
        <h3>{{FEATURE_2_TITLE}}</h3>
        <p>{{FEATURE_2_DESC}}</p>
      </div>
      <div class="feature">
        <h3>{{FEATURE_3_TITLE}}</h3>
        <p>{{FEATURE_3_DESC}}</p>
      </div>
    </div>
  </section>

  <section class="integrations">
    <h2>{{INTEGRATIONS_TITLE}}</h2>
    <div class="integrations-grid">
      <span class="integration">{{INTEGRATION_1}}</span>
      <span class="integration">{{INTEGRATION_2}}</span>
      <span class="integration">{{INTEGRATION_3}}</span>
      <span class="integration">{{INTEGRATION_4}}</span>
      <span class="integration">{{INTEGRATION_5}}</span>
      <span class="integration">{{INTEGRATION_6}}</span>
    </div>
  </section>

  <section class="cta">
    <h2>{{CTA_TITLE}}</h2>
    <p>{{CTA_DESC}}</p>
    <a href="#" class="btn">{{CTA_BUTTON}}</a>
  </section>

  <footer class="footer">
    <p>{{FOOTER_TEXT}} | &copy; {{YEAR}} {{BRAND}}</p>
  </footer>
</body>
</html>`;
}

function generateEcommerceTemplate(id, colors, style) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}} - Shop</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', sans-serif; background: ${colors.bg}; color: #fff; }
    .header { background: ${colors.card}; padding: 1rem 2rem; border-bottom: 1px solid ${colors.primary}20; position: sticky; top: 0; z-index: 100; }
    .header-inner { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 1.8rem; font-weight: 800; color: ${colors.primary}; }
    .nav { display: flex; gap: 2rem; list-style: none; }
    .nav a { color: #fff; text-decoration: none; opacity: 0.8; transition: all 0.3s; }
    .nav a:hover { color: ${colors.accent}; }
    .cart-btn { padding: 0.5rem 1.2rem; background: ${colors.primary}; border-radius: 8px; color: #fff; border: none; cursor: pointer; font-weight: 600; }
    .hero { padding: 4rem 2rem; background: linear-gradient(135deg, ${colors.bg}, ${colors.card}); text-align: center; }
    .hero h1 { font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 800; margin-bottom: 1rem; }
    .hero h1 span { color: ${colors.accent}; }
    .hero p { opacity: 0.8; max-width: 500px; margin: 0 auto 2rem; }
    .btn { display: inline-block; padding: 1rem 2rem; background: ${colors.primary}; color: #fff; text-decoration: none; border-radius: 10px; font-weight: 600; transition: all 0.3s; }
    .btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px ${colors.primary}40; }
    .products { padding: 4rem 2rem; max-width: 1200px; margin: 0 auto; }
    .products h2 { text-align: center; font-size: 2rem; margin-bottom: 2rem; }
    .products-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 2rem; }
    .product { background: ${colors.card}; border-radius: 16px; overflow: hidden; border: 1px solid ${colors.primary}15; transition: all 0.3s; }
    .product:hover { transform: translateY(-5px); border-color: ${colors.primary}40; }
    .product-img { height: 220px; background: linear-gradient(135deg, ${colors.primary}30, ${colors.secondary}30); display: flex; align-items: center; justify-content: center; font-size: 3rem; }
    .product-info { padding: 1.5rem; }
    .product-info h3 { margin-bottom: 0.5rem; }
    .product-info .price { font-size: 1.3rem; font-weight: 700; color: ${colors.accent}; margin-bottom: 1rem; }
    .add-cart { width: 100%; padding: 0.8rem; background: ${colors.primary}; color: #fff; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.3s; }
    .add-cart:hover { background: ${colors.secondary}; }
    .categories { padding: 3rem 2rem; background: ${colors.card}; }
    .categories h2 { text-align: center; font-size: 2rem; margin-bottom: 2rem; }
    .cat-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; max-width: 900px; margin: 0 auto; }
    .cat { padding: 1rem 2rem; background: ${colors.bg}; border-radius: 12px; border: 1px solid ${colors.primary}20; cursor: pointer; transition: all 0.3s; }
    .cat:hover { background: ${colors.primary}; }
    .footer { padding: 3rem 2rem; text-align: center; border-top: 1px solid ${colors.primary}15; opacity: 0.5; margin-top: 3rem; }
  </style>
</head>
<body>
  <header class="header">
    <div class="header-inner">
      <div class="logo">{{SHOP_NAME}}</div>
      <ul class="nav">
        <li><a href="#home">Home</a></li>
        <li><a href="#products">Products</a></li>
        <li><a href="#categories">Categories</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <button class="cart-btn">Cart ({{CART_COUNT}})</button>
    </div>
  </header>

  <section class="hero" id="home">
    <h1>{{HEADING}} <span>{{HEADING_HIGHLIGHT}}</span></h1>
    <p>{{DESCRIPTION}}</p>
    <a href="#products" class="btn">{{CTA_BUTTON}}</a>
  </section>

  <section class="products" id="products">
    <h2>{{PRODUCTS_TITLE}}</h2>
    <div class="products-grid">
      <div class="product">
        <div class="product-img">{{PRODUCT_1_IMAGE}}</div>
        <div class="product-info">
          <h3>{{PRODUCT_1_NAME}}</h3>
          <div class="price">{{PRODUCT_1_PRICE}}</div>
          <button class="add-cart">Add to Cart</button>
        </div>
      </div>
      <div class="product">
        <div class="product-img">{{PRODUCT_2_IMAGE}}</div>
        <div class="product-info">
          <h3>{{PRODUCT_2_NAME}}</h3>
          <div class="price">{{PRODUCT_2_PRICE}}</div>
          <button class="add-cart">Add to Cart</button>
        </div>
      </div>
      <div class="product">
        <div class="product-img">{{PRODUCT_3_IMAGE}}</div>
        <div class="product-info">
          <h3>{{PRODUCT_3_NAME}}</h3>
          <div class="price">{{PRODUCT_3_PRICE}}</div>
          <button class="add-cart">Add to Cart</button>
        </div>
      </div>
      <div class="product">
        <div class="product-img">{{PRODUCT_4_IMAGE}}</div>
        <div class="product-info">
          <h3>{{PRODUCT_4_NAME}}</h3>
          <div class="price">{{PRODUCT_4_PRICE}}</div>
          <button class="add-cart">Add to Cart</button>
        </div>
      </div>
    </div>
  </section>

  <section class="categories" id="categories">
    <h2>{{CATEGORIES_TITLE}}</h2>
    <div class="cat-grid">
      <span class="cat">{{CATEGORY_1}}</span>
      <span class="cat">{{CATEGORY_2}}</span>
      <span class="cat">{{CATEGORY_3}}</span>
      <span class="cat">{{CATEGORY_4}}</span>
      <span class="cat">{{CATEGORY_5}}</span>
      <span class="cat">{{CATEGORY_6}}</span>
    </div>
  </section>

  <footer class="footer" id="contact">
    <p>{{FOOTER_TEXT}} | &copy; {{YEAR}} {{SHOP_NAME}}</p>
  </footer>
</body>
</html>`;
}

function generateEducationTemplate(id, colors, style) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}} - Education</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', sans-serif; background: ${colors.bg}; color: #fff; }
    .header { background: ${colors.card}; padding: 1rem 2rem; border-bottom: 1px solid ${colors.primary}20; }
    .header-inner { max-width: 1100px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 1.6rem; font-weight: 800; color: ${colors.primary}; }
    .nav { display: flex; gap: 2rem; list-style: none; }
    .nav a { color: #fff; text-decoration: none; opacity: 0.8; }
    .nav a:hover { color: ${colors.accent}; }
    .hero { padding: 5rem 2rem; text-align: center; background: linear-gradient(135deg, ${colors.bg}, ${colors.card}); }
    .hero h1 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; margin-bottom: 1rem; }
    .hero h1 span { color: ${colors.accent}; }
    .hero p { opacity: 0.8; max-width: 500px; margin: 0 auto 2rem; }
    .btn { padding: 1rem 2rem; background: ${colors.primary}; color: #fff; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.3s; }
    .btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px ${colors.primary}40; }
    .courses { padding: 4rem 2rem; max-width: 1100px; margin: 0 auto; }
    .courses h2 { text-align: center; font-size: 2rem; margin-bottom: 2rem; }
    .courses-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
    .course { background: ${colors.card}; border-radius: 16px; padding: 2rem; border: 1px solid ${colors.primary}15; transition: all 0.3s; }
    .course:hover { border-color: ${colors.primary}40; transform: translateY(-5px); }
    .course-icon { font-size: 2.5rem; margin-bottom: 1rem; }
    .course h3 { color: ${colors.accent}; margin-bottom: 0.5rem; }
    .course p { opacity: 0.7; font-size: 0.9rem; margin-bottom: 1rem; }
    .course-meta { display: flex; justify-content: space-between; font-size: 0.85rem; opacity: 0.6; }
    .stats { padding: 3rem 2rem; background: ${colors.card}; display: flex; justify-content: center; gap: 4rem; flex-wrap: wrap; }
    .stat { text-align: center; }
    .stat-num { font-size: 2.5rem; font-weight: 800; color: ${colors.accent}; }
    .stat-label { opacity: 0.6; }
    .instructors { padding: 4rem 2rem; max-width: 1100px; margin: 0 auto; }
    .instructors h2 { text-align: center; font-size: 2rem; margin-bottom: 2rem; }
    .instructor-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; }
    .instructor { text-align: center; padding: 1.5rem; }
    .instructor-img { width: 80px; height: 80px; border-radius: 50%; background: ${colors.primary}; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-size: 2rem; }
    .instructor h4 { color: ${colors.accent}; }
    .instructor p { opacity: 0.6; font-size: 0.85rem; }
    .footer { padding: 3rem 2rem; text-align: center; border-top: 1px solid ${colors.primary}15; opacity: 0.5; }
  </style>
</head>
<body>
  <header class="header">
    <div class="header-inner">
      <div class="logo">{{ACADEMY_NAME}}</div>
      <ul class="nav">
        <li><a href="#courses">Courses</a></li>
        <li><a href="#instructors">Instructors</a></li>
        <li><a href="#about">About</a></li>
      </ul>
    </div>
  </header>

  <section class="hero">
    <h1>{{HEADING}} <span>{{HEADING_HIGHLIGHT}}</span></h1>
    <p>{{DESCRIPTION}}</p>
    <a href="#courses" class="btn">{{CTA_BUTTON}}</a>
  </section>

  <section class="stats">
    <div class="stat"><div class="stat-num">{{STAT_1_VALUE}}</div><div class="stat-label">{{STAT_1_LABEL}}</div></div>
    <div class="stat"><div class="stat-num">{{STAT_2_VALUE}}</div><div class="stat-label">{{STAT_2_LABEL}}</div></div>
    <div class="stat"><div class="stat-num">{{STAT_3_VALUE}}</div><div class="stat-label">{{STAT_3_LABEL}}</div></div>
  </section>

  <section class="courses" id="courses">
    <h2>{{COURSES_TITLE}}</h2>
    <div class="courses-grid">
      <div class="course">
        <div class="course-icon">{{COURSE_1_ICON}}</div>
        <h3>{{COURSE_1_NAME}}</h3>
        <p>{{COURSE_1_DESC}}</p>
        <div class="course-meta"><span>{{COURSE_1_DURATION}}</span><span>{{COURSE_1_LEVEL}}</span></div>
      </div>
      <div class="course">
        <div class="course-icon">{{COURSE_2_ICON}}</div>
        <h3>{{COURSE_2_NAME}}</h3>
        <p>{{COURSE_2_DESC}}</p>
        <div class="course-meta"><span>{{COURSE_2_DURATION}}</span><span>{{COURSE_2_LEVEL}}</span></div>
      </div>
      <div class="course">
        <div class="course-icon">{{COURSE_3_ICON}}</div>
        <h3>{{COURSE_3_NAME}}</h3>
        <p>{{COURSE_3_DESC}}</p>
        <div class="course-meta"><span>{{COURSE_3_DURATION}}</span><span>{{COURSE_3_LEVEL}}</span></div>
      </div>
    </div>
  </section>

  <section class="instructors" id="instructors">
    <h2>{{INSTRUCTORS_TITLE}}</h2>
    <div class="instructor-grid">
      <div class="instructor">
        <div class="instructor-img">{{INSTRUCTOR_1_IMAGE}}</div>
        <h4>{{INSTRUCTOR_1_NAME}}</h4>
        <p>{{INSTRUCTOR_1_ROLE}}</p>
      </div>
      <div class="instructor">
        <div class="instructor-img">{{INSTRUCTOR_2_IMAGE}}</div>
        <h4>{{INSTRUCTOR_2_NAME}}</h4>
        <p>{{INSTRUCTOR_2_ROLE}}</p>
      </div>
      <div class="instructor">
        <div class="instructor-img">{{INSTRUCTOR_3_IMAGE}}</div>
        <h4>{{INSTRUCTOR_3_NAME}}</h4>
        <p>{{INSTRUCTOR_3_ROLE}}</p>
      </div>
    </div>
  </section>

  <footer class="footer">
    <p>{{FOOTER_TEXT}} | &copy; {{YEAR}} {{ACADEMY_NAME}}</p>
  </footer>
</body>
</html>`;
}

function generateEntertainmentTemplate(id, colors, style) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}} - Entertainment</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', sans-serif; background: ${colors.bg}; color: #fff; }
    .hero { min-height: 80vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, ${colors.bg}, ${colors.card}, ${colors.bg}); position: relative; overflow: hidden; }
    .hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, ${colors.primary}15, transparent 60%); }
    .hero-content { position: relative; z-index: 2; text-align: center; padding: 2rem; }
    .hero h1 { font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 900; margin-bottom: 1rem; text-shadow: 0 0 30px ${colors.primary}60; }
    .hero p { font-size: 1.2rem; opacity: 0.8; max-width: 600px; margin: 0 auto 2rem; }
    .btn { padding: 1rem 2.5rem; background: ${colors.primary}; color: #fff; border: none; border-radius: 50px; font-weight: 700; font-size: 1rem; cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.3s; }
    .btn:hover { transform: scale(1.05); box-shadow: 0 10px 40px ${colors.primary}50; }
    .shows { padding: 5rem 2rem; max-width: 1200px; margin: 0 auto; }
    .shows h2 { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; }
    .shows-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; }
    .show { background: ${colors.card}; border-radius: 20px; overflow: hidden; border: 1px solid ${colors.primary}15; transition: all 0.3s; }
    .show:hover { transform: scale(1.03); border-color: ${colors.primary}50; }
    .show-img { height: 300px; background: linear-gradient(135deg, ${colors.primary}40, ${colors.secondary}40); display: flex; align-items: center; justify-content: center; font-size: 4rem; }
    .show-info { padding: 1.5rem; }
    .show-info h3 { color: ${colors.accent}; margin-bottom: 0.3rem; }
    .show-info p { opacity: 0.6; font-size: 0.9rem; }
    .show-tag { display: inline-block; padding: 0.2rem 0.8rem; background: ${colors.primary}20; border-radius: 20px; font-size: 0.75rem; color: ${colors.accent}; margin-top: 0.5rem; }
    .categories { padding: 4rem 2rem; background: ${colors.card}; }
    .categories h2 { text-align: center; font-size: 2rem; margin-bottom: 2rem; }
    .cat-list { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; max-width: 800px; margin: 0 auto; }
    .cat-item { padding: 1rem 2rem; background: ${colors.bg}; border-radius: 12px; border: 1px solid ${colors.primary}20; cursor: pointer; transition: all 0.3s; }
    .cat-item:hover { background: ${colors.primary}; border-color: ${colors.primary}; }
    .newsletter { padding: 5rem 2rem; text-align: center; background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary}); }
    .newsletter h2 { font-size: 2rem; margin-bottom: 1rem; }
    .newsletter p { opacity: 0.9; margin-bottom: 2rem; }
    .newsletter-form { display: flex; gap: 1rem; justify-content: center; max-width: 500px; margin: 0 auto; }
    .newsletter-form input { flex: 1; padding: 1rem; border-radius: 10px; border: none; font-size: 1rem; }
    .newsletter-form button { padding: 1rem 2rem; background: ${colors.bg}; color: #fff; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; }
    .footer { padding: 3rem 2rem; text-align: center; border-top: 1px solid ${colors.primary}15; opacity: 0.5; }
  </style>
</head>
<body>
  <section class="hero">
    <div class="hero-content">
      <h1>{{HEADING}}</h1>
      <p>{{DESCRIPTION}}</p>
      <a href="#shows" class="btn">{{CTA_BUTTON}}</a>
    </div>
  </section>

  <section class="shows" id="shows">
    <h2>{{SHOWS_TITLE}}</h2>
    <div class="shows-grid">
      <div class="show">
        <div class="show-img">{{SHOW_1_IMAGE}}</div>
        <div class="show-info">
          <h3>{{SHOW_1_NAME}}</h3>
          <p>{{SHOW_1_DESC}}</p>
          <span class="show-tag">{{SHOW_1_TAG}}</span>
        </div>
      </div>
      <div class="show">
        <div class="show-img">{{SHOW_2_IMAGE}}</div>
        <div class="show-info">
          <h3>{{SHOW_2_NAME}}</h3>
          <p>{{SHOW_2_DESC}}</p>
          <span class="show-tag">{{SHOW_2_TAG}}</span>
        </div>
      </div>
      <div class="show">
        <div class="show-img">{{SHOW_3_IMAGE}}</div>
        <div class="show-info">
          <h3>{{SHOW_3_NAME}}</h3>
          <p>{{SHOW_3_DESC}}</p>
          <span class="show-tag">{{SHOW_3_TAG}}</span>
        </div>
      </div>
      <div class="show">
        <div class="show-img">{{SHOW_4_IMAGE}}</div>
        <div class="show-info">
          <h3>{{SHOW_4_NAME}}</h3>
          <p>{{SHOW_4_DESC}}</p>
          <span class="show-tag">{{SHOW_4_TAG}}</span>
        </div>
      </div>
    </div>
  </section>

  <section class="categories">
    <h2>{{CATEGORIES_TITLE}}</h2>
    <div class="cat-list">
      <span class="cat-item">{{CATEGORY_1}}</span>
      <span class="cat-item">{{CATEGORY_2}}</span>
      <span class="cat-item">{{CATEGORY_3}}</span>
      <span class="cat-item">{{CATEGORY_4}}</span>
      <span class="cat-item">{{CATEGORY_5}}</span>
    </div>
  </section>

  <section class="newsletter">
    <h2>{{NEWSLETTER_TITLE}}</h2>
    <p>{{NEWSLETTER_DESC}}</p>
    <form class="newsletter-form">
      <input type="email" placeholder="Enter your email">
      <button type="submit">Subscribe</button>
    </form>
  </section>

  <footer class="footer">
    <p>{{FOOTER_TEXT}} | &copy; {{YEAR}} {{BRAND}}</p>
  </footer>
</body>
</html>`;
}

function generateToolsTemplate(id, colors, style) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}} - Tools</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', sans-serif; background: ${colors.bg}; color: #fff; }
    .header { background: ${colors.card}; padding: 1rem 2rem; border-bottom: 1px solid ${colors.primary}20; }
    .header-inner { max-width: 1100px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 1.5rem; font-weight: 800; color: ${colors.primary}; }
    .hero { padding: 5rem 2rem; text-align: center; background: linear-gradient(135deg, ${colors.bg}, ${colors.card}); }
    .hero h1 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; margin-bottom: 1rem; }
    .hero h1 span { color: ${colors.accent}; }
    .hero p { opacity: 0.8; max-width: 500px; margin: 0 auto 2rem; }
    .tool-section { padding: 4rem 2rem; max-width: 900px; margin: 0 auto; }
    .tool-box { background: ${colors.card}; border-radius: 20px; padding: 3rem; border: 1px solid ${colors.primary}15; }
    .tool-box h2 { text-align: center; margin-bottom: 2rem; color: ${colors.accent}; }
    .input-group { margin-bottom: 1.5rem; }
    .input-group label { display: block; margin-bottom: 0.5rem; opacity: 0.8; }
    .input-group input, .input-group textarea, .input-group select { width: 100%; padding: 1rem; background: ${colors.bg}; border: 1px solid ${colors.primary}20; border-radius: 10px; color: #fff; font-size: 1rem; }
    .input-group input:focus, .input-group textarea:focus { outline: none; border-color: ${colors.primary}; }
    .btn { padding: 1rem 2rem; background: ${colors.primary}; color: #fff; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; transition: all 0.3s; width: 100%; }
    .btn:hover { background: ${colors.secondary}; }
    .result { margin-top: 2rem; padding: 2rem; background: ${colors.bg}; border-radius: 12px; border: 1px solid ${colors.primary}20; min-height: 100px; }
    .features { padding: 4rem 2rem; background: ${colors.card}; }
    .features h2 { text-align: center; font-size: 2rem; margin-bottom: 2rem; }
    .features-grid { max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; }
    .feature { text-align: center; padding: 2rem; }
    .feature-icon { font-size: 3rem; margin-bottom: 1rem; }
    .feature h3 { color: ${colors.accent}; margin-bottom: 0.5rem; }
    .feature p { opacity: 0.6; font-size: 0.9rem; }
    .footer { padding: 3rem 2rem; text-align: center; border-top: 1px solid ${colors.primary}15; opacity: 0.5; }
  </style>
</head>
<body>
  <header class="header">
    <div class="header-inner">
      <div class="logo">{{TOOL_NAME}}</div>
    </div>
  </header>

  <section class="hero">
    <h1>{{HEADING}} <span>{{HEADING_HIGHLIGHT}}</span></h1>
    <p>{{DESCRIPTION}}</p>
  </section>

  <section class="tool-section">
    <div class="tool-box">
      <h2>{{TOOL_TITLE}}</h2>
      <div class="input-group">
        <label>{{INPUT_1_LABEL}}</label>
        <input type="text" placeholder="{{INPUT_1_PLACEHOLDER}}">
      </div>
      <div class="input-group">
        <label>{{INPUT_2_LABEL}}</label>
        <textarea rows="4" placeholder="{{INPUT_2_PLACEHOLDER}}"></textarea>
      </div>
      <button class="btn">{{ACTION_BUTTON}}</button>
      <div class="result">
        <p style="opacity:0.5;text-align:center;">{{RESULT_PLACEHOLDER}}</p>
      </div>
    </div>
  </section>

  <section class="features">
    <h2>{{FEATURES_TITLE}}</h2>
    <div class="features-grid">
      <div class="feature">
        <div class="feature-icon">{{FEATURE_1_ICON}}</div>
        <h3>{{FEATURE_1_TITLE}}</h3>
        <p>{{FEATURE_1_DESC}}</p>
      </div>
      <div class="feature">
        <div class="feature-icon">{{FEATURE_2_ICON}}</div>
        <h3>{{FEATURE_2_TITLE}}</h3>
        <p>{{FEATURE_2_DESC}}</p>
      </div>
      <div class="feature">
        <div class="feature-icon">{{FEATURE_3_ICON}}</div>
        <h3>{{FEATURE_3_TITLE}}</h3>
        <p>{{FEATURE_3_DESC}}</p>
      </div>
    </div>
  </section>

  <footer class="footer">
    <p>{{FOOTER_TEXT}} | &copy; {{YEAR}} {{TOOL_NAME}}</p>
  </footer>
</body>
</html>`;
}

function generateFunTemplate(id, colors, style) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}} - Fun</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', sans-serif; background: ${colors.bg}; color: #fff; }
    .hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 2rem; background: linear-gradient(135deg, ${colors.bg}, ${colors.card}, ${colors.bg}); position: relative; overflow: hidden; }
    .hero::before { content: ''; position: absolute; width: 300px; height: 300px; background: radial-gradient(circle, ${colors.primary}20, transparent); top: 10%; left: 10%; border-radius: 50%; animation: float 6s ease-in-out infinite; }
    .hero::after { content: ''; position: absolute; width: 200px; height: 200px; background: radial-gradient(circle, ${colors.accent}20, transparent); bottom: 10%; right: 10%; border-radius: 50%; animation: float 8s ease-in-out infinite reverse; }
    @keyframes float { 0%,100% { transform: translate(0,0); } 50% { transform: translate(30px,-30px); } }
    .hero-content { position: relative; z-index: 2; }
    .hero h1 { font-size: clamp(2.5rem, 7vw, 5rem); font-weight: 900; margin-bottom: 1rem; }
    .hero h1 span { background: linear-gradient(135deg, ${colors.primary}, ${colors.accent}, ${colors.secondary}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .hero p { font-size: 1.2rem; opacity: 0.8; max-width: 500px; margin: 0 auto 2rem; }
    .btn { padding: 1rem 2.5rem; background: ${colors.primary}; color: #fff; border: none; border-radius: 50px; font-weight: 700; font-size: 1rem; cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.3s; }
    .btn:hover { transform: scale(1.1) rotate(-2deg); box-shadow: 0 10px 30px ${colors.primary}50; }
    .fun-section { padding: 5rem 2rem; max-width: 900px; margin: 0 auto; text-align: center; }
    .fun-section h2 { font-size: 2.5rem; margin-bottom: 2rem; }
    .fun-box { background: ${colors.card}; border-radius: 24px; padding: 3rem; border: 1px solid ${colors.primary}20; margin-top: 2rem; }
    .joke-box { font-size: 1.3rem; line-height: 1.6; padding: 2rem; background: ${colors.bg}; border-radius: 16px; margin-bottom: 1.5rem; }
    .emoji-rain { font-size: 2rem; display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; margin: 2rem 0; }
    .emoji { animation: bounce 1s ease infinite; }
    .emoji:nth-child(2n) { animation-delay: 0.2s; }
    .emoji:nth-child(3n) { animation-delay: 0.4s; }
    @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
    .facts { padding: 4rem 2rem; background: ${colors.card}; }
    .facts h2 { text-align: center; font-size: 2rem; margin-bottom: 2rem; }
    .fact-grid { max-width: 800px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; }
    .fact { padding: 1.5rem; background: ${colors.bg}; border-radius: 16px; border: 1px solid ${colors.primary}15; }
    .fact-num { font-size: 2rem; font-weight: 800; color: ${colors.accent}; }
    .fact p { opacity: 0.7; margin-top: 0.5rem; }
    .quiz { padding: 4rem 2rem; max-width: 700px; margin: 0 auto; }
    .quiz h2 { text-align: center; font-size: 2rem; margin-bottom: 2rem; }
    .quiz-card { background: ${colors.card}; border-radius: 20px; padding: 2rem; border: 1px solid ${colors.primary}15; }
    .quiz-question { font-size: 1.2rem; margin-bottom: 1.5rem; }
    .quiz-options { display: grid; gap: 0.8rem; }
    .quiz-option { padding: 1rem; background: ${colors.bg}; border: 1px solid ${colors.primary}20; border-radius: 12px; cursor: pointer; transition: all 0.3s; }
    .quiz-option:hover { background: ${colors.primary}20; border-color: ${colors.primary}; }
    .footer { padding: 3rem 2rem; text-align: center; border-top: 1px solid ${colors.primary}15; opacity: 0.5; }
  </style>
</head>
<body>
  <section class="hero">
    <div class="hero-content">
      <h1>{{HEADING}} <span>{{HEADING_HIGHLIGHT}}</span></h1>
      <p>{{DESCRIPTION}}</p>
      <a href="#fun" class="btn">{{CTA_BUTTON}}</a>
    </div>
  </section>

  <section class="fun-section" id="fun">
    <h2>{{SECTION_TITLE}}</h2>
    <div class="fun-box">
      <div class="emoji-rain">
        <span class="emoji">{{EMOJI_1}}</span>
        <span class="emoji">{{EMOJI_2}}</span>
        <span class="emoji">{{EMOJI_3}}</span>
        <span class="emoji">{{EMOJI_4}}</span>
        <span class="emoji">{{EMOJI_5}}</span>
        <span class="emoji">{{EMOJI_6}}</span>
      </div>
      <div class="joke-box">{{JOKE_OR_CONTENT}}</div>
      <button class="btn">{{ACTION_BUTTON}}</button>
    </div>
  </section>

  <section class="facts">
    <h2>{{FACTS_TITLE}}</h2>
    <div class="fact-grid">
      <div class="fact">
        <div class="fact-num">{{FACT_1_NUM}}</div>
        <p>{{FACT_1_TEXT}}</p>
      </div>
      <div class="fact">
        <div class="fact-num">{{FACT_2_NUM}}</div>
        <p>{{FACT_2_TEXT}}</p>
      </div>
      <div class="fact">
        <div class="fact-num">{{FACT_3_NUM}}</div>
        <p>{{FACT_3_TEXT}}</p>
      </div>
      <div class="fact">
        <div class="fact-num">{{FACT_4_NUM}}</div>
        <p>{{FACT_4_TEXT}}</p>
      </div>
    </div>
  </section>

  <section class="quiz">
    <h2>{{QUIZ_TITLE}}</h2>
    <div class="quiz-card">
      <div class="quiz-question">{{QUIZ_QUESTION}}</div>
      <div class="quiz-options">
        <div class="quiz-option">{{OPTION_1}}</div>
        <div class="quiz-option">{{OPTION_2}}</div>
        <div class="quiz-option">{{OPTION_3}}</div>
        <div class="quiz-option">{{OPTION_4}}</div>
      </div>
    </div>
  </section>

  <footer class="footer">
    <p>{{FOOTER_TEXT}} | &copy; {{YEAR}} {{BRAND}}</p>
  </footer>
</body>
</html>`;
}

function generateFreelancingTemplate(id, colors, style) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}} - Freelancing</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', sans-serif; background: ${colors.bg}; color: #fff; }
    .hero { min-height: 90vh; display: flex; align-items: center; padding: 4rem; background: linear-gradient(135deg, ${colors.bg}, ${colors.card}); }
    .hero-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
    .hero h1 { font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 800; margin-bottom: 1rem; }
    .hero h1 span { color: ${colors.accent}; }
    .hero p { opacity: 0.8; line-height: 1.7; margin-bottom: 2rem; }
    .btn { padding: 1rem 2rem; background: ${colors.primary}; color: #fff; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.3s; }
    .btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px ${colors.primary}40; }
    .hero-visual { min-height: 350px; background: ${colors.primary}10; border-radius: 20px; border: 1px solid ${colors.primary}20; display: flex; align-items: center; justify-content: center; font-size: 5rem; }
    .services { padding: 5rem 2rem; max-width: 1100px; margin: 0 auto; }
    .services h2 { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; }
    .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
    .service { background: ${colors.card}; border-radius: 16px; padding: 2rem; border: 1px solid ${colors.primary}15; transition: all 0.3s; }
    .service:hover { border-color: ${colors.primary}40; transform: translateY(-5px); }
    .service h3 { color: ${colors.accent}; margin-bottom: 0.5rem; }
    .service p { opacity: 0.7; font-size: 0.9rem; line-height: 1.5; }
    .price-tag { display: inline-block; margin-top: 1rem; padding: 0.3rem 1rem; background: ${colors.primary}20; border-radius: 20px; font-size: 0.85rem; color: ${colors.accent}; }
    .gigs { padding: 4rem 2rem; background: ${colors.card}; }
    .gigs h2 { text-align: center; font-size: 2rem; margin-bottom: 2rem; }
    .gigs-grid { max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
    .gig { background: ${colors.bg}; border-radius: 16px; padding: 2rem; border: 1px solid ${colors.primary}15; }
    .gig h3 { color: ${colors.accent}; margin-bottom: 0.5rem; }
    .gig p { opacity: 0.7; font-size: 0.9rem; margin-bottom: 1rem; }
    .gig-meta { display: flex; justify-content: space-between; font-size: 0.85rem; }
    .testimonials { padding: 4rem 2rem; max-width: 1000px; margin: 0 auto; }
    .testimonials h2 { text-align: center; font-size: 2rem; margin-bottom: 2rem; }
    .testimonial-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
    .testimonial { background: ${colors.card}; border-radius: 16px; padding: 2rem; border: 1px solid ${colors.primary}15; }
    .testimonial p { font-style: italic; opacity: 0.8; margin-bottom: 1rem; }
    .testimonial-author { font-weight: 600; color: ${colors.accent}; }
    .cta { padding: 4rem 2rem; text-align: center; background: ${colors.primary}; }
    .cta h2 { font-size: 2rem; margin-bottom: 1rem; }
    .cta p { opacity: 0.9; margin-bottom: 2rem; }
    .cta .btn { background: #fff; color: ${colors.primary}; }
    .footer { padding: 3rem 2rem; text-align: center; border-top: 1px solid ${colors.primary}15; opacity: 0.5; }
  </style>
</head>
<body>
  <section class="hero">
    <div class="hero-inner">
      <div>
        <h1>{{HEADING}} <span>{{HEADING_HIGHLIGHT}}</span></h1>
        <p>{{DESCRIPTION}}</p>
        <a href="#services" class="btn">{{CTA_BUTTON}}</a>
      </div>
      <div class="hero-visual">{{HERO_IMAGE}}</div>
    </div>
  </section>

  <section class="services" id="services">
    <h2>{{SERVICES_TITLE}}</h2>
    <div class="services-grid">
      <div class="service">
        <h3>{{SERVICE_1_NAME}}</h3>
        <p>{{SERVICE_1_DESC}}</p>
        <span class="price-tag">{{SERVICE_1_PRICE}}</span>
      </div>
      <div class="service">
        <h3>{{SERVICE_2_NAME}}</h3>
        <p>{{SERVICE_2_DESC}}</p>
        <span class="price-tag">{{SERVICE_2_PRICE}}</span>
      </div>
      <div class="service">
        <h3>{{SERVICE_3_NAME}}</h3>
        <p>{{SERVICE_3_DESC}}</p>
        <span class="price-tag">{{SERVICE_3_PRICE}}</span>
      </div>
    </div>
  </section>

  <section class="gigs">
    <h2>{{GIGS_TITLE}}</h2>
    <div class="gigs-grid">
      <div class="gig">
        <h3>{{GIG_1_TITLE}}</h3>
        <p>{{GIG_1_DESC}}</p>
        <div class="gig-meta"><span>{{GIG_1_DELIVERY}}</span><span>{{GIG_1_PRICE}}</span></div>
      </div>
      <div class="gig">
        <h3>{{GIG_2_TITLE}}</h3>
        <p>{{GIG_2_DESC}}</p>
        <div class="gig-meta"><span>{{GIG_2_DELIVERY}}</span><span>{{GIG_2_PRICE}}</span></div>
      </div>
      <div class="gig">
        <h3>{{GIG_3_TITLE}}</h3>
        <p>{{GIG_3_DESC}}</p>
        <div class="gig-meta"><span>{{GIG_3_DELIVERY}}</span><span>{{GIG_3_PRICE}}</span></div>
      </div>
    </div>
  </section>

  <section class="testimonials">
    <h2>{{REVIEWS_TITLE}}</h2>
    <div class="testimonial-grid">
      <div class="testimonial">
        <p>"{{REVIEW_1_TEXT}}"</p>
        <div class="testimonial-author">{{REVIEW_1_AUTHOR}}</div>
      </div>
      <div class="testimonial">
        <p>"{{REVIEW_2_TEXT}}"</p>
        <div class="testimonial-author">{{REVIEW_2_AUTHOR}}</div>
      </div>
    </div>
  </section>

  <section class="cta">
    <h2>{{CTA_TITLE}}</h2>
    <p>{{CTA_DESC}}</p>
    <a href="mailto:{{CONTACT_EMAIL}}" class="btn">{{CTA_BUTTON}}</a>
  </section>

  <footer class="footer">
    <p>{{FOOTER_TEXT}} | &copy; {{YEAR}} {{BRAND}}</p>
  </footer>
</body>
</html>`;
}

function generateHealthTemplate(id, colors, style) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}} - Health & Fitness</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', sans-serif; background: ${colors.bg}; color: #fff; }
    .header { background: ${colors.card}; padding: 1rem 2rem; border-bottom: 1px solid ${colors.primary}20; position: sticky; top: 0; z-index: 100; }
    .header-inner { max-width: 1100px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 1.5rem; font-weight: 800; color: ${colors.primary}; }
    .nav { display: flex; gap: 2rem; list-style: none; }
    .nav a { color: #fff; text-decoration: none; opacity: 0.8; }
    .nav a:hover { color: ${colors.accent}; }
    .hero { min-height: 80vh; display: flex; align-items: center; justify-content: center; padding: 4rem 2rem; background: linear-gradient(135deg, ${colors.bg}, ${colors.card}); text-align: center; }
    .hero h1 { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; margin-bottom: 1rem; }
    .hero h1 span { color: ${colors.accent}; }
    .hero p { opacity: 0.8; max-width: 500px; margin: 0 auto 2rem; line-height: 1.6; }
    .btn { padding: 1rem 2.5rem; background: ${colors.primary}; color: #fff; border: none; border-radius: 50px; font-weight: 700; cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.3s; }
    .btn:hover { transform: translateY(-2px); box-shadow: 0 10px 30px ${colors.primary}40; }
    .programs { padding: 5rem 2rem; max-width: 1100px; margin: 0 auto; }
    .programs h2 { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; }
    .programs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
    .program { background: ${colors.card}; border-radius: 20px; overflow: hidden; border: 1px solid ${colors.primary}15; transition: all 0.3s; }
    .program:hover { transform: translateY(-5px); border-color: ${colors.primary}40; }
    .program-img { height: 180px; background: linear-gradient(135deg, ${colors.primary}30, ${colors.accent}30); display: flex; align-items: center; justify-content: center; font-size: 3rem; }
    .program-info { padding: 1.5rem; }
    .program-info h3 { color: ${colors.accent}; margin-bottom: 0.5rem; }
    .program-info p { opacity: 0.7; font-size: 0.9rem; }
    .program-meta { display: flex; justify-content: space-between; margin-top: 1rem; font-size: 0.85rem; opacity: 0.6; }
    .stats { padding: 4rem 2rem; background: ${colors.card}; display: flex; justify-content: center; gap: 4rem; flex-wrap: wrap; }
    .stat { text-align: center; }
    .stat-num { font-size: 3rem; font-weight: 900; color: ${colors.accent}; }
    .stat-label { opacity: 0.6; }
    .tips { padding: 4rem 2rem; max-width: 800px; margin: 0 auto; }
    .tips h2 { text-align: center; font-size: 2rem; margin-bottom: 2rem; }
    .tip { display: flex; gap: 1.5rem; margin-bottom: 1.5rem; padding: 1.5rem; background: ${colors.card}; border-radius: 16px; border: 1px solid ${colors.primary}15; }
    .tip-num { width: 50px; height: 50px; background: ${colors.primary}; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0; }
    .tip h4 { color: ${colors.accent}; margin-bottom: 0.3rem; }
    .tip p { opacity: 0.7; font-size: 0.9rem; }
    .footer { padding: 3rem 2rem; text-align: center; border-top: 1px solid ${colors.primary}15; opacity: 0.5; }
  </style>
</head>
<body>
  <header class="header">
    <div class="header-inner">
      <div class="logo">{{BRAND_NAME}}</div>
      <ul class="nav">
        <li><a href="#programs">Programs</a></li>
        <li><a href="#tips">Tips</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  </header>

  <section class="hero">
    <div>
      <h1>{{HEADING}} <span>{{HEADING_HIGHLIGHT}}</span></h1>
      <p>{{DESCRIPTION}}</p>
      <a href="#programs" class="btn">{{CTA_BUTTON}}</a>
    </div>
  </section>

  <section class="stats">
    <div class="stat"><div class="stat-num">{{STAT_1_VALUE}}</div><div class="stat-label">{{STAT_1_LABEL}}</div></div>
    <div class="stat"><div class="stat-num">{{STAT_2_VALUE}}</div><div class="stat-label">{{STAT_2_LABEL}}</div></div>
    <div class="stat"><div class="stat-num">{{STAT_3_VALUE}}</div><div class="stat-label">{{STAT_3_LABEL}}</div></div>
  </section>

  <section class="programs" id="programs">
    <h2>{{PROGRAMS_TITLE}}</h2>
    <div class="programs-grid">
      <div class="program">
        <div class="program-img">{{PROGRAM_1_IMAGE}}</div>
        <div class="program-info">
          <h3>{{PROGRAM_1_NAME}}</h3>
          <p>{{PROGRAM_1_DESC}}</p>
          <div class="program-meta"><span>{{PROGRAM_1_DURATION}}</span><span>{{PROGRAM_1_LEVEL}}</span></div>
        </div>
      </div>
      <div class="program">
        <div class="program-img">{{PROGRAM_2_IMAGE}}</div>
        <div class="program-info">
          <h3>{{PROGRAM_2_NAME}}</h3>
          <p>{{PROGRAM_2_DESC}}</p>
          <div class="program-meta"><span>{{PROGRAM_2_DURATION}}</span><span>{{PROGRAM_2_LEVEL}}</span></div>
        </div>
      </div>
      <div class="program">
        <div class="program-img">{{PROGRAM_3_IMAGE}}</div>
        <div class="program-info">
          <h3>{{PROGRAM_3_NAME}}</h3>
          <p>{{PROGRAM_3_DESC}}</p>
          <div class="program-meta"><span>{{PROGRAM_3_DURATION}}</span><span>{{PROGRAM_3_LEVEL}}</span></div>
        </div>
      </div>
    </div>
  </section>

  <section class="tips" id="tips">
    <h2>{{TIPS_TITLE}}</h2>
    <div class="tip">
      <div class="tip-num">1</div>
      <div><h4>{{TIP_1_TITLE}}</h4><p>{{TIP_1_DESC}}</p></div>
    </div>
    <div class="tip">
      <div class="tip-num">2</div>
      <div><h4>{{TIP_2_TITLE}}</h4><p>{{TIP_2_DESC}}</p></div>
    </div>
    <div class="tip">
      <div class="tip-num">3</div>
      <div><h4>{{TIP_3_TITLE}}</h4><p>{{TIP_3_DESC}}</p></div>
    </div>
  </section>

  <footer class="footer" id="contact">
    <p>{{FOOTER_TEXT}} | &copy; {{YEAR}} {{BRAND_NAME}}</p>
  </footer>
</body>
</html>`;
}

function generateFoodTemplate(id, colors, style) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}} - Food & Restaurant</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', sans-serif; background: ${colors.bg}; color: #fff; }
    .hero { min-height: 80vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 4rem 2rem; background: linear-gradient(135deg, ${colors.bg}, ${colors.card}); position: relative; overflow: hidden; }
    .hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, ${colors.primary}15, transparent 60%); }
    .hero-content { position: relative; z-index: 2; }
    .hero h1 { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; margin-bottom: 1rem; }
    .hero h1 span { color: ${colors.accent}; }
    .hero p { opacity: 0.8; max-width: 500px; margin: 0 auto 2rem; line-height: 1.6; }
    .btn { padding: 1rem 2.5rem; background: ${colors.primary}; color: #fff; border: none; border-radius: 50px; font-weight: 700; cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.3s; }
    .btn:hover { transform: translateY(-2px); box-shadow: 0 10px 30px ${colors.primary}40; }
    .menu { padding: 5rem 2rem; max-width: 1100px; margin: 0 auto; }
    .menu h2 { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; }
    .menu-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
    .menu-item { background: ${colors.card}; border-radius: 20px; overflow: hidden; border: 1px solid ${colors.primary}15; transition: all 0.3s; }
    .menu-item:hover { transform: scale(1.03); }
    .menu-img { height: 200px; background: linear-gradient(135deg, ${colors.primary}30, ${colors.secondary}30); display: flex; align-items: center; justify-content: center; font-size: 3rem; }
    .menu-info { padding: 1.5rem; }
    .menu-info h3 { color: ${colors.accent}; margin-bottom: 0.3rem; }
    .menu-info p { opacity: 0.6; font-size: 0.9rem; margin-bottom: 0.5rem; }
    .menu-price { font-size: 1.3rem; font-weight: 700; color: ${colors.primary}; }
    .about { padding: 4rem 2rem; background: ${colors.card}; }
    .about-inner { max-width: 900px; margin: 0 auto; text-align: center; }
    .about h2 { font-size: 2rem; margin-bottom: 1.5rem; }
    .about p { opacity: 0.8; line-height: 1.7; max-width: 600px; margin: 0 auto; }
    .hours { padding: 3rem 2rem; max-width: 600px; margin: 0 auto; }
    .hours h2 { text-align: center; font-size: 2rem; margin-bottom: 1.5rem; }
    .hours-list { background: ${colors.card}; border-radius: 16px; padding: 1.5rem; }
    .hours-row { display: flex; justify-content: space-between; padding: 0.8rem 0; border-bottom: 1px solid ${colors.primary}10; }
    .hours-row:last-child { border-bottom: none; }
    .footer { padding: 3rem 2rem; text-align: center; border-top: 1px solid ${colors.primary}15; opacity: 0.5; }
  </style>
</head>
<body>
  <section class="hero">
    <div class="hero-content">
      <h1>{{HEADING}} <span>{{HEADING_HIGHLIGHT}}</span></h1>
      <p>{{DESCRIPTION}}</p>
      <a href="#menu" class="btn">{{CTA_BUTTON}}</a>
    </div>
  </section>

  <section class="menu" id="menu">
    <h2>{{MENU_TITLE}}</h2>
    <div class="menu-grid">
      <div class="menu-item">
        <div class="menu-img">{{ITEM_1_IMAGE}}</div>
        <div class="menu-info">
          <h3>{{ITEM_1_NAME}}</h3>
          <p>{{ITEM_1_DESC}}</p>
          <div class="menu-price">{{ITEM_1_PRICE}}</div>
        </div>
      </div>
      <div class="menu-item">
        <div class="menu-img">{{ITEM_2_IMAGE}}</div>
        <div class="menu-info">
          <h3>{{ITEM_2_NAME}}</h3>
          <p>{{ITEM_2_DESC}}</p>
          <div class="menu-price">{{ITEM_2_PRICE}}</div>
        </div>
      </div>
      <div class="menu-item">
        <div class="menu-img">{{ITEM_3_IMAGE}}</div>
        <div class="menu-info">
          <h3>{{ITEM_3_NAME}}</h3>
          <p>{{ITEM_3_DESC}}</p>
          <div class="menu-price">{{ITEM_3_PRICE}}</div>
        </div>
      </div>
      <div class="menu-item">
        <div class="menu-img">{{ITEM_4_IMAGE}}</div>
        <div class="menu-info">
          <h3>{{ITEM_4_NAME}}</h3>
          <p>{{ITEM_4_DESC}}</p>
          <div class="menu-price">{{ITEM_4_PRICE}}</div>
        </div>
      </div>
    </div>
  </section>

  <section class="about">
    <div class="about-inner">
      <h2>{{ABOUT_TITLE}}</h2>
      <p>{{ABOUT_TEXT}}</p>
    </div>
  </section>

  <section class="hours">
    <h2>{{HOURS_TITLE}}</h2>
    <div class="hours-list">
      <div class="hours-row"><span>Monday - Friday</span><span>{{WEEKDAY_HOURS}}</span></div>
      <div class="hours-row"><span>Saturday</span><span>{{SATURDAY_HOURS}}</span></div>
      <div class="hours-row"><span>Sunday</span><span>{{SUNDAY_HOURS}}</span></div>
    </div>
  </section>

  <footer class="footer">
    <p>{{FOOTER_TEXT}} | {{RESTAURANT_NAME}} &copy; {{YEAR}}</p>
  </footer>
</body>
</html>`;
}

function generateTravelTemplate(id, colors, style) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}} - Travel</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', sans-serif; background: ${colors.bg}; color: #fff; }
    .hero { min-height: 90vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 4rem 2rem; background: linear-gradient(135deg, ${colors.bg}, ${colors.card}); position: relative; }
    .hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at bottom, ${colors.primary}15, transparent); }
    .hero-content { position: relative; z-index: 2; }
    .hero h1 { font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 800; margin-bottom: 1rem; }
    .hero h1 span { color: ${colors.accent}; }
    .hero p { font-size: 1.1rem; opacity: 0.8; max-width: 550px; margin: 0 auto 2rem; }
    .btn { padding: 1rem 2.5rem; background: ${colors.primary}; color: #fff; border: none; border-radius: 50px; font-weight: 700; cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.3s; }
    .btn:hover { transform: translateY(-2px); box-shadow: 0 10px 30px ${colors.primary}40; }
    .destinations { padding: 5rem 2rem; max-width: 1200px; margin: 0 auto; }
    .destinations h2 { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; }
    .dest-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
    .dest { position: relative; border-radius: 20px; overflow: hidden; height: 350px; border: 1px solid ${colors.primary}15; transition: all 0.3s; }
    .dest:hover { transform: scale(1.03); }
    .dest-img { position: absolute; inset: 0; background: linear-gradient(135deg, ${colors.primary}40, ${colors.secondary}40); display: flex; align-items: center; justify-content: center; font-size: 4rem; }
    .dest-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); }
    .dest-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 2rem; }
    .dest-info h3 { font-size: 1.5rem; margin-bottom: 0.3rem; }
    .dest-info p { opacity: 0.8; font-size: 0.9rem; }
    .dest-price { position: absolute; top: 1rem; right: 1rem; padding: 0.5rem 1rem; background: ${colors.primary}; border-radius: 20px; font-weight: 700; }
    .packages { padding: 4rem 2rem; background: ${colors.card}; }
    .packages h2 { text-align: center; font-size: 2rem; margin-bottom: 2rem; }
    .packages-grid { max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
    .package { background: ${colors.bg}; border-radius: 16px; padding: 2rem; border: 1px solid ${colors.primary}15; text-align: center; }
    .package h3 { color: ${colors.accent}; margin-bottom: 0.5rem; }
    .package .price { font-size: 2rem; font-weight: 800; color: ${colors.primary}; margin: 1rem 0; }
    .package ul { list-style: none; margin: 1rem 0; }
    .package ul li { padding: 0.5rem 0; opacity: 0.7; }
    .testimonials { padding: 4rem 2rem; max-width: 900px; margin: 0 auto; }
    .testimonials h2 { text-align: center; font-size: 2rem; margin-bottom: 2rem; }
    .testimonial { background: ${colors.card}; border-radius: 16px; padding: 2rem; border: 1px solid ${colors.primary}15; margin-bottom: 1.5rem; }
    .testimonial p { font-style: italic; opacity: 0.8; margin-bottom: 1rem; }
    .testimonial-author { font-weight: 600; color: ${colors.accent}; }
    .footer { padding: 3rem 2rem; text-align: center; border-top: 1px solid ${colors.primary}15; opacity: 0.5; }
  </style>
</head>
<body>
  <section class="hero">
    <div class="hero-content">
      <h1>{{HEADING}} <span>{{HEADING_HIGHLIGHT}}</span></h1>
      <p>{{DESCRIPTION}}</p>
      <a href="#destinations" class="btn">{{CTA_BUTTON}}</a>
    </div>
  </section>

  <section class="destinations" id="destinations">
    <h2>{{DESTINATIONS_TITLE}}</h2>
    <div class="dest-grid">
      <div class="dest">
        <div class="dest-img">{{DEST_1_IMAGE}}</div>
        <div class="dest-overlay"></div>
        <div class="dest-info">
          <h3>{{DEST_1_NAME}}</h3>
          <p>{{DEST_1_DESC}}</p>
        </div>
        <div class="dest-price">{{DEST_1_PRICE}}</div>
      </div>
      <div class="dest">
        <div class="dest-img">{{DEST_2_IMAGE}}</div>
        <div class="dest-overlay"></div>
        <div class="dest-info">
          <h3>{{DEST_2_NAME}}</h3>
          <p>{{DEST_2_DESC}}</p>
        </div>
        <div class="dest-price">{{DEST_2_PRICE}}</div>
      </div>
      <div class="dest">
        <div class="dest-img">{{DEST_3_IMAGE}}</div>
        <div class="dest-overlay"></div>
        <div class="dest-info">
          <h3>{{DEST_3_NAME}}</h3>
          <p>{{DEST_3_DESC}}</p>
        </div>
        <div class="dest-price">{{DEST_3_PRICE}}</div>
      </div>
    </div>
  </section>

  <section class="packages">
    <h2>{{PACKAGES_TITLE}}</h2>
    <div class="packages-grid">
      <div class="package">
        <h3>{{PKG_1_NAME}}</h3>
        <div class="price">{{PKG_1_PRICE}}</div>
        <ul>
          <li>{{PKG_1_FEATURE_1}}</li>
          <li>{{PKG_1_FEATURE_2}}</li>
          <li>{{PKG_1_FEATURE_3}}</li>
        </ul>
        <a href="#" class="btn">Book Now</a>
      </div>
      <div class="package">
        <h3>{{PKG_2_NAME}}</h3>
        <div class="price">{{PKG_2_PRICE}}</div>
        <ul>
          <li>{{PKG_2_FEATURE_1}}</li>
          <li>{{PKG_2_FEATURE_2}}</li>
          <li>{{PKG_2_FEATURE_3}}</li>
        </ul>
        <a href="#" class="btn">Book Now</a>
      </div>
    </div>
  </section>

  <section class="testimonials">
    <h2>{{REVIEWS_TITLE}}</h2>
    <div class="testimonial">
      <p>"{{REVIEW_1_TEXT}}"</p>
      <div class="testimonial-author">{{REVIEW_1_AUTHOR}}</div>
    </div>
  </section>

  <footer class="footer">
    <p>{{FOOTER_TEXT}} | &copy; {{YEAR}} {{BRAND}}</p>
  </footer>
</body>
</html>`;
}

function generateRealEstateTemplate(id, colors, style) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}} - Real Estate</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', sans-serif; background: ${colors.bg}; color: #fff; }
    .hero { min-height: 70vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 4rem 2rem; background: linear-gradient(135deg, ${colors.bg}, ${colors.card}); }
    .hero h1 { font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 800; margin-bottom: 1rem; }
    .hero h1 span { color: ${colors.accent}; }
    .hero p { opacity: 0.8; max-width: 500px; margin: 0 auto 2rem; }
    .search-box { max-width: 600px; margin: 0 auto; display: flex; gap: 0.5rem; }
    .search-box input { flex: 1; padding: 1rem; border-radius: 10px; border: 1px solid ${colors.primary}30; background: ${colors.card}; color: #fff; font-size: 1rem; }
    .search-box button { padding: 1rem 2rem; background: ${colors.primary}; color: #fff; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; }
    .listings { padding: 5rem 2rem; max-width: 1200px; margin: 0 auto; }
    .listings h2 { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; }
    .listings-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
    .listing { background: ${colors.card}; border-radius: 20px; overflow: hidden; border: 1px solid ${colors.primary}15; transition: all 0.3s; }
    .listing:hover { transform: translateY(-5px); border-color: ${colors.primary}40; }
    .listing-img { height: 220px; background: linear-gradient(135deg, ${colors.primary}30, ${colors.accent}30); display: flex; align-items: center; justify-content: center; font-size: 3rem; }
    .listing-info { padding: 1.5rem; }
    .listing-info h3 { color: ${colors.accent}; margin-bottom: 0.3rem; }
    .listing-info .price { font-size: 1.5rem; font-weight: 700; color: ${colors.primary}; margin: 0.5rem 0; }
    .listing-info p { opacity: 0.6; font-size: 0.9rem; }
    .listing-meta { display: flex; gap: 1rem; margin-top: 1rem; font-size: 0.85rem; opacity: 0.6; }
    .stats { padding: 3rem 2rem; background: ${colors.card}; display: flex; justify-content: center; gap: 4rem; flex-wrap: wrap; }
    .stat { text-align: center; }
    .stat-num { font-size: 2.5rem; font-weight: 800; color: ${colors.accent}; }
    .stat-label { opacity: 0.6; }
    .agents { padding: 4rem 2rem; max-width: 900px; margin: 0 auto; }
    .agents h2 { text-align: center; font-size: 2rem; margin-bottom: 2rem; }
    .agent-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; }
    .agent { text-align: center; padding: 1.5rem; }
    .agent-img { width: 80px; height: 80px; border-radius: 50%; background: ${colors.primary}; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-size: 2rem; }
    .agent h4 { color: ${colors.accent}; }
    .agent p { opacity: 0.6; font-size: 0.85rem; }
    .footer { padding: 3rem 2rem; text-align: center; border-top: 1px solid ${colors.primary}15; opacity: 0.5; }
  </style>
</head>
<body>
  <section class="hero">
    <div>
      <h1>{{HEADING}} <span>{{HEADING_HIGHLIGHT}}</span></h1>
      <p>{{DESCRIPTION}}</p>
      <div class="search-box">
        <input type="text" placeholder="Search location...">
        <button>Search</button>
      </div>
    </div>
  </section>

  <section class="stats">
    <div class="stat"><div class="stat-num">{{STAT_1_VALUE}}</div><div class="stat-label">{{STAT_1_LABEL}}</div></div>
    <div class="stat"><div class="stat-num">{{STAT_2_VALUE}}</div><div class="stat-label">{{STAT_2_LABEL}}</div></div>
    <div class="stat"><div class="stat-num">{{STAT_3_VALUE}}</div><div class="stat-label">{{STAT_3_LABEL}}</div></div>
  </section>

  <section class="listings">
    <h2>{{LISTINGS_TITLE}}</h2>
    <div class="listings-grid">
      <div class="listing">
        <div class="listing-img">{{PROPERTY_1_IMAGE}}</div>
        <div class="listing-info">
          <h3>{{PROPERTY_1_NAME}}</h3>
          <div class="price">{{PROPERTY_1_PRICE}}</div>
          <p>{{PROPERTY_1_DESC}}</p>
          <div class="listing-meta"><span>{{PROPERTY_1_BEDS}}</span><span>{{PROPERTY_1_BATHS}}</span><span>{{PROPERTY_1_AREA}}</span></div>
        </div>
      </div>
      <div class="listing">
        <div class="listing-img">{{PROPERTY_2_IMAGE}}</div>
        <div class="listing-info">
          <h3>{{PROPERTY_2_NAME}}</h3>
          <div class="price">{{PROPERTY_2_PRICE}}</div>
          <p>{{PROPERTY_2_DESC}}</p>
          <div class="listing-meta"><span>{{PROPERTY_2_BEDS}}</span><span>{{PROPERTY_2_BATHS}}</span><span>{{PROPERTY_2_AREA}}</span></div>
        </div>
      </div>
      <div class="listing">
        <div class="listing-img">{{PROPERTY_3_IMAGE}}</div>
        <div class="listing-info">
          <h3>{{PROPERTY_3_NAME}}</h3>
          <div class="price">{{PROPERTY_3_PRICE}}</div>
          <p>{{PROPERTY_3_DESC}}</p>
          <div class="listing-meta"><span>{{PROPERTY_3_BEDS}}</span><span>{{PROPERTY_3_BATHS}}</span><span>{{PROPERTY_3_AREA}}</span></div>
        </div>
      </div>
    </div>
  </section>

  <section class="agents">
    <h2>{{AGENTS_TITLE}}</h2>
    <div class="agent-grid">
      <div class="agent">
        <div class="agent-img">{{AGENT_1_IMAGE}}</div>
        <h4>{{AGENT_1_NAME}}</h4>
        <p>{{AGENT_1_ROLE}}</p>
      </div>
      <div class="agent">
        <div class="agent-img">{{AGENT_2_IMAGE}}</div>
        <h4>{{AGENT_2_NAME}}</h4>
        <p>{{AGENT_2_ROLE}}</p>
      </div>
      <div class="agent">
        <div class="agent-img">{{AGENT_3_IMAGE}}</div>
        <h4>{{AGENT_3_NAME}}</h4>
        <p>{{AGENT_3_ROLE}}</p>
      </div>
    </div>
  </section>

  <footer class="footer">
    <p>{{FOOTER_TEXT}} | &copy; {{YEAR}} {{BRAND}}</p>
  </footer>
</body>
</html>`;
}

function generateTechnologyTemplate(id, colors, style) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}} - Technology</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', sans-serif; background: ${colors.bg}; color: #fff; }
    .header { background: ${colors.card}; padding: 1rem 2rem; border-bottom: 1px solid ${colors.primary}20; }
    .header-inner { max-width: 1100px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 1.5rem; font-weight: 800; color: ${colors.primary}; }
    .nav { display: flex; gap: 2rem; list-style: none; }
    .nav a { color: #fff; text-decoration: none; opacity: 0.8; }
    .nav a:hover { color: ${colors.accent}; }
    .hero { min-height: 90vh; display: flex; align-items: center; padding: 4rem; background: linear-gradient(135deg, ${colors.bg}, ${colors.card}); }
    .hero-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
    .hero h1 { font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 800; margin-bottom: 1rem; }
    .hero h1 span { color: ${colors.accent}; }
    .hero p { opacity: 0.8; line-height: 1.7; margin-bottom: 2rem; }
    .btn { padding: 1rem 2rem; background: ${colors.primary}; color: #fff; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.3s; }
    .btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px ${colors.primary}40; }
    .hero-visual { min-height: 350px; background: ${colors.primary}10; border-radius: 20px; border: 1px solid ${colors.primary}20; display: flex; align-items: center; justify-content: center; font-size: 5rem; }
    .features { padding: 5rem 2rem; max-width: 1100px; margin: 0 auto; }
    .features h2 { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; }
    .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
    .feature { background: ${colors.card}; border-radius: 16px; padding: 2rem; border: 1px solid ${colors.primary}15; transition: all 0.3s; }
    .feature:hover { border-color: ${colors.primary}40; transform: translateY(-5px); }
    .feature h3 { color: ${colors.accent}; margin-bottom: 0.5rem; }
    .feature p { opacity: 0.7; line-height: 1.5; }
    .products { padding: 4rem 2rem; background: ${colors.card}; }
    .products h2 { text-align: center; font-size: 2rem; margin-bottom: 2rem; }
    .products-grid { max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; }
    .product { background: ${colors.bg}; border-radius: 16px; padding: 2rem; text-align: center; border: 1px solid ${colors.primary}15; }
    .product-icon { font-size: 3rem; margin-bottom: 1rem; }
    .product h3 { color: ${colors.accent}; margin-bottom: 0.5rem; }
    .product p { opacity: 0.6; font-size: 0.9rem; }
    .integrations { padding: 4rem 2rem; max-width: 900px; margin: 0 auto; }
    .integrations h2 { text-align: center; font-size: 2rem; margin-bottom: 2rem; }
    .integrations-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; }
    .integration { padding: 0.8rem 1.5rem; background: ${colors.card}; border-radius: 10px; border: 1px solid ${colors.primary}20; }
    .footer { padding: 3rem 2rem; text-align: center; border-top: 1px solid ${colors.primary}15; opacity: 0.5; }
  </style>
</head>
<body>
  <header class="header">
    <div class="header-inner">
      <div class="logo">{{COMPANY_NAME}}</div>
      <ul class="nav">
        <li><a href="#features">Features</a></li>
        <li><a href="#products">Products</a></li>
        <li><a href="#integrations">Integrations</a></li>
      </ul>
    </div>
  </header>

  <section class="hero">
    <div class="hero-inner">
      <div>
        <h1>{{HEADING}} <span>{{HEADING_HIGHLIGHT}}</span></h1>
        <p>{{DESCRIPTION}}</p>
        <a href="#features" class="btn">{{CTA_BUTTON}}</a>
      </div>
      <div class="hero-visual">{{HERO_IMAGE}}</div>
    </div>
  </section>

  <section class="features" id="features">
    <h2>{{FEATURES_TITLE}}</h2>
    <div class="features-grid">
      <div class="feature">
        <h3>{{FEATURE_1_TITLE}}</h3>
        <p>{{FEATURE_1_DESC}}</p>
      </div>
      <div class="feature">
        <h3>{{FEATURE_2_TITLE}}</h3>
        <p>{{FEATURE_2_DESC}}</p>
      </div>
      <div class="feature">
        <h3>{{FEATURE_3_TITLE}}</h3>
        <p>{{FEATURE_3_DESC}}</p>
      </div>
    </div>
  </section>

  <section class="products" id="products">
    <h2>{{PRODUCTS_TITLE}}</h2>
    <div class="products-grid">
      <div class="product">
        <div class="product-icon">{{PRODUCT_1_ICON}}</div>
        <h3>{{PRODUCT_1_NAME}}</h3>
        <p>{{PRODUCT_1_DESC}}</p>
      </div>
      <div class="product">
        <div class="product-icon">{{PRODUCT_2_ICON}}</div>
        <h3>{{PRODUCT_2_NAME}}</h3>
        <p>{{PRODUCT_2_DESC}}</p>
      </div>
      <div class="product">
        <div class="product-icon">{{PRODUCT_3_ICON}}</div>
        <h3>{{PRODUCT_3_NAME}}</h3>
        <p>{{PRODUCT_3_DESC}}</p>
      </div>
    </div>
  </section>

  <section class="integrations" id="integrations">
    <h2>{{INTEGRATIONS_TITLE}}</h2>
    <div class="integrations-grid">
      <span class="integration">{{INTEGRATION_1}}</span>
      <span class="integration">{{INTEGRATION_2}}</span>
      <span class="integration">{{INTEGRATION_3}}</span>
      <span class="integration">{{INTEGRATION_4}}</span>
      <span class="integration">{{INTEGRATION_5}}</span>
    </div>
  </section>

  <footer class="footer">
    <p>{{FOOTER_TEXT}} | &copy; {{YEAR}} {{COMPANY_NAME}}</p>
  </footer>
</body>
</html>`;
}

function generateFashionTemplate(id, colors, style) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}} - Fashion</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', sans-serif; background: ${colors.bg}; color: #fff; }
    .header { background: ${colors.card}; padding: 1rem 2rem; border-bottom: 1px solid ${colors.primary}20; }
    .header-inner { max-width: 1100px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 1.8rem; font-weight: 800; color: ${colors.primary}; letter-spacing: 2px; }
    .nav { display: flex; gap: 2rem; list-style: none; }
    .nav a { color: #fff; text-decoration: none; opacity: 0.8; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 1px; }
    .nav a:hover { color: ${colors.accent}; }
    .hero { min-height: 80vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 4rem 2rem; background: linear-gradient(135deg, ${colors.bg}, ${colors.card}); }
    .hero h1 { font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 200; letter-spacing: 5px; margin-bottom: 1rem; text-transform: uppercase; }
    .hero h1 span { font-weight: 800; color: ${colors.accent}; }
    .hero p { opacity: 0.7; max-width: 400px; margin: 0 auto 2rem; letter-spacing: 1px; }
    .btn { padding: 1rem 3rem; background: transparent; color: #fff; border: 2px solid ${colors.primary}; text-transform: uppercase; letter-spacing: 2px; font-size: 0.85rem; cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.3s; }
    .btn:hover { background: ${colors.primary}; }
    .collection { padding: 5rem 2rem; max-width: 1200px; margin: 0 auto; }
    .collection h2 { text-align: center; font-size: 2rem; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 3rem; }
    .collection-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; }
    .item { background: ${colors.card}; border-radius: 0; overflow: hidden; border: 1px solid ${colors.primary}10; transition: all 0.3s; }
    .item:hover { border-color: ${colors.primary}40; }
    .item-img { height: 300px; background: linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20); display: flex; align-items: center; justify-content: center; font-size: 3rem; }
    .item-info { padding: 1.5rem; text-align: center; }
    .item-info h3 { font-weight: 400; letter-spacing: 1px; margin-bottom: 0.3rem; }
    .item-info .price { color: ${colors.accent}; font-weight: 600; }
    .about { padding: 4rem 2rem; background: ${colors.card}; text-align: center; }
    .about h2 { font-size: 2rem; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 1.5rem; }
    .about p { max-width: 600px; margin: 0 auto; opacity: 0.7; line-height: 1.7; }
    .footer { padding: 3rem 2rem; text-align: center; border-top: 1px solid ${colors.primary}15; opacity: 0.5; }
  </style>
</head>
<body>
  <header class="header">
    <div class="header-inner">
      <div class="logo">{{BRAND_NAME}}</div>
      <ul class="nav">
        <li><a href="#collection">Collection</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  </header>

  <section class="hero">
    <div>
      <h1>{{HEADING}} <span>{{HEADING_HIGHLIGHT}}</span></h1>
      <p>{{DESCRIPTION}}</p>
      <a href="#collection" class="btn">{{CTA_BUTTON}}</a>
    </div>
  </section>

  <section class="collection" id="collection">
    <h2>{{COLLECTION_TITLE}}</h2>
    <div class="collection-grid">
      <div class="item">
        <div class="item-img">{{ITEM_1_IMAGE}}</div>
        <div class="item-info">
          <h3>{{ITEM_1_NAME}}</h3>
          <div class="price">{{ITEM_1_PRICE}}</div>
        </div>
      </div>
      <div class="item">
        <div class="item-img">{{ITEM_2_IMAGE}}</div>
        <div class="item-info">
          <h3>{{ITEM_2_NAME}}</h3>
          <div class="price">{{ITEM_2_PRICE}}</div>
        </div>
      </div>
      <div class="item">
        <div class="item-img">{{ITEM_3_IMAGE}}</div>
        <div class="item-info">
          <h3>{{ITEM_3_NAME}}</h3>
          <div class="price">{{ITEM_3_PRICE}}</div>
        </div>
      </div>
      <div class="item">
        <div class="item-img">{{ITEM_4_IMAGE}}</div>
        <div class="item-info">
          <h3>{{ITEM_4_NAME}}</h3>
          <div class="price">{{ITEM_4_PRICE}}</div>
        </div>
      </div>
    </div>
  </section>

  <section class="about" id="about">
    <h2>{{ABOUT_TITLE}}</h2>
    <p>{{ABOUT_TEXT}}</p>
  </section>

  <footer class="footer" id="contact">
    <p>{{FOOTER_TEXT}} | &copy; {{YEAR}} {{BRAND_NAME}}</p>
  </footer>
</body>
</html>`;
}

function generateMusicTemplate(id, colors, style) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}} - Music</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', sans-serif; background: ${colors.bg}; color: #fff; }
    .hero { min-height: 80vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 4rem 2rem; background: linear-gradient(135deg, ${colors.bg}, ${colors.card}, ${colors.bg}); position: relative; overflow: hidden; }
    .hero::before { content: ''; position: absolute; width: 500px; height: 500px; background: radial-gradient(circle, ${colors.primary}15, transparent); top: -100px; left: -100px; border-radius: 50%; animation: pulse 4s ease-in-out infinite; }
    @keyframes pulse { 0%,100%{transform:scale(1);opacity:0.5} 50%{transform:scale(1.2);opacity:1} }
    .hero-content { position: relative; z-index: 2; }
    .hero h1 { font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 800; margin-bottom: 1rem; }
    .hero h1 span { color: ${colors.accent}; }
    .hero p { opacity: 0.8; max-width: 500px; margin: 0 auto 2rem; }
    .btn { padding: 1rem 2.5rem; background: ${colors.primary}; color: #fff; border: none; border-radius: 50px; font-weight: 700; cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.3s; }
    .btn:hover { transform: scale(1.05); box-shadow: 0 10px 30px ${colors.primary}40; }
    .player { padding: 4rem 2rem; max-width: 800px; margin: 0 auto; }
    .player-box { background: ${colors.card}; border-radius: 24px; padding: 3rem; border: 1px solid ${colors.primary}15; }
    .now-playing { display: flex; align-items: center; gap: 2rem; margin-bottom: 2rem; }
    .album-art { width: 150px; height: 150px; background: linear-gradient(135deg, ${colors.primary}, ${colors.accent}); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 3rem; flex-shrink: 0; }
    .track-info h3 { font-size: 1.5rem; color: ${colors.accent}; }
    .track-info p { opacity: 0.6; }
    .progress { height: 6px; background: ${colors.bg}; border-radius: 3px; margin: 1.5rem 0; overflow: hidden; }
    .progress-bar { height: 100%; width: 60%; background: ${colors.primary}; border-radius: 3px; }
    .controls { display: flex; justify-content: center; align-items: center; gap: 2rem; }
    .control-btn { width: 50px; height: 50px; border-radius: 50%; background: ${colors.primary}20; border: 1px solid ${colors.primary}30; color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 1.2rem; transition: all 0.3s; }
    .control-btn:hover { background: ${colors.primary}; }
    .control-btn.play { width: 60px; height: 60px; background: ${colors.primary}; font-size: 1.5rem; }
    .playlist { padding: 4rem 2rem; max-width: 800px; margin: 0 auto; }
    .playlist h2 { text-align: center; font-size: 2rem; margin-bottom: 2rem; }
    .track { display: flex; align-items: center; gap: 1rem; padding: 1rem; background: ${colors.card}; border-radius: 12px; margin-bottom: 0.8rem; border: 1px solid ${colors.primary}10; transition: all 0.3s; }
    .track:hover { border-color: ${colors.primary}30; }
    .track-num { width: 40px; text-align: center; opacity: 0.5; }
    .track-name { flex: 1; }
    .track-artist { opacity: 0.6; font-size: 0.9rem; }
    .track-duration { opacity: 0.5; font-size: 0.85rem; }
    .footer { padding: 3rem 2rem; text-align: center; border-top: 1px solid ${colors.primary}15; opacity: 0.5; }
  </style>
</head>
<body>
  <section class="hero">
    <div class="hero-content">
      <h1>{{HEADING}} <span>{{HEADING_HIGHLIGHT}}</span></h1>
      <p>{{DESCRIPTION}}</p>
      <a href="#player" class="btn">{{CTA_BUTTON}}</a>
    </div>
  </section>

  <section class="player" id="player">
    <div class="player-box">
      <div class="now-playing">
        <div class="album-art">{{ALBUM_IMAGE}}</div>
        <div class="track-info">
          <h3>{{TRACK_NAME}}</h3>
          <p>{{ARTIST_NAME}}</p>
        </div>
      </div>
      <div class="progress"><div class="progress-bar"></div></div>
      <div class="controls">
        <button class="control-btn">&#9198;</button>
        <button class="control-btn play">&#9654;</button>
        <button class="control-btn">&#9197;</button>
      </div>
    </div>
  </section>

  <section class="playlist">
    <h2>{{PLAYLIST_TITLE}}</h2>
    <div class="track">
      <span class="track-num">1</span>
      <span class="track-name">{{TRACK_1_NAME}}</span>
      <span class="track-artist">{{TRACK_1_ARTIST}}</span>
      <span class="track-duration">{{TRACK_1_DURATION}}</span>
    </div>
    <div class="track">
      <span class="track-num">2</span>
      <span class="track-name">{{TRACK_2_NAME}}</span>
      <span class="track-artist">{{TRACK_2_ARTIST}}</span>
      <span class="track-duration">{{TRACK_2_DURATION}}</span>
    </div>
    <div class="track">
      <span class="track-num">3</span>
      <span class="track-name">{{TRACK_3_NAME}}</span>
      <span class="track-artist">{{TRACK_3_ARTIST}}</span>
      <span class="track-duration">{{TRACK_3_DURATION}}</span>
    </div>
    <div class="track">
      <span class="track-num">4</span>
      <span class="track-name">{{TRACK_4_NAME}}</span>
      <span class="track-artist">{{TRACK_4_ARTIST}}</span>
      <span class="track-duration">{{TRACK_4_DURATION}}</span>
    </div>
  </section>

  <footer class="footer">
    <p>{{FOOTER_TEXT}} | &copy; {{YEAR}} {{BRAND}}</p>
  </footer>
</body>
</html>`;
}

function generateSportsTemplate(id, colors, style) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}} - Sports</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', sans-serif; background: ${colors.bg}; color: #fff; }
    .hero { min-height: 80vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 4rem 2rem; background: linear-gradient(135deg, ${colors.bg}, ${colors.card}); }
    .hero h1 { font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 900; margin-bottom: 1rem; text-transform: uppercase; }
    .hero h1 span { color: ${colors.accent}; }
    .hero p { font-size: 1.1rem; opacity: 0.8; max-width: 500px; margin: 0 auto 2rem; }
    .btn { padding: 1rem 2.5rem; background: ${colors.primary}; color: #fff; border: none; border-radius: 50px; font-weight: 700; cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.3s; text-transform: uppercase; }
    .btn:hover { transform: translateY(-2px); box-shadow: 0 10px 30px ${colors.primary}40; }
    .matches { padding: 5rem 2rem; max-width: 900px; margin: 0 auto; }
    .matches h2 { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; text-transform: uppercase; }
    .match { display: flex; align-items: center; justify-content: space-between; padding: 1.5rem; background: ${colors.card}; border-radius: 16px; margin-bottom: 1rem; border: 1px solid ${colors.primary}15; }
    .team { display: flex; align-items: center; gap: 1rem; }
    .team-logo { width: 50px; height: 50px; background: ${colors.primary}; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; }
    .vs { font-size: 1.2rem; font-weight: 800; color: ${colors.accent}; }
    .match-time { text-align: center; }
    .match-time .date { opacity: 0.6; font-size: 0.85rem; }
    .match-time .league { color: ${colors.accent}; font-size: 0.8rem; }
    .standings { padding: 4rem 2rem; background: ${colors.card}; }
    .standings h2 { text-align: center; font-size: 2rem; margin-bottom: 2rem; }
    .standings-table { max-width: 700px; margin: 0 auto; }
    .table-row { display: grid; grid-template-columns: 50px 1fr 80px 80px 80px; padding: 1rem; border-bottom: 1px solid ${colors.primary}10; align-items: center; }
    .table-row.header { font-weight: 600; opacity: 0.6; font-size: 0.85rem; text-transform: uppercase; }
    .table-row .pos { text-align: center; }
    .table-row .team-name { font-weight: 600; }
    .table-row .pts { font-weight: 700; color: ${colors.accent}; }
    .news { padding: 4rem 2rem; max-width: 1000px; margin: 0 auto; }
    .news h2 { text-align: center; font-size: 2rem; margin-bottom: 2rem; }
    .news-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
    .news-card { background: ${colors.card}; border-radius: 16px; overflow: hidden; border: 1px solid ${colors.primary}15; }
    .news-img { height: 180px; background: linear-gradient(135deg, ${colors.primary}30, ${colors.accent}30); display: flex; align-items: center; justify-content: center; font-size: 2.5rem; }
    .news-info { padding: 1.5rem; }
    .news-info h3 { color: ${colors.accent}; margin-bottom: 0.5rem; font-size: 1rem; }
    .news-info p { opacity: 0.6; font-size: 0.9rem; }
    .footer { padding: 3rem 2rem; text-align: center; border-top: 1px solid ${colors.primary}15; opacity: 0.5; }
  </style>
</head>
<body>
  <section class="hero">
    <div>
      <h1>{{HEADING}} <span>{{HEADING_HIGHLIGHT}}</span></h1>
      <p>{{DESCRIPTION}}</p>
      <a href="#matches" class="btn">{{CTA_BUTTON}}</a>
    </div>
  </section>

  <section class="matches" id="matches">
    <h2>{{MATCHES_TITLE}}</h2>
    <div class="match">
      <div class="team">
        <div class="team-logo">{{TEAM_1_ABBR}}</div>
        <span>{{TEAM_1_NAME}}</span>
      </div>
      <div class="match-time">
        <div class="vs">VS</div>
        <div class="date">{{MATCH_1_DATE}}</div>
        <div class="league">{{MATCH_1_LEAGUE}}</div>
      </div>
      <div class="team">
        <span>{{TEAM_2_NAME}}</span>
        <div class="team-logo">{{TEAM_2_ABBR}}</div>
      </div>
    </div>
    <div class="match">
      <div class="team">
        <div class="team-logo">{{TEAM_3_ABBR}}</div>
        <span>{{TEAM_3_NAME}}</span>
      </div>
      <div class="match-time">
        <div class="vs">VS</div>
        <div class="date">{{MATCH_2_DATE}}</div>
        <div class="league">{{MATCH_2_LEAGUE}}</div>
      </div>
      <div class="team">
        <span>{{TEAM_4_NAME}}</span>
        <div class="team-logo">{{TEAM_4_ABBR}}</div>
      </div>
    </div>
  </section>

  <section class="standings">
    <h2>{{STANDINGS_TITLE}}</h2>
    <div class="standings-table">
      <div class="table-row header">
        <span class="pos">#</span>
        <span class="team-name">Team</span>
        <span>P</span>
        <span>W</span>
        <span class="pts">Pts</span>
      </div>
      <div class="table-row">
        <span class="pos">1</span>
        <span class="team-name">{{STAND_1_TEAM}}</span>
        <span>{{STAND_1_P}}</span>
        <span>{{STAND_1_W}}</span>
        <span class="pts">{{STAND_1_PTS}}</span>
      </div>
      <div class="table-row">
        <span class="pos">2</span>
        <span class="team-name">{{STAND_2_TEAM}}</span>
        <span>{{STAND_2_P}}</span>
        <span>{{STAND_2_W}}</span>
        <span class="pts">{{STAND_2_PTS}}</span>
      </div>
      <div class="table-row">
        <span class="pos">3</span>
        <span class="team-name">{{STAND_3_TEAM}}</span>
        <span>{{STAND_3_P}}</span>
        <span>{{STAND_3_W}}</span>
        <span class="pts">{{STAND_3_PTS}}</span>
      </div>
    </div>
  </section>

  <section class="news">
    <h2>{{NEWS_TITLE}}</h2>
    <div class="news-grid">
      <div class="news-card">
        <div class="news-img">{{NEWS_1_IMAGE}}</div>
        <div class="news-info">
          <h3>{{NEWS_1_HEADLINE}}</h3>
          <p>{{NEWS_1_SUMMARY}}</p>
        </div>
      </div>
      <div class="news-card">
        <div class="news-img">{{NEWS_2_IMAGE}}</div>
        <div class="news-info">
          <h3>{{NEWS_2_HEADLINE}}</h3>
          <p>{{NEWS_2_SUMMARY}}</p>
        </div>
      </div>
    </div>
  </section>

  <footer class="footer">
    <p>{{FOOTER_TEXT}} | &copy; {{YEAR}} {{BRAND}}</p>
  </footer>
</body>
</html>`;
}

function generateGenericTemplate(id, colors, style) {
  return generateLandingTemplate(id, colors, style);
}

// Generate all templates
function generateAllTemplates() {
  const meta = JSON.parse(fs.readFileSync(templatesMetaFile, 'utf8'));

  // Clear existing templates
  meta.templates = [];

  let totalGenerated = 0;

  categories.forEach(cat => {
    for (let i = 0; i < cat.count; i++) {
      const templateId = `${cat.id}_${i + 1}`;
      const paletteIdx = i % colorPalettes.length;
      const styleIdx = Math.floor(i / 3);

      const html = generateTemplateHTML(cat.id, i + 1, paletteIdx, styleIdx);

      // Save HTML file
      const templatePath = path.join(templatesDir, `${templateId}.html`);
      fs.writeFileSync(templatePath, html);

      // Extract fields from HTML (find all {{FIELD_NAME}} patterns)
      const fieldMatches = html.match(/\{\{([A-Z_0-9]+)\}\}/g) || [];
      const uniqueFields = [...new Set(fieldMatches.map(m => m.replace(/\{\{|\}\}/g, '')))];

      const templateMeta = {
        id: templateId,
        name: `${cat.name} Template ${i + 1}`,
        description: `A beautiful ${cat.name.toLowerCase()} website template with modern design and smooth animations.`,
        category: cat.id,
        tags: [cat.name.toLowerCase(), 'modern', 'responsive', 'animated'],
        thumbnail: null,
        fields: uniqueFields.map(f => ({
          key: f,
          label: f.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
          type: f.includes('DESC') || f.includes('TEXT') || f.includes('CONTENT') || f.includes('BIO') ? 'textarea' : 'text',
          default: f.includes('PRICE') ? '$0' : f.includes('ICON') || f.includes('IMAGE') || f.includes('AVATAR') ? '✨' : `${f.replace(/_/g, ' ')}`
        })),
        createdAt: new Date().toISOString(),
        deployments: 0
      };

      meta.templates.push(templateMeta);
      totalGenerated++;
    }

    // Update category count
    const categoryMeta = meta.categories.find(c => c.id === cat.id);
    if (categoryMeta) categoryMeta.count = cat.count;
  });

  fs.writeFileSync(templatesMetaFile, JSON.stringify(meta, null, 2));
  console.log(`Generated ${totalGenerated} templates successfully!`);
  return totalGenerated;
}

module.exports = generateAllTemplates;

// Run if called directly
if (require.main === module) {
  const count = generateAllTemplates();
  console.log(`Template generation complete. Total: ${count}`);
}
