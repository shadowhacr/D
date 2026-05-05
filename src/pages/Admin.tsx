import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Lock, ArrowLeft, Users, Globe, Zap, CreditCard,
  Settings, Palette, MessageCircle, AlertTriangle,
  Loader2, Eye, Ban, BarChart3, Activity
} from 'lucide-react';
import type { User, Deployment, ThemeSettings, ContactInfo, Limits } from '@/types';

export default function Admin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('adminKey') === 'SHADOW');
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'deployments' | 'settings' | 'credits'>('dashboard');

  // Data states
  const [stats, setStats] = useState({ totalUsers: 0, totalDeployments: 0, totalTemplates: 0, todayDeploys: 0, weekDeploys: 0, maintenanceMode: false, freeDeploysPerDay: 2 });
  const [users, setUsers] = useState<User[]>([]);
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [theme, setTheme] = useState<ThemeSettings>({ primaryColor: '#6366f1', secondaryColor: '#8b5cf6', accentColor: '#06b6d4', backgroundColor: '#0f0f23', cardColor: '#1a1a2e', textColor: '#ffffff', title: 'Template Builder Platform', logo: null, favicon: null });
  const [contact, setContact] = useState<ContactInfo>({ whatsapp: '', telegram: '', email: '' });
  const [limits, setLimits] = useState<Limits>({ freeDeploysPerDay: 2, creditCostPerDeploy: 1 });
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [creditUsername, setCreditUsername] = useState('');
  const [creditAmount, setCreditAmount] = useState('');
  const [saving, setSaving] = useState(false);

  const adminKey = localStorage.getItem('adminKey') || '';

  useEffect(() => {
    if (isLoggedIn) {
      loadAllData();
    }
  }, [isLoggedIn]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const key = localStorage.getItem('adminKey') || '';

      const statsRes = await fetch('/api/admin/stats', { headers: { 'x-admin-key': key } });
      if (statsRes.ok) setStats(await statsRes.json());

      const usersRes = await fetch('/api/admin/users', { headers: { 'x-admin-key': key } });
      if (usersRes.ok) setUsers(await usersRes.json());

      const deployRes = await fetch('/api/admin/deployments', { headers: { 'x-admin-key': key } });
      if (deployRes.ok) setDeployments(await deployRes.json());

      const settingsRes = await fetch('/api/admin/settings', { headers: { 'x-admin-key': key } });
      if (settingsRes.ok) {
        const s = await settingsRes.json();
        if (s.theme) setTheme(s.theme);
        if (s.contact) setContact(s.contact);
        if (s.limits) setLimits(s.limits);
      }

      const maintRes = await fetch('/api/admin/maintenance-status');
      if (maintRes.ok) {
        const m = await maintRes.json();
        setMaintenanceMode(m.enabled);
        setMaintenanceMessage(m.message);
      }
    } catch (error) {
      console.error('Failed to load admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('adminKey', password);
        setIsLoggedIn(true);
      } else {
        setError('Invalid password');
      }
    } catch (error) {
      setError('Login failed');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleSaveTheme = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify(theme),
      });
    } catch (error) {
      console.error('Failed to save theme:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveContact = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify(contact),
      });
    } catch (error) {
      console.error('Failed to save contact:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveLimits = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/limits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify(limits),
      });
    } catch (error) {
      console.error('Failed to save limits:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleMaintenance = async () => {
    const newState = !maintenanceMode;
    try {
      await fetch('/api/admin/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify({ enabled: newState, message: maintenanceMessage }),
      });
      setMaintenanceMode(newState);
    } catch (error) {
      console.error('Failed to toggle maintenance:', error);
    }
  };

  const handleAssignCredits = async () => {
    if (!creditUsername || !creditAmount) return;
    try {
      await fetch('/api/credits/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify({ username: creditUsername, amount: parseInt(creditAmount) }),
      });
      setCreditUsername('');
      setCreditAmount('');
      loadAllData();
    } catch (error) {
      console.error('Failed to assign credits:', error);
    }
  };

  const handleBanUser = async (username: string, ban: boolean) => {
    try {
      await fetch('/api/admin/user/ban', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify({ username, ban }),
      });
      loadAllData();
    } catch (error) {
      console.error('Failed to ban user:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminKey');
    setIsLoggedIn(false);
    setPassword('');
  };

  // Login screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0f0f23, #1a1a2e)' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mx-4"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-indigo-500/20"
            >
              <Shield className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-white/50">Enter password to access admin controls</p>
          </div>

          <form onSubmit={handleLogin} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <div className="mb-4">
              <label className="block text-white/50 text-sm mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="Enter admin password"
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all"
                />
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm mb-4"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loggingIn ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Lock className="w-5 h-5" />
              )}
              Login
            </button>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="text-white/40 text-sm hover:text-white/70 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f0f23, #1a1a2e)' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0f0f23]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-white/70" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold">Admin Panel</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white/5 text-white/70 rounded-lg text-sm hover:bg-white/10 transition-all"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
          {[
            { id: 'dashboard' as const, label: 'Dashboard', icon: BarChart3 },
            { id: 'users' as const, label: 'Users', icon: Users },
            { id: 'deployments' as const, label: 'Deployments', icon: Globe },
            { id: 'credits' as const, label: 'Credits', icon: CreditCard },
            { id: 'settings' as const, label: 'Settings', icon: Settings },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'from-blue-500 to-indigo-500' },
                    { label: 'Total Deployments', value: stats.totalDeployments, icon: Globe, color: 'from-green-500 to-teal-500' },
                    { label: 'Today\'s Deploys', value: stats.todayDeploys, icon: Activity, color: 'from-purple-500 to-pink-500' },
                    { label: 'Templates', value: stats.totalTemplates, icon: Zap, color: 'from-amber-500 to-orange-500' },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-5 bg-white/[0.03] border border-white/10 rounded-2xl"
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-20 flex items-center justify-center mb-3`}>
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-white/40 text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Maintenance mode card */}
                <div className="p-5 bg-white/[0.03] border border-white/10 rounded-2xl mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-6 h-6 text-amber-400" />
                      <div>
                        <h3 className="text-white font-semibold">Maintenance Mode</h3>
                        <p className="text-white/40 text-sm">Disable access for non-admin users</p>
                      </div>
                    </div>
                    <button
                      onClick={handleToggleMaintenance}
                      className={`relative w-14 h-8 rounded-full transition-all ${maintenanceMode ? 'bg-amber-500' : 'bg-white/10'}`}
                    >
                      <motion.div
                        animate={{ x: maintenanceMode ? 24 : 4 }}
                        className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                      />
                    </button>
                  </div>
                  {maintenanceMode && (
                    <div className="mt-4">
                      <input
                        type="text"
                        value={maintenanceMessage}
                        onChange={(e) => setMaintenanceMessage(e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
                        placeholder="Maintenance message..."
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <motion.div
                key="users"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left text-white/50 text-xs font-medium uppercase px-4 py-3">Username</th>
                          <th className="text-left text-white/50 text-xs font-medium uppercase px-4 py-3">Credits</th>
                          <th className="text-left text-white/50 text-xs font-medium uppercase px-4 py-3">Deploys</th>
                          <th className="text-left text-white/50 text-xs font-medium uppercase px-4 py-3">Status</th>
                          <th className="text-left text-white/50 text-xs font-medium uppercase px-4 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(user => (
                          <tr key={user.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                            <td className="px-4 py-3">
                              <div className="text-white text-sm font-medium">{user.username}</div>
                              <div className="text-white/30 text-xs">{new Date(user.createdAt).toLocaleDateString()}</div>
                            </td>
                            <td className="px-4 py-3 text-amber-400 text-sm">{user.credits}</td>
                            <td className="px-4 py-3 text-white/60 text-sm">{user.totalDeploys}</td>
                            <td className="px-4 py-3">
                              <span className={`text-xs px-2 py-1 rounded-full ${user.isBanned ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                                {user.isBanned ? 'Banned' : 'Active'}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => handleBanUser(user.username, !user.isBanned)}
                                className={`p-1.5 rounded-lg transition-colors ${user.isBanned ? 'hover:bg-green-500/10 text-green-400' : 'hover:bg-red-500/10 text-red-400'}`}
                                title={user.isBanned ? 'Unban' : 'Ban'}
                              >
                                <Ban className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Deployments Tab */}
            {activeTab === 'deployments' && (
              <motion.div
                key="deployments"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="space-y-3">
                  {deployments.slice(0, 50).map(deploy => (
                    <motion.div
                      key={deploy.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 bg-white/[0.03] border border-white/10 rounded-xl flex items-center justify-between"
                    >
                      <div>
                        <div className="text-white text-sm font-medium">{deploy.username}</div>
                        <div className="text-white/40 text-xs">{deploy.templateId}</div>
                        <div className="text-white/30 text-xs">{new Date(deploy.deployedAt).toLocaleString()}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={`${window.location.origin}${deploy.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Credits Tab */}
            {activeTab === 'credits' && (
              <motion.div
                key="credits"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Assign Credits */}
                  <div className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-indigo-400" />
                      Assign Credits
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/50 text-sm mb-2">Username</label>
                        <input
                          type="text"
                          value={creditUsername}
                          onChange={e => setCreditUsername(e.target.value)}
                          placeholder="Enter username"
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 text-sm mb-2">Amount</label>
                        <input
                          type="number"
                          value={creditAmount}
                          onChange={e => setCreditAmount(e.target.value)}
                          placeholder="Credit amount"
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
                        />
                      </div>
                      <button
                        onClick={handleAssignCredits}
                        className="w-full py-2.5 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition-all"
                      >
                        Assign Credits
                      </button>
                    </div>
                  </div>

                  {/* Limits */}
                  <div className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <Settings className="w-5 h-5 text-purple-400" />
                      Limits
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/50 text-sm mb-2">Free Deploys Per Day</label>
                        <input
                          type="number"
                          value={limits.freeDeploysPerDay}
                          onChange={e => setLimits(prev => ({ ...prev, freeDeploysPerDay: parseInt(e.target.value) || 0 }))}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 text-sm mb-2">Credit Cost Per Deploy</label>
                        <input
                          type="number"
                          value={limits.creditCostPerDeploy}
                          onChange={e => setLimits(prev => ({ ...prev, creditCostPerDeploy: parseInt(e.target.value) || 1 }))}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
                        />
                      </div>
                      <button
                        onClick={handleSaveLimits}
                        className="w-full py-2.5 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-all"
                      >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Save Limits'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Theme Settings */}
                  <div className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <Palette className="w-5 h-5 text-indigo-400" />
                      Theme Settings
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/50 text-sm mb-2">Website Title</label>
                        <input
                          type="text"
                          value={theme.title}
                          onChange={e => setTheme(prev => ({ ...prev, title: e.target.value }))}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 text-sm mb-2">Primary Color</label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={theme.primaryColor}
                            onChange={e => setTheme(prev => ({ ...prev, primaryColor: e.target.value }))}
                            className="w-10 h-10 rounded-lg border-0 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={theme.primaryColor}
                            onChange={e => setTheme(prev => ({ ...prev, primaryColor: e.target.value }))}
                            className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-white/50 text-sm mb-2">Accent Color</label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={theme.accentColor}
                            onChange={e => setTheme(prev => ({ ...prev, accentColor: e.target.value }))}
                            className="w-10 h-10 rounded-lg border-0 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={theme.accentColor}
                            onChange={e => setTheme(prev => ({ ...prev, accentColor: e.target.value }))}
                            className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
                          />
                        </div>
                      </div>
                      <button
                        onClick={handleSaveTheme}
                        className="w-full py-2.5 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition-all"
                      >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Save Theme'}
                      </button>
                    </div>
                  </div>

                  {/* Contact Settings */}
                  <div className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-purple-400" />
                      Contact Info
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/50 text-sm mb-2">WhatsApp Number</label>
                        <input
                          type="text"
                          value={contact.whatsapp}
                          onChange={e => setContact(prev => ({ ...prev, whatsapp: e.target.value }))}
                          placeholder="+1234567890"
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 text-sm mb-2">Telegram ID</label>
                        <input
                          type="text"
                          value={contact.telegram}
                          onChange={e => setContact(prev => ({ ...prev, telegram: e.target.value }))}
                          placeholder="@username"
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 text-sm mb-2">Email</label>
                        <input
                          type="email"
                          value={contact.email}
                          onChange={e => setContact(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="admin@example.com"
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
                        />
                      </div>
                      <button
                        onClick={handleSaveContact}
                        className="w-full py-2.5 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-all"
                      >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Save Contact'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
