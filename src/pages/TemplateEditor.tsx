import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Eye, Code, Send, Check, AlertCircle,
  Loader2, Smartphone, Monitor, Tablet, Copy, ExternalLink
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import type { Template } from '@/types';

export default function TemplateEditor() {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [template, setTemplate] = useState<Template & { html: string } | null>(null);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [tab, setTab] = useState<'edit' | 'code'>('edit');
  const [loading, setLoading] = useState(true);
  const [deploying, setDeploying] = useState(false);
  const [deployedUrl, setDeployedUrl] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [deployCheck, setDeployCheck] = useState({ canDeploy: true, freeDeploysLeft: 2, credits: 0 });

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    if (templateId) {
      loadTemplate();
      loadDeployCheck();
    }
  }, [templateId, user]);

  const loadTemplate = async () => {
    if (!templateId) return;
    setLoading(true);
    try {
      const data = await api.getTemplate(templateId);
      setTemplate(data);
      const defaults: Record<string, string> = {};
      data.fields.forEach(f => { defaults[f.key] = f.default; });
      setFieldValues(defaults);
    } catch (error) {
      console.error('Failed to load template:', error);
      setError('Failed to load template');
    } finally {
      setLoading(false);
    }
  };

  const loadDeployCheck = async () => {
    if (!user) return;
    try {
      const check = await api.checkDeploy(user.username);
      setDeployCheck(check);
    } catch (error) {
      console.error('Deploy check failed:', error);
    }
  };

  const getPreviewHTML = useCallback(() => {
    if (!template) return '';
    let html = template.html;
    Object.keys(fieldValues).forEach(key => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      html = html.replace(regex, fieldValues[key] || '');
    });
    return html;
  }, [template, fieldValues]);

  const handleDeploy = async () => {
    if (!user || !template) return;
    if (!deployCheck.canDeploy) {
      setError('You have no deploys remaining. Contact admin to buy credits.');
      return;
    }
    setDeploying(true);
    setError('');
    try {
      const result = await api.deploy(user.username, template.id, fieldValues);
      if (result.success) {
        setDeployedUrl(`${window.location.origin}${result.deployment.url}`);
        setDeployCheck(prev => ({
          ...prev,
          freeDeploysLeft: result.freeDeploysLeft,
          credits: result.credits,
        }));
      }
    } catch (err: any) {
      setError(err.message || 'Deployment failed');
    } finally {
      setDeploying(false);
    }
  };

  const copyUrl = () => {
    if (deployedUrl) {
      navigator.clipboard.writeText(deployedUrl);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0f0f23, #1a1a2e)' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0f0f23, #1a1a2e)' }}>
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <p className="text-white">Template not found</p>
          <button onClick={() => navigate('/dashboard')} className="mt-4 text-indigo-400 hover:underline">
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f0f23, #1a1a2e)' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0f0f23]/80 border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white/70" />
            </button>
            <div>
              <h1 className="text-white font-semibold text-sm">{template.name}</h1>
              <p className="text-white/40 text-xs">{template.fields.length} editable fields</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View mode toggle */}
            <div className="hidden sm:flex items-center bg-white/5 rounded-lg p-1 border border-white/10">
              {([
                { mode: 'desktop' as const, icon: Monitor },
                { mode: 'tablet' as const, icon: Tablet },
                { mode: 'mobile' as const, icon: Smartphone },
              ]).map(({ mode, icon: Icon }) => (
                <button
                  key={mode}
                  onClick={() => setPreviewMode(mode)}
                  className={`p-1.5 rounded-md transition-all ${previewMode === mode ? 'bg-indigo-500 text-white' : 'text-white/40 hover:text-white/70'}`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>

            {/* Tab toggle */}
            <div className="flex items-center bg-white/5 rounded-lg p-1 border border-white/10">
              <button
                onClick={() => setTab('edit')}
                className={`px-3 py-1.5 rounded-md text-sm transition-all ${tab === 'edit' ? 'bg-indigo-500 text-white' : 'text-white/40 hover:text-white/70'}`}
              >
                Edit
              </button>
              <button
                onClick={() => setTab('code')}
                className={`px-3 py-1.5 rounded-md text-sm transition-all ${tab === 'code' ? 'bg-indigo-500 text-white' : 'text-white/40 hover:text-white/70'}`}
              >
                <Code className="w-4 h-4" />
              </button>
            </div>

            {/* Deploy button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDeploy}
              disabled={deploying || !deployCheck.canDeploy}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium text-sm hover:shadow-lg hover:shadow-indigo-500/25 transition-all disabled:opacity-50"
            >
              {deploying ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              Deploy
            </motion.button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-60px)]">
        {/* Sidebar - Editor */}
        <AnimatePresence mode="wait">
          {tab === 'edit' ? (
            <motion.div
              key="edit"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-80 border-r border-white/5 overflow-y-auto bg-[#0f0f23]/50 backdrop-blur-sm"
            >
              <div className="p-4">
                <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-indigo-400" />
                  Edit Content
                </h2>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-sm"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                  </motion.div>
                )}

                {/* Deploy status */}
                <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Free deploys today</span>
                    <span className="text-indigo-400 font-medium">{deployCheck.freeDeploysLeft}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-white/60">Credits</span>
                    <span className="text-amber-400 font-medium">{deployCheck.credits}</span>
                  </div>
                </div>

                {/* Fields */}
                <div className="space-y-3">
                  {template.fields.map((field, i) => (
                    <motion.div
                      key={field.key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="group"
                    >
                      <label className="block text-white/50 text-xs mb-1.5 font-medium">
                        {field.label}
                      </label>
                      {field.type === 'textarea' ? (
                        <textarea
                          value={fieldValues[field.key] || ''}
                          onChange={(e) => setFieldValues(prev => ({ ...prev, [field.key]: e.target.value }))}
                          rows={3}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all resize-none"
                          placeholder={field.default}
                        />
                      ) : (
                        <input
                          type="text"
                          value={fieldValues[field.key] || ''}
                          onChange={(e) => setFieldValues(prev => ({ ...prev, [field.key]: e.target.value }))}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all"
                          placeholder={field.default}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>

                {template.fields.length > 10 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDeploy}
                    disabled={deploying}
                    className="w-full mt-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {deploying ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                    Deploy Website
                  </motion.button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="code"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-80 border-r border-white/5 overflow-y-auto bg-[#0f0f23]/50"
            >
              <div className="p-4">
                <h2 className="text-white font-semibold mb-4">HTML Code</h2>
                <pre className="text-xs text-green-400/80 bg-black/30 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap">
                  {getPreviewHTML().slice(0, 5000)}
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Preview */}
        <div className="flex-1 bg-[#0a0a1a] overflow-auto flex items-start justify-center p-8">
          <motion.div
            layout
            className="bg-white rounded-lg overflow-hidden shadow-2xl transition-all"
            style={{
              width: previewMode === 'mobile' ? '375px' : previewMode === 'tablet' ? '768px' : '100%',
              maxWidth: previewMode === 'desktop' ? '1200px' : undefined,
              minHeight: '600px',
            }}
          >
            <iframe
              srcDoc={getPreviewHTML()}
              className="w-full h-[800px] border-0"
              title="Preview"
              sandbox="allow-scripts"
            />
          </motion.div>
        </div>
      </div>

      {/* Deploy Success Modal */}
      <AnimatePresence>
        {deployedUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setDeployedUrl(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#1a1a2e] border border-indigo-500/20 rounded-2xl p-8 max-w-md w-full text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Check className="w-8 h-8 text-green-400" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-2">Website Deployed!</h2>
              <p className="text-white/50 text-sm mb-6">Your website is now live and ready to share</p>

              <div className="bg-black/30 rounded-xl p-3 mb-6 flex items-center gap-2">
                <input
                  type="text"
                  value={deployedUrl}
                  readOnly
                  className="flex-1 bg-transparent text-white text-sm outline-none"
                />
                <button
                  onClick={copyUrl}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                  title="Copy URL"
                >
                  <Copy className="w-4 h-4 text-white/60" />
                </button>
                <a
                  href={deployedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-4 h-4 text-indigo-400" />
                </a>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setDeployedUrl(null)}
                  className="flex-1 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all text-sm font-medium"
                >
                  Continue Editing
                </button>
                <a
                  href={deployedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-all text-sm font-medium flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Site
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
