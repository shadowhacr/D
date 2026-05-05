import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, User, ArrowRight, Zap, Globe, Shield,
  Palette, Rocket, TrendingUp, Users, Star
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';

export default function Home() {
  const navigate = useNavigate();
  const { user, login, register } = useAuth();
  const [username, setUsername] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    api.getPublicSettings().catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }
    setIsChecking(true);
    setError('');

    try {
      const check = await api.checkUsername(username.trim());
      if (check.available) {
        const success = await register(username.trim());
        if (success) navigate('/dashboard');
        else setError('Registration failed');
      } else {
        const success = await login(username.trim());
        if (success) navigate('/dashboard');
        else setError('Login failed');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsChecking(false);
    }
  };

  if (user) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f0f23, #1a1a2e, #16213e)' }}>
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              background: `radial-gradient(circle, ${['rgba(99,102,241,0.08)', 'rgba(139,92,246,0.06)', 'rgba(6,182,212,0.05)'][i % 3]}, transparent)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      <div className="relative z-10">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">TemplateBuilder</span>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/admin')}
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm hover:bg-white/10 hover:text-white transition-all flex items-center gap-2"
          >
            <Shield className="w-4 h-4" />
            Admin
          </motion.button>
        </nav>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 pt-12 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm mb-6"
              >
                <Zap className="w-4 h-4" />
                1000+ Premium Templates
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
                Build & Deploy{' '}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Websites
                </span>{' '}
                in Seconds
              </h1>

              <p className="text-lg text-white/60 mb-8 max-w-lg leading-relaxed">
                Choose from 1000+ professionally designed templates, customize with your content,
                and deploy instantly. No coding required.
              </p>

              {/* Username Form */}
              <form onSubmit={handleSubmit} className="max-w-md">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value); setError(''); }}
                    placeholder="Enter your username..."
                    className="w-full pl-12 pr-32 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={isChecking}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    {isChecking ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <>
                        Start <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-sm mt-2 ml-1"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>

              {/* Quick stats */}
              <div className="flex gap-8 mt-10">
                {[
                  { icon: Globe, label: 'Templates', value: '1000+' },
                  { icon: Users, label: 'Users', value: 'Active' },
                  { icon: Rocket, label: 'Deploys', value: 'Instant' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{stat.value}</div>
                      <div className="text-white/40 text-xs">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block relative"
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Floating cards */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-0 left-0 w-48 h-32 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 backdrop-blur-sm p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Palette className="w-5 h-5 text-indigo-400" />
                    <span className="text-white text-sm font-medium">Gaming</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full w-3/4 mb-2" />
                  <div className="h-2 bg-white/10 rounded-full w-1/2" />
                </motion.div>

                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-20 right-0 w-52 h-36 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 backdrop-blur-sm p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-cyan-400" />
                    <span className="text-white text-sm font-medium">Business</span>
                  </div>
                  <div className="flex gap-1 mb-2">
                    {[40, 65, 45, 80, 55, 70].map((h, i) => (
                      <div key={i} className="flex-1 bg-cyan-400/30 rounded-sm" style={{ height: `${h}px` }} />
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [-5, 15, -5] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-10 left-10 w-56 h-40 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 backdrop-blur-sm p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-purple-400" />
                    <span className="text-white text-sm font-medium">Portfolio</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-8 bg-white/10 rounded-lg" />
                    ))}
                  </div>
                </motion.div>

                {/* Center glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Categories preview */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-white text-center mb-10"
          >
            20 Categories to Choose From
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              { name: 'Gaming', color: 'from-red-500 to-orange-500', icon: '1' },
              { name: 'Business', color: 'from-blue-500 to-indigo-500', icon: '2' },
              { name: 'Landing Pages', color: 'from-green-500 to-teal-500', icon: '3' },
              { name: 'Portfolio', color: 'from-purple-500 to-pink-500', icon: '4' },
              { name: 'Social Media', color: 'from-pink-500 to-rose-500', icon: '5' },
              { name: 'Automation', color: 'from-cyan-500 to-blue-500', icon: '6' },
              { name: 'E-Commerce', color: 'from-amber-500 to-yellow-500', icon: '7' },
              { name: 'Education', color: 'from-emerald-500 to-green-500', icon: '8' },
              { name: 'Entertainment', color: 'from-violet-500 to-purple-500', icon: '9' },
              { name: 'Tools', color: 'from-slate-500 to-gray-500', icon: '10' },
            ].map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`p-4 rounded-xl bg-gradient-to-br ${cat.color} bg-opacity-10 border border-white/10 cursor-pointer hover:border-white/20 transition-all`}
                style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.06))` }}
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center mb-3 text-white font-bold text-sm`}>
                  {cat.icon}
                </div>
                <span className="text-white text-sm font-medium">{cat.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/5 py-8">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-white/30 text-sm">
              Template Builder Platform - Deploy websites in seconds
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
