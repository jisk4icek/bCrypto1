import React, { useState } from 'react';
import { Shield, Lock, User, ArrowRight, ChevronDown, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Login = ({ onLogin, t, lang, setLang }) => {
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'cz', label: 'Čeština', flag: '🇨🇿' },
    { code: 'sk', label: 'Slovenčina', flag: '🇸🇰' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !code) return;

    setLoading(true);
    // Simulate network delay for "Realism"
    setTimeout(() => {
      setLoading(false);
      onLogin(username, code);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 bg-grid-pattern relative overflow-hidden font-sans">

      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/10 to-purple-900/10 pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" />

      {/* Language Switcher (Floating Top Right) */}
      <div className="absolute top-6 right-6 z-50">
        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-2 bg-black/40 hover:bg-black/60 px-3 py-2 rounded-full border border-white/10 transition-all text-white/80"
          >
            <Globe size={16} />
            <span className="text-sm font-medium uppercase">{lang}</span>
            <ChevronDown size={14} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {langOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-32 glass-panel rounded-lg overflow-hidden py-1 bg-[#0b0e14] border border-white/10"
              >
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-xs flex items-center gap-2 hover:bg-white/10 transition-colors ${lang === l.code ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    <span>{l.flag}</span>
                    {l.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel w-full max-w-md p-8 rounded-2xl relative z-10 border-t border-white/10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-orange-500/20">
             <span className="font-bold text-3xl text-black">B</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">{t.login_title || "bCrypto PRO"}</h1>
          <p className="text-gray-400 text-sm">{t.login_subtitle || "Secure Banking Terminal"}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t.login_identity || "Identity"}</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t.login_user_placeholder || "Username"}
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-600"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex justify-between">
              <span>{t.login_code || "Access Code"}</span>
              <span className="text-blue-400 cursor-help" title={t.login_help_text || "Run /crypto web open"}>?</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={t.login_code_placeholder || "••••••"}
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-600 font-mono tracking-widest"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-black transition-all flex items-center justify-center gap-2 ${
              loading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:scale-[1.02]'
            }`}
          >
            {loading ? (
              <span className="animate-pulse">{t.login_btn_loading || "Authenticating..."}</span>
            ) : (
              <>
                {t.login_btn_connect || "Connect"} <ArrowRight size={18} />
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onLogin("DemoUser")}
            className="w-full py-3 rounded-xl font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm"
          >
            {t.login_btn_demo || "Try Demo Mode"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500 bg-white/5 py-2 rounded-lg">
            <Shield size={14} className="text-green-500" />
            <span>{t.login_secure || "End-to-End Encryption Enabled"}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
