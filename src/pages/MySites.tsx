import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, ExternalLink, Trash2, Eye, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import type { Deployment } from '@/types';

export default function MySites() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    loadDeployments();
  }, [user]);

  const loadDeployments = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await api.getUserDeployments(user.username);
      setDeployments(data.reverse());
    } catch (error) {
      console.error('Failed to load deployments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (deployId: string) => {
    if (!user) return;
    if (!confirm('Are you sure you want to delete this site?')) return;
    try {
      await fetch(`/api/deploy/${deployId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.username }),
      });
      setDeployments(prev => prev.filter(d => d.id !== deployId));
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f0f23, #1a1a2e)' }}>
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white/70" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">My Websites</h1>
            <p className="text-white/50 text-sm">All your deployed websites</p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
          </div>
        ) : deployments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <Globe className="w-16 h-16 text-white/10 mx-auto mb-4" />
            <h2 className="text-white font-semibold mb-2">No websites yet</h2>
            <p className="text-white/40 text-sm mb-6">Deploy your first website from the dashboard</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-2.5 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-all text-sm font-medium"
            >
              Browse Templates
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {deployments.map((deploy, i) => {
              const fullUrl = `${window.location.origin}${deploy.url}`;
              return (
                <motion.div
                  key={deploy.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-indigo-500/20 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                        <Globe className="w-6 h-6 text-indigo-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium text-sm mb-1">
                          {deploy.templateId}
                        </h3>
                        <p className="text-white/40 text-xs">
                          Deployed {new Date(deploy.deployedAt).toLocaleDateString()}
                        </p>
                        {deploy.views !== undefined && (
                          <p className="text-white/30 text-xs mt-0.5 flex items-center gap-1">
                            <Eye className="w-3 h-3" /> {deploy.views} views
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={fullUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-white/5 rounded-lg transition-colors text-indigo-400"
                        title="Open site"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => handleDelete(deploy.id)}
                        className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-white/40 hover:text-red-400"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/5">
                    <a
                      href={fullUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-400/70 hover:text-indigo-400 transition-colors break-all"
                    >
                      {fullUrl}
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
