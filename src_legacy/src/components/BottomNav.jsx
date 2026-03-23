import { useNavigate, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { icon: 'auto_stories', label: 'Read', path: '/reader' },
  { icon: 'mic',          label: 'Speak', path: '/' },
  { icon: 'settings_accessibility', label: 'Tools', path: '/settings' },
  { icon: 'smart_toy',   label: 'Help', path: null }, // triggers chatbot
];

export default function BottomNav({ onChatOpen }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map(({ icon, label, path }) => {
        const active = path && pathname === path;
        return (
          <button
            key={label}
            className={`bottom-nav-item ${active ? 'active' : ''}`}
            onClick={() => path ? navigate(path) : onChatOpen?.()}
          >
            <span className="material-symbols-outlined">{icon}</span>
            <span>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
