import React, { useState, useEffect } from 'react';
import {
  Wallet,
  ChevronDown,
  ShieldAlert,
  Lock,
  User,
  ArrowUpRight,
  ArrowDownRight,
  Maximize2,
  History,
  Menu,
  X,
  Copy,
  Terminal
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import Login from './components/Login';

// Dynamic API URL Logic
const getApiUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const apiParam = params.get('api');
    if (apiParam) {
        localStorage.setItem('bCrypto_API_URL', apiParam);
        return apiParam;
    }
    return localStorage.getItem('bCrypto_API_URL') || process.env.REACT_APP_API_URL || "http://localhost:26066/api/v1";
};

const API_URL = getApiUrl();
const isPhpBridge = API_URL.endsWith('.php');
const FULL_API_URL = isPhpBridge ? API_URL : (API_URL.includes('/api/v1') ? API_URL : `${API_URL}/api/v1`);

const TRANSLATIONS = {
  en: {
    welcome: "Welcome back",
    status_verified: "Verified",
    nav_dashboard: "Dashboard",
    nav_wallet: "Wallet",
    nav_history: "History",
    nav_admin: "Admin",
    init_title: "Welcome to bCrypto",
    init_desc: "Initialize your secure blockchain wallet to start trading.",
    init_btn: "Initialize Wallet",
    wallet_title: "Banking Portal",
    wallet_source: "Pocket Money (Vault)",
    wallet_dest: "Exchange Account",
    wallet_vault: "Vault Balance",
    wallet_exchange: "Exchange Balance",
    wallet_deposit: "Deposit",
    wallet_withdraw: "Withdraw",
    wallet_amount: "Amount",
    wallet_transfer: "Transfer",
    market_chart_title: "Price Performance",
    trade_buy: "Buy",
    trade_sell: "Sell",
    trade_available: "Available",
    trade_fee: "Fee",
    trade_total: "Total",
    trade_submit_buy: "Place Buy Order",
    trade_submit_sell: "Place Sell Order",
    admin_title: "Admin Controls",
    admin_crash: "Trigger Market Crash",
    admin_pump: "Trigger Market Pump",
    admin_reset: "Reset User Wallet",
    coin_btc: "Bitcoin",
    coin_eth: "Ethereum",
    coin_sol: "Solana",
    tab_1h: "1H",
    tab_12h: "12H",
    tab_1d: "1D",
    tab_7d: "7D",
    market_watch: "Market Watch",
    stats_high: "24h High",
    stats_low: "24h Low",
    stats_vol: "Volume",
    trade_amount: "Amount",
    trade_max: "Max",
    history_title: "Transaction Log",
    history_empty: "No transactions found",
    static_mode: "Static Mode",
    static_desc: "You are viewing a snapshot. Actions generate commands.",
    cmd_title: "Execute Command",
    cmd_desc: "Paste this command in-game to complete the action:",
    cmd_copied: "Copied!",

    login_title: "bCrypto PRO",
    login_subtitle: "Secure Banking Terminal",
    login_identity: "Identity",
    login_user_placeholder: "Username",
    login_code: "Access Code",
    login_code_placeholder: "••••••",
    login_btn_loading: "Authenticating...",
    login_btn_connect: "Connect",
    login_btn_demo: "Try Demo Mode",
    login_secure: "End-to-End Encryption Enabled",
    login_help_title: "How to get code?",
    login_help_text: "Run /crypto web open in-game"
  },
  cz: {
    welcome: "Vítejte zpět",
    status_verified: "Ověřeno",
    nav_dashboard: "Přehled",
    nav_wallet: "Peněženka",
    nav_history: "Historie",
    nav_admin: "Admin",
    init_title: "Vítejte v bCrypto",
    init_desc: "Inicializujte svou bezpečnou blockchain peněženku pro zahájení obchodování.",
    init_btn: "Založit Peněženku",
    wallet_title: "Bankovní Portál",
    wallet_source: "Kapesné (Trezor)",
    wallet_dest: "Burzovní Účet",
    wallet_vault: "Zůstatek Trezoru",
    wallet_exchange: "Zůstatek Burzy",
    wallet_deposit: "Vložit",
    wallet_withdraw: "Vybrat",
    wallet_amount: "Částka",
    wallet_transfer: "Převést",
    market_chart_title: "Výkon Ceny",
    trade_buy: "Koupit",
    trade_sell: "Prodat",
    trade_available: "Dostupné",
    trade_fee: "Poplatok",
    trade_total: "Celkem",
    trade_submit_buy: "Zadat Nákupní Příkaz",
    trade_submit_sell: "Zadat Prodejní Příkaz",
    admin_title: "Admin Ovládání",
    admin_crash: "Spustit Pád Trhu",
    admin_pump: "Spustit Růst Trhu",
    admin_reset: "Resetovat Peněženku",
    coin_btc: "Bitcoin",
    coin_eth: "Ethereum",
    coin_sol: "Solana",
    tab_1h: "1H",
    tab_12h: "12H",
    tab_1d: "1D",
    tab_7d: "7D",
    market_watch: "Sledování Trhu",
    stats_high: "24h Maximum",
    stats_low: "24h Minimum",
    stats_vol: "Objem",
    trade_amount: "Částka",
    trade_max: "Max",
    history_title: "Historie Transakcí",
    history_empty: "Žádné transakce nenalezeny",
    static_mode: "Statický Mód",
    static_desc: "Prohlížíte si snapshot. Akce generují příkazy.",
    cmd_title: "Provést Příkaz",
    cmd_desc: "Vložte tento příkaz do hry pro dokončení akce:",
    cmd_copied: "Zkopírováno!",

    login_title: "bCrypto PRO",
    login_subtitle: "Zabezpečený Bankovní Terminál",
    login_identity: "Identita",
    login_user_placeholder: "Uživatelské jméno",
    login_code: "Přístupový Kód",
    login_code_placeholder: "••••••",
    login_btn_loading: "Ověřování...",
    login_btn_connect: "Připojit",
    login_btn_demo: "Zkusit Demo",
    login_secure: "End-to-End Šifrování Aktivní",
    login_help_title: "Jak získat kód?",
    login_help_text: "Napiš /crypto web open ve hře"
  }
};

const generateChartData = (points = 50, trend = 0) => {
  let data = [];
  let price = 45000;
  for (let i = 0; i < points; i++) {
    const change = (Math.random() - 0.5 + trend) * 500;
    price += change;
    data.push({ time: i, price: Math.abs(price) });
  }
  return data;
};

const COLORS = ['#fbbf24', '#3b82f6', '#10b981', '#ef4444', '#8b5cf6'];

// Helper to decompress GZIP+Base64
async function decompressPayload(base64) {
    try {
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));
        const decompressed = await new Response(stream).text();
        return JSON.parse(decompressed);
    } catch (e) {
        console.error("Decompression failed", e);
        return null;
    }
}

const CommandModal = ({ isOpen, onClose, t, command }) => {
    const [copied, setCopied] = useState(false);
    if (!isOpen) return null;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-md glass-panel rounded-2xl p-6 relative border border-green-500/30 shadow-[0_0_50px_rgba(34,197,94,0.1)]">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={20} /></button>
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500"><Terminal size={32} /></div>
                    <h2 className="text-2xl font-bold text-white mb-2">{t.cmd_title}</h2>
                    <p className="text-gray-400 text-sm">{t.cmd_desc}</p>
                </div>

                <div onClick={copyToClipboard} className="bg-black/50 border border-white/10 rounded-xl p-4 mb-6 cursor-pointer hover:border-green-500/50 transition-colors group relative overflow-hidden">
                    <div className="font-mono text-green-400 text-sm break-all">{command}</div>
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent"></div>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-white transition-colors">
                        {copied ? <span className="text-green-500 text-xs font-bold">{t.cmd_copied}</span> : <Copy size={16} />}
                    </div>
                </div>

                <button onClick={onClose} className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-lg font-bold text-white transition-all">Close</button>
            </motion.div>
        </div>
    );
};

const Header = ({ lang, setLang, isAdmin, setIsAdmin, t, username, onHistoryClick, mobileMenu, setMobileMenu, hasAdminPerm, isStatic }) => {
  const [langOpen, setLangOpen] = useState(false);
  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'cz', label: 'Čeština', flag: '🇨🇿' },
  ];
  const currentLangObj = languages.find(l => l.code === lang) || languages[0];

  return (
    <header className="h-16 border-b border-white/10 bg-white/5 backdrop-blur-md fixed top-0 w-full z-50 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button className="md:hidden text-white" onClick={() => setMobileMenu(!mobileMenu)}>
            <Menu size={24} />
        </button>
        <div className="w-8 h-8 rounded bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center font-bold text-black hidden md:flex">
          B
        </div>
        <span className="font-bold text-xl tracking-tight">bCrypto <span className="text-xs font-normal text-white/50 bg-white/10 px-1.5 py-0.5 rounded">2.1</span></span>
        {isStatic && <span className="ml-2 text-xs font-bold bg-purple-500/20 text-purple-400 px-2 py-1 rounded border border-purple-500/30 uppercase tracking-wide">Static</span>}
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {!isStatic && <button onClick={onHistoryClick} className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors hidden md:block">
            <History size={20} />
        </button>}

        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-2 bg-black/20 hover:bg-black/40 px-3 py-1.5 rounded-full border border-white/5 transition-all"
          >
            <span className="text-lg">{currentLangObj.flag}</span>
            <span className="text-sm font-medium hidden md:block">{currentLangObj.code.toUpperCase()}</span>
            <ChevronDown size={14} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {langOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-40 glass-panel rounded-lg overflow-hidden py-1"
              >
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 hover:bg-white/10 transition-colors ${lang === l.code ? 'bg-white/5 text-yellow-400' : 'text-gray-300'}`}
                  >
                    <span>{l.flag}</span>
                    {l.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="text-right hidden md:block">
            <div className="text-xs text-gray-400">{t.welcome}</div>
            <div className="text-sm font-bold flex items-center gap-1 justify-end">
              {username || "Guest"}
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-gray-700 border border-white/20 flex items-center justify-center overflow-hidden">
             <div className="font-bold text-gray-400">{username ? username.substring(0, 1).toUpperCase() : "?"}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

const WalletModal = ({ isOpen, onClose, t, balances, onTransfer }) => {
  const [mode, setMode] = useState('deposit');
  const [amount, setAmount] = useState('');
  if (!isOpen) return null;

  const handleTransferClick = () => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return;
    onTransfer(mode, val);
    setAmount('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-lg glass-panel rounded-2xl p-6 relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={20} />
        </button>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Wallet className="text-yellow-500" /> {t.wallet_title}</h2>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className={`p-4 rounded-xl border transition-all ${mode === 'deposit' ? 'bg-blue-500/10 border-blue-500/50' : 'bg-white/5 border-white/10'}`}>
            <div className="text-xs text-gray-400 mb-1">{t.wallet_source}</div>
            <div className="text-xl font-mono text-white">${balances.vault.toLocaleString()}</div>
          </div>
          <div className={`p-4 rounded-xl border transition-all ${mode === 'withdraw' ? 'bg-blue-500/10 border-blue-500/50' : 'bg-white/5 border-white/10'}`}>
            <div className="text-xs text-gray-400 mb-1">{t.wallet_dest}</div>
            <div className="text-xl font-mono text-white">${balances.exchange.toLocaleString()}</div>
          </div>
        </div>
        <div className="bg-black/20 rounded-xl p-1 flex mb-6">
          <button onClick={() => setMode('deposit')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'deposit' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>{t.wallet_deposit}</button>
          <button onClick={() => setMode('withdraw')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'withdraw' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>{t.wallet_withdraw}</button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2">{t.wallet_amount}</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-8 pr-4 text-white focus:outline-none focus:border-blue-500" placeholder="0.00" />
            </div>
          </div>
          <button onClick={handleTransferClick} className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg font-bold hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all">{t.wallet_transfer}</button>
        </div>
      </motion.div>
    </div>
  );
};

// Re-added HistoryModal just to be absolutely sure
const HistoryModal = ({ isOpen, onClose, t, history }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-2xl glass-panel rounded-2xl p-6 relative max-h-[80vh] flex flex-col">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={20} /></button>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><History className="text-purple-500" /> {t.history_title}</h2>
                <div className="overflow-y-auto pr-2 custom-scrollbar flex-1">
                    {history.length === 0 ? (
                        <div className="text-center text-gray-500 py-10">{t.history_empty}</div>
                    ) : (
                        <div className="space-y-2">
                            {history.map((tx, i) => (
                                <div key={i} className="p-3 bg-white/5 rounded-lg flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${tx.type === 'BUY' || tx.type === 'deposit' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                            {tx.type === 'BUY' || tx.type === 'deposit' ? <ArrowDownRight size={16} /> : <ArrowUpRight size={16} />}
                                        </div>
                                        <div>
                                            <div className="font-bold">{tx.type.toUpperCase()} {tx.coin}</div>
                                            <div className="text-xs text-gray-500">{tx.timestamp}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-mono">{tx.amount} {tx.coin}</div>
                                        <div className="text-xs text-gray-400">${tx.total.toFixed(2)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default function App() {
  const [lang, setLang] = useState('cz'); // Default to CZ for premium user
  const [isStatic, setIsStatic] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [currentCommand, setCurrentCommand] = useState('');

  const [hasWallet, setHasWallet] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [tradeAmount, setTradeAmount] = useState('');
  const [tradeMode, setTradeMode] = useState('buy');
  const [username, setUsername] = useState(null);
  const [accessCode, setAccessCode] = useState('');
  const [balances, setBalances] = useState({ vault: 0.00, exchange: 0.00 });
  const [portfolio, setPortfolio] = useState({ BTC: 0.0, ETH: 0.0, SOL: 0.0, BNB: 0.0, ADA: 0.0 });
  const [activeCoin, setActiveCoin] = useState('BTC');
  const [chartData, setChartData] = useState(generateChartData(50));
  const [prices, setPrices] = useState({ BTC: 0, ETH: 0, SOL: 0, BNB: 0, ADA: 0 });
  const [permissions, setPermissions] = useState({ admin: false });
  const t = TRANSLATIONS[lang];

  // Load Static Payload
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payload = params.get('payload');
    if (payload) {
        setIsStatic(true);
        decompressPayload(payload).then(data => {
            if (data) {
                if (data.user) setUsername(data.user.name);
                if (data.wallet && data.wallet.exists) {
                    setHasWallet(true);
                    setBalances({ vault: 0, exchange: data.wallet.balance || 0 }); // Static snapshot doesn't know Vault unless we add it
                    if (data.wallet.holdings) {
                        const port = {};
                        data.wallet.holdings.forEach(h => port[h.coin.toUpperCase()] = h.amount);
                        setPortfolio(port);
                    }
                } else {
                    setHasWallet(false);
                }
                if (data.market && data.market.prices) {
                    const pr = {};
                    const hist = {}; // Store history for charts
                    data.market.prices.forEach(p => {
                        pr[p.coin.toUpperCase()] = p.price;
                        if (p.history) {
                            hist[p.coin.toUpperCase()] = p.history.map((val, idx) => ({ time: idx, price: val }));
                        }
                    });
                    setPrices(pr);
                    // Set chart data if active coin has history
                    if (hist[activeCoin]) setChartData(hist[activeCoin]);
                    // Save history map to state if needed, or just rely on re-parsing/re-setting when activeCoin changes
                    // Ideally we save it. Let's create a state for it.
                    setStaticHistory(hist);
                }
            }
        });
    }
  }, []);

  const [staticHistory, setStaticHistory] = useState({});

  useEffect(() => {
      if (isStatic && staticHistory[activeCoin]) {
          setChartData(staticHistory[activeCoin]);
      } else if (!isStatic) {
          // Live mode logic...
      }
  }, [activeCoin, staticHistory, isStatic]);

  const refreshData = async () => {
      if (!username || isStatic) return;

      if (username === "DemoUser") {
          setHasWallet(true);
          setBalances({ vault: 50000, exchange: 10000 });
          setPortfolio({ BTC: 0.5, ETH: 10, SOL: 100, BNB: 5, ADA: 1000 });
          setPrices({ BTC: 45000, ETH: 3000, SOL: 150, BNB: 600, ADA: 1.2 });
          setPermissions({ admin: true });
          return;
      }

      try {
          // If PHP Bridge, use query param routing
          const url = isPhpBridge
            ? `${FULL_API_URL}?action=data&username=${username}`
            : `${FULL_API_URL}/data?username=${username}`;

          const res = await fetch(url);
          const data = await res.json();
          if (data.error) return;
          setHasWallet(data.hasWallet);
          setBalances({ vault: data.vaultBalance, exchange: data.exchangeBalance });
          if (data.portfolio) setPortfolio({ BTC: 0, ETH: 0, SOL: 0, BNB: 0, ADA: 0, ...data.portfolio });
          const newPrices = { ...prices };
          if (data.coins) data.coins.forEach(c => newPrices[c.symbol] = c.price);
          setPrices(newPrices);
          if (data.permissions) setPermissions(data.permissions);
      } catch (e) { console.error("API Error", e); }
  };

  useEffect(() => {
    if (username && !isStatic) {
        refreshData();
        const interval = setInterval(refreshData, 3000);
        return () => clearInterval(interval);
    }
  }, [username, isStatic]);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => {
        const lastPrice = prev[prev.length - 1].price;
        const change = (Math.random() - 0.5) * (lastPrice * 0.02);
        const newPrice = Math.max(100, lastPrice + change);
        return [...prev.slice(1), { time: prev[prev.length - 1].time + 1, price: newPrice }];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleTrade = async (type) => {
    const amount = parseFloat(tradeAmount);
    if (isNaN(amount) || amount <= 0) return alert('Invalid amount');

    if (isStatic) {
        const cmd = `/krypto market ${type} ${activeCoin} ${amount}`;
        setCurrentCommand(cmd);
        setCommandOpen(true);
        return;
    }

    if (username === "DemoUser") {
        alert("Success: Trade executed (Demo Mode)");
        setTradeAmount('');
        return;
    }

    try {
        const res = await fetch(`${FULL_API_URL}/trade`, {
            method: 'POST',
            body: JSON.stringify({ type, username, code: accessCode, coin: activeCoin, amount: amount })
        });
        const result = await res.json();
        if (result.success) { alert("Success: " + result.message); setTradeAmount(''); refreshData(); }
        else { alert("Error: " + result.message); }
    } catch (e) { alert("Network Error"); }
  };

  const handleWalletTransfer = async (type, amount) => {
      if (isStatic) {
          const cmd = `/krypto wallet ${type} ${amount}`;
          setCurrentCommand(cmd);
          setCommandOpen(true);
          return;
      }

      if (username === "DemoUser") {
          alert("Success: Transfer executed (Demo Mode)");
          return;
      }
      try {
        const res = await fetch(`${FULL_API_URL}/trade`, {
            method: 'POST',
            body: JSON.stringify({ type, username, code: accessCode, amount: amount })
        });
        const result = await res.json();
        if (result.success) { alert("Success: " + result.message); refreshData(); }
        else { alert("Error: " + result.message); }
    } catch (e) { alert("Network Error"); }
  };

  const handleInitWallet = async () => {
       if (isStatic) {
           setCurrentCommand("/krypto wallet create");
           setCommandOpen(true);
           return;
       }

       if (username === "DemoUser") {
           setHasWallet(true);
           return;
       }
       try {
        const res = await fetch(`${FULL_API_URL}/trade`, { method: 'POST', body: JSON.stringify({ type: 'init', username, code: accessCode }) });
        const result = await res.json();
        if (result.success) { setHasWallet(true); refreshData(); }
        else { alert("Error: " + result.message); }
    } catch (e) { alert("Network Error"); }
  };

  const handleLogin = (user, code) => {
      setUsername(user);
      setAccessCode(code);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userParam = params.get('user');
    const codeParam = params.get('code');
    if (userParam && codeParam && !isStatic) {
        handleLogin(userParam, codeParam);
    }
  }, [isStatic]);

  if (!username && !isStatic) return <Login onLogin={handleLogin} t={t} lang={lang} setLang={setLang} />;

  return (
    <div className="min-h-screen bg-background text-gray-200 bg-grid-pattern overflow-hidden relative font-sans">
      <Header lang={lang} setLang={setLang} isAdmin={isAdmin} setIsAdmin={setIsAdmin} t={t} username={username} onHistoryClick={() => setHistoryOpen(true)} mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} hasAdminPerm={permissions.admin} isStatic={isStatic} />

      {/* Static Mode Banner */}
      {isStatic && (
          <div className="fixed top-16 left-0 right-0 z-40 bg-purple-600/20 backdrop-blur text-center py-1 text-xs text-purple-200 border-b border-purple-500/30">
              {t.static_desc}
          </div>
      )}

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
          {mobileMenu && (
              <motion.div initial={{x: -300}} animate={{x: 0}} exit={{x: -300}} className="fixed inset-y-0 left-0 z-50 w-64 glass-panel p-4 md:hidden">
                  <h2 className="text-xl font-bold mb-6">Menu</h2>
                  <div className="space-y-4">
                      <button onClick={() => { setHistoryOpen(true); setMobileMenu(false); }} className="w-full text-left py-2 px-4 rounded hover:bg-white/10 flex items-center gap-2"><History size={18}/> {t.nav_history}</button>
                      <button onClick={() => { setWalletOpen(true); setMobileMenu(false); }} className="w-full text-left py-2 px-4 rounded hover:bg-white/10 flex items-center gap-2"><Wallet size={18}/> {t.nav_wallet}</button>
                  </div>
              </motion.div>
          )}
      </AnimatePresence>

      <main className={`pt-24 px-4 pb-6 max-w-7xl mx-auto h-screen flex flex-col ${isStatic ? 'mt-4' : ''}`}>
        {!hasWallet ? (
          <div className="absolute inset-0 z-40 backdrop-blur-md flex items-center justify-center bg-black/40">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-panel p-8 rounded-2xl max-w-md text-center border-t border-yellow-500/50 shadow-[0_0_50px_rgba(234,179,8,0.1)]">
              <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-500"><Lock size={40} /></div>
              <h1 className="text-3xl font-bold text-white mb-2">{t.init_title}</h1>
              <p className="text-gray-400 mb-8">{t.init_desc}</p>
              <button onClick={handleInitWallet} className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg font-bold text-black hover:scale-[1.02] transition-transform">{t.init_btn}</button>
            </motion.div>
          </div>
        ) : null}

        <div className={`grid grid-cols-1 md:grid-cols-12 gap-6 h-full transition-all duration-500 ${!hasWallet ? 'blur-sm grayscale' : ''}`}>
           {/* MARKETS */}
           <div className="md:col-span-3 glass-panel rounded-2xl p-4 flex flex-col h-48 md:h-[85vh] order-2 md:order-1">
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4">{t.market_watch}</h3>
            <div className="space-y-2 overflow-y-auto pr-2 custom-scrollbar flex-1">
              {['BTC', 'ETH', 'SOL', 'BNB', 'ADA'].map((coin, i) => (
                <div key={coin} onClick={() => setActiveCoin(coin)} className={`p-3 rounded-xl cursor-pointer transition-all flex items-center justify-between group ${activeCoin === coin ? 'bg-white/10 border-white/20' : 'hover:bg-white/5 border border-transparent'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${coin === 'BTC' ? 'bg-orange-500' : 'bg-blue-600'}`}>{coin[0]}</div>
                    <div className="font-bold">{coin}</div>
                  </div>
                  <div className="text-right"><div className="font-mono text-sm">${(prices[coin] || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}</div></div>
                </div>
              ))}
            </div>
          </div>

          {/* CHART */}
          <div className="md:col-span-6 flex flex-col gap-6 order-1 md:order-2">
            <div className="glass-panel rounded-2xl p-6 flex-1 relative flex flex-col min-h-[400px]">
              <div className="flex items-center justify-between mb-6">
                <div>
                   <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{t.market_chart_title}</div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">{t[`coin_${activeCoin.toLowerCase()}`] || activeCoin} <span className="text-gray-500 text-lg font-normal">/ USD</span></h2>
                  <div className="text-3xl font-mono text-white mt-1">${(prices[activeCoin] || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                </div>
                <div className="flex bg-black/30 rounded-lg p-1">
                  {['1H', '12H', '1D', '7D'].map((tf) => (<button key={tf} className="px-3 py-1 text-xs font-medium rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors">{t[`tab_${tf.toLowerCase()}`] || tf}</button>))}
                </div>
              </div>
              <div className="flex-1 w-full min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs><linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3}/><stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/></linearGradient></defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="time" hide />
                    <YAxis domain={['auto', 'auto']} hide />
                    <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }} itemStyle={{ color: '#fbbf24' }} formatter={(value) => [`$${value.toFixed(2)}`, 'Price']} />
                    <Area type="monotone" dataKey="price" stroke="#fbbf24" strokeWidth={2} fillOpacity={1} fill="url(#colorPrice)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* TRADING */}
          <div className="md:col-span-3 flex flex-col gap-6 order-3">
             <div className="glass-panel rounded-2xl p-5 bg-gradient-to-br from-white/5 to-white/0">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">{t.trade_available}</div>
                  <div className="text-2xl font-mono text-white mt-1">${balances.exchange.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                </div>
                <button onClick={() => setWalletOpen(true)} className="p-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 rounded-lg transition-colors"><Wallet size={20} /></button>
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-5 flex-1 flex flex-col">
              <div className="flex border-b border-white/10 mb-6">
                <button onClick={() => setTradeMode('buy')} className={`flex-1 pb-3 transition-colors border-b-2 ${tradeMode === 'buy' ? 'text-green-400 font-bold border-green-400' : 'text-gray-500 border-transparent hover:text-white'}`}>{t.trade_buy}</button>
                <button onClick={() => setTradeMode('sell')} className={`flex-1 pb-3 transition-colors border-b-2 ${tradeMode === 'sell' ? 'text-red-400 font-bold border-red-400' : 'text-gray-500 border-transparent hover:text-white'}`}>{t.trade_sell}</button>
              </div>
               <div className="space-y-4 flex-1">
                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span>{t.trade_amount} ({activeCoin})</span>
                    <span onClick={() => { if (tradeMode === 'buy') { setTradeAmount(String((balances.exchange / (prices[activeCoin] || 1)) * 0.99)); } else { setTradeAmount(String(portfolio[activeCoin] || 0)); } }} className="text-blue-400 cursor-pointer hover:underline">{t.trade_max}</span>
                  </div>
                  <input type="number" value={tradeAmount} onChange={(e) => setTradeAmount(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-green-500 transition-colors" placeholder="0.00" />
                </div>
                <div className="py-4 border-t border-b border-white/5 space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-gray-400">{t.trade_fee} (0.1%)</span><span>${(parseFloat(tradeAmount || 0) * (prices[activeCoin] || 0) * 0.001).toFixed(2)}</span></div>
                  <div className="flex justify-between text-sm font-bold text-white"><span>{t.trade_total}</span><span>${(parseFloat(tradeAmount || 0) * (prices[activeCoin] || 0)).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                </div>
                <button onClick={() => handleTrade(tradeMode)} className={`w-full py-4 font-bold rounded-lg transition-all mt-auto ${tradeMode === 'buy' ? 'bg-green-500 hover:bg-green-600 text-black shadow-[0_0_20px_rgba(34,197,94,0.2)]' : 'bg-red-500 hover:bg-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.2)]'}`}>{tradeMode === 'buy' ? t.trade_submit_buy : t.trade_submit_sell} {activeCoin}</button>
              </div>
            </div>

             <div className="glass-panel rounded-2xl p-4">
               <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-4">Your Holdings</h4>
               <div className="h-40 relative mb-4">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={Object.keys(portfolio).map(k => ({ name: k, value: portfolio[k] * (prices[k] || 0) }))} innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                        {Object.keys(portfolio).map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff', fontSize: '12px' }} formatter={(value) => `$${value.toFixed(2)}`} />
                    </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                      <div className="text-[10px] text-gray-500">Total</div>
                      <div className="text-xs font-bold text-white">${Object.keys(portfolio).reduce((acc, k) => acc + (portfolio[k] * (prices[k] || 0)), 0).toLocaleString(undefined, { maximumFractionDigits: 0, compactDisplay: "short", notation: "compact" })}</div>
                    </div>
                 </div>
               </div>
               <div className="flex justify-between items-center border-t border-white/10 pt-3">
                  <span className="font-bold text-sm flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[Object.keys(portfolio).indexOf(activeCoin) % COLORS.length] }}></div>{activeCoin}</span>
                  <span className="font-mono text-sm">{(portfolio[activeCoin] || 0).toFixed(4)}</span>
               </div>
            </div>
          </div>
        </div>
      </main>

      <WalletModal isOpen={walletOpen} onClose={() => setWalletOpen(false)} t={t} balances={balances} onTransfer={handleWalletTransfer} />
      <HistoryModal isOpen={historyOpen} onClose={() => setHistoryOpen(false)} t={t} history={historyData} />
      <CommandModal isOpen={commandOpen} onClose={() => setCommandOpen(false)} t={t} command={currentCommand} />
    </div>
  );
}
