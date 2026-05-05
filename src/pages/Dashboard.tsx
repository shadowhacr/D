import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, LogOut, Sparkles, Zap, User, Globe,
  Layout, Gamepad2, Briefcase, Rocket, Share2, Bot, ShoppingCart,
  GraduationCap, Film, Wrench, Laptop, Heart, Utensils, Plane,
  Home, Cpu, Shirt, Music, Trophy, Star, Crown, Gem, ArrowRight
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import type { Category, Template } from '@/types';

const categoryIcons: Record<string, React.ElementType> = {
  gaming: Gamepad2, business: Briefcase, 'landing-page': Rocket, portfolio: User,
  'social-media': Share2, automation: Bot, ecommerce: ShoppingCart, education: GraduationCap,
  entertainment: Film, tools: Wrench, fun: Sparkles, freelancing: Laptop,
  health: Heart, food: Utensils, travel: Plane, 'real-estate': Home,
  technology: Cpu, fashion: Shirt, music: Music, sports: Trophy,
};

const categoryColors: Record<string, string> = {
  gaming: 'from-red-500 to-orange-500', business: 'from-blue-500 to-indigo-500',
  'landing-page': 'from-green-500 to-teal-500', portfolio: 'from-purple-500 to-pink-500',
  'social-media': 'from-pink-500 to-rose-500', automation: 'from-cyan-500 to-blue-500',
  ecommerce: 'from-amber-500 to-yellow-500', education: 'from-emerald-500 to-green-500',
  entertainment: 'from-violet-500 to-purple-500', tools: 'from-slate-400 to-gray-400',
  fun: 'from-fuchsia-500 to-purple-500', freelancing: 'from-sky-500 to-blue-500',
  health: 'from-rose-400 to-red-400', food: 'from-orange-400 to-amber-400',
  travel: 'from-cyan-400 to-teal-400', 'real-estate': 'from-indigo-400 to-violet-400',
  technology: 'from-blue-400 to-indigo-400', fashion: 'from-pink-400 to-rose-400',
  music: 'from-violet-400 to-purple-400', sports: 'from-green-400 to-emerald-400',
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout, refreshUser } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deployCheck, setDeployCheck] = useState({ freeDeploysLeft: 2, credits: 0 });

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    loadCategories();
    refreshUser();
  }, [user]);

  useEffect(() => {
    if (user) {
      loadDeployCheck();
    }
  }, [user]);

  const loadCategories = async () => {
    try {
      const cats = await api.getCategories();
      setCategories(cats);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const loadDeployCheck = async () => {
    if (!user) return;
    try {
      const check = await api.checkDeploy(user.username);
      setDeployCheck({ freeDeploysLeft: check.freeDeploysLeft, credits: check.credits });
    } catch (error) {
      console.error('Deploy check failed:', error);
    }
  };

  const loadTemplates = useCallback(async (catId?: string, searchTerm?: string, pageNum?: number) => {
    setLoading(true);
    try {
      const category = catId || selectedCategory || '';
      const response = category
        ? await api.getTemplates(category, pageNum || page, 20, searchTerm || search)
        : await api.getAllTemplates(pageNum || page, 20, searchTerm || search, category);
      setTemplates(response.templates);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Failed to load templates:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, search, page]);

  useEffect(() => {
    if (user) {
      loadTemplates();
    }
  }, [selectedCategory, page, user]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    loadTemplates(undefined, search, 1);
  };

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId === selectedCategory ? null : catId);
    setPage(1);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f0f23, #1a1a2e)' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0f0f23]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg hidden sm:block">TemplateBuilder</span>
          </div>

          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search templates..."
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all"
              />
            </div>
          </form>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-white/70 text-sm">{deployCheck.freeDeploysLeft} free</span>
              {deployCheck.credits > 0 && (
                <>
                  <span className="text-white/30">|</span>
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span className="text-white/70 text-sm">{deployCheck.credits} credits</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
              <User className="w-4 h-4 text-indigo-400" />
              <span className="text-white text-sm font-medium">{user.username}</span>
            </div>
            <button
              onClick={logout}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4 text-white/50" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{user.username}</span>
          </h1>
          <p className="text-white/50">Choose a template and deploy your website in seconds</p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Layout className="w-5 h-5 text-indigo-400" />
            <h2 className="text-white font-semibold">Categories</h2>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => handleCategoryClick('')}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                !selectedCategory
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
              }`}
            >
              All Templates
            </button>
            {categories.map((cat) => {
              const Icon = categoryIcons[cat.id] || Star;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-indigo-500 text-white'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.name}
                  <span className="text-xs opacity-60">({cat.count})</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Templates Grid */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold flex items-center gap-2">
              <Gem className="w-5 h-5 text-purple-400" />
              {selectedCategory
                ? `${categories.find(c => c.id === selectedCategory)?.name || 'Category'} Templates`
                : 'All Templates'}
              <span className="text-white/40 text-sm font-normal">({templates.length})</span>
            </h2>
            {totalPages > 1 && (
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1 bg-white/5 rounded-lg text-white/60 text-sm disabled:opacity-30 hover:bg-white/10 transition-all"
                >
                  Prev
                </button>
                <span className="px-3 py-1 text-white/60 text-sm">{page} / {totalPages}</span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1 bg-white/5 rounded-lg text-white/60 text-sm disabled:opacity-30 hover:bg-white/10 transition-all"
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-64 bg-white/5 rounded-2xl animate-pulse border border-white/5"
                />
              ))}
            </div>
          ) : templates.length === 0 ? (
            <div className="text-center py-20">
              <Search className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/40">No templates found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <AnimatePresence>
                {templates.map((template, i) => {
                  const catColor = categoryColors[template.category] || 'from-gray-500 to-slate-500';
                  return (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: i * 0.03 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      onClick={() => navigate(`/template/${template.id}`)}
                      className="group cursor-pointer bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all hover:shadow-xl hover:shadow-indigo-500/10"
                    >
                      {/* Template preview */}
                      <div className={`h-40 bg-gradient-to-br ${catColor} bg-opacity-10 relative overflow-hidden`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-4xl mb-2 opacity-30">
                              {categoryIcons[template.category]
                                ? React.createElement(categoryIcons[template.category], { className: 'w-12 h-12 text-white mx-auto' })
                                : <Star className="w-12 h-12 text-white mx-auto" />}
                            </div>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f23] to-transparent opacity-60" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-md backdrop-blur-sm">
                            {categories.find(c => c.id === template.category)?.name || template.category}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                            <ArrowRight className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Template info */}
                      <div className="p-4">
                        <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-indigo-400 transition-colors">
                          {template.name}
                        </h3>
                        <p className="text-white/40 text-xs line-clamp-2">{template.description}</p>
                        <div className="flex items-center gap-2 mt-3">
                          <div className="flex gap-1">
                            {template.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="text-[10px] text-white/30 bg-white/5 px-2 py-0.5 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <span className="text-[10px] text-white/20 ml-auto">
                            {template.fields.length} fields
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
        >
          <div
            onClick={() => navigate('/my-sites')}
            className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl cursor-pointer hover:border-indigo-500/30 transition-all group"
          >
            <Globe className="w-8 h-8 text-indigo-400 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-semibold mb-1">My Sites</h3>
            <p className="text-white/40 text-sm">View your deployed websites</p>
          </div>
          <div
            onClick={() => navigate('/contact')}
            className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl cursor-pointer hover:border-purple-500/30 transition-all group"
          >
            <Share2 className="w-8 h-8 text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-semibold mb-1">Contact Admin</h3>
            <p className="text-white/40 text-sm">Get help or buy credits</p>
          </div>
          <div
            onClick={refreshUser}
            className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl cursor-pointer hover:border-cyan-500/30 transition-all group"
          >
            <Zap className="w-8 h-8 text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-semibold mb-1">Refresh Credits</h3>
            <p className="text-white/40 text-sm">Check your deploy limits</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

import React from 'react';
