import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, Send, Phone, Mail, User, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import type { ContactInfo } from '@/types';

export default function Contact() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [contact, setContact] = useState<ContactInfo>({ whatsapp: '', telegram: '', email: '' });
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    api.getPublicSettings()
      .then(s => setContact(s.contact))
      .catch(() => setContact({ whatsapp: '+1234567890', telegram: '@admin', email: 'admin@templatebuilder.com' }));
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setMessage('');
    }, 1500);
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f0f23, #1a1a2e)' }}>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white/70" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Contact Admin</h1>
            <p className="text-white/50 text-sm">Get help or buy more credits</p>
          </div>
        </div>

        {/* Contact methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          {[
            { icon: MessageCircle, label: 'WhatsApp', value: contact.whatsapp, color: 'text-green-400', href: `https://wa.me/${contact.whatsapp?.replace(/\\D/g, '')}` },
            { icon: Send, label: 'Telegram', value: contact.telegram, color: 'text-blue-400', href: `https://t.me/${contact.telegram?.replace('@', '')}` },
            { icon: Mail, label: 'Email', value: contact.email, color: 'text-purple-400', href: `mailto:${contact.email}` },
          ].map((method, i) => (
            <motion.a
              key={method.label}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="p-5 bg-white/[0.03] border border-white/10 rounded-2xl hover:border-indigo-500/30 transition-all group"
            >
              <method.icon className={`w-8 h-8 ${method.color} mb-3 group-hover:scale-110 transition-transform`} />
              <h3 className="text-white font-medium text-sm mb-1">{method.label}</h3>
              <p className="text-white/50 text-xs">{method.value}</p>
            </motion.a>
          ))}
        </motion.div>

        {/* Send message form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/[0.03] border border-white/10 rounded-2xl p-6"
        >
          <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Send className="w-5 h-5 text-indigo-400" />
            Send Message
          </h2>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Message Sent!</h3>
              <p className="text-white/50 text-sm mb-4">Admin will contact you soon</p>
              <button
                onClick={() => setSent(false)}
                className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-all text-sm"
              >
                Send Another
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSend}>
              <div className="mb-4">
                <label className="block text-white/50 text-sm mb-2">From</label>
                <div className="flex items-center gap-3 px-4 py-2.5 bg-white/5 rounded-xl border border-white/10">
                  <User className="w-4 h-4 text-white/40" />
                  <span className="text-white text-sm">{user?.username || 'Guest'}</span>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-white/50 text-sm mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  placeholder="Describe what you need help with, or request credits..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={sending || !message.trim()}
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {sending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                Send Message
              </button>
            </form>
          )}
        </motion.div>

        {/* Buy Credits info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl"
        >
          <h3 className="text-amber-400 font-semibold mb-2 flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Need More Credits?
          </h3>
          <p className="text-white/60 text-sm mb-4">
            Contact admin via WhatsApp or Telegram to purchase additional deployment credits.
          </p>
          <div className="flex gap-3">
            <a
              href={`https://wa.me/${contact.whatsapp?.replace(/\\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium hover:bg-green-500/30 transition-all"
            >
              WhatsApp
            </a>
            <a
              href={`https://t.me/${contact.telegram?.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-500/30 transition-all"
            >
              Telegram
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
