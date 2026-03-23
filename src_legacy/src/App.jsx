import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef, createContext, useContext } from 'react';
import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import ContentReaderPage from './pages/ContentReaderPage';
import SettingsPage from './pages/SettingsPage';
import ChatbotPanel from './components/ChatbotPanel';

// ─── Settings context ───────────────────────────────────────────
export const SettingsContext = createContext({});

// ─── Keyboard shortcut listener ─────────────────────────────────
function KeyboardShortcuts({ setChatOpen }) {
  const navigate = useNavigate();
  const keyBuffer = useRef([]);
  const keyTimer = useRef(null);

  useEffect(() => {
    const handleKey = (e) => {
      // Ignore when typing in inputs
      if (['INPUT','TEXTAREA'].includes(e.target.tagName)) return;
      const key = e.key.toLowerCase();
      keyBuffer.current.push({ key, time: Date.now() });
      // keep only last 2 within 600ms
      keyBuffer.current = keyBuffer.current.filter(k => Date.now() - k.time < 600);

      const keys = keyBuffer.current.map(k => k.key);
      if (keys.length >= 2) {
        const last2 = keys.slice(-2);
        if (last2[0] === 'j' && last2[1] === 'j') {
          setChatOpen(true);
          keyBuffer.current = [];
        }
        if (last2[0] === 'f' && last2[1] === 'f') {
          navigate(-1);
          keyBuffer.current = [];
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [navigate, setChatOpen]);

  return null;
}

// ─── App Shell ──────────────────────────────────────────────────
function AppShell() {
  const [chatOpen, setChatOpen] = useState(false);
  const [settings, setSettings] = useState({
    fontSize: 16,
    lineHeight: 1.6,
    letterSpacing: 0.02,
    contrast: 'normal', // 'normal' | 'high' | 'dark' | 'warm'
    spacing: 1,
  });

  // Apply settings as CSS vars on root
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--font-size-base', settings.fontSize + 'px');
    root.style.setProperty('--line-height', settings.lineHeight);
    root.style.setProperty('--letter-spacing', settings.letterSpacing + 'em');
    root.style.setProperty('--spacing-scale', settings.spacing);
    // contrast / theme modes
    root.classList.remove('dark','high-contrast','warm-mode');
    if (settings.contrast === 'dark') root.classList.add('dark');
    if (settings.contrast === 'high') root.classList.add('high-contrast');
    if (settings.contrast === 'warm') root.classList.add('warm-mode');
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      <KeyboardShortcuts setChatOpen={setChatOpen} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/dashboard" element={<DashboardPage onChatOpen={() => setChatOpen(true)} />} />
        <Route path="/reader" element={<ContentReaderPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
      {/* Global chatbot panel */}
      {chatOpen && (
        <>
          <div className="page-bg-overlay" onClick={() => setChatOpen(false)} />
          <ChatbotPanel onClose={() => setChatOpen(false)} />
        </>
      )}
    </SettingsContext.Provider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
