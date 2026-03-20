import { useNavigate, useLocation } from 'react-router-dom';

export default function TopNav({ onChatOpen }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="top-nav">
      <div className="top-nav-inner">
        <a href="/" onClick={e => { e.preventDefault(); navigate('/'); }} className="nav-logo">
          <div className="logo-dot">
            <span className="material-symbols-outlined" style={{ fontSize:'1rem', color:'#020229', fontVariationSettings:"'FILL' 1" }}>light_mode</span>
          </div>
          Anvaya
        </a>

        <div style={{ display:'flex', alignItems:'center', gap:'1.5rem' }}>
          <a
            href="/dashboard"
            onClick={e => { e.preventDefault(); navigate('/dashboard'); }}
            style={{ fontWeight: pathname === '/dashboard' ? 700 : 500, color: pathname === '/dashboard' ? '#d97706' : 'rgba(2,2,41,0.6)', textDecoration:'none', fontFamily:"'Noto Serif', serif", fontSize:'1rem' }}
          >Home</a>
          <div style={{ display:'flex', gap:'0.5rem' }}>
            <button onClick={() => navigate('/settings')} style={{ background:'none',border:'none',cursor:'pointer',padding:'0.5rem',borderRadius:'50%',transition:'background 0.2s' }}
              onMouseEnter={e=>e.currentTarget.style.background='#fef3c7'}
              onMouseLeave={e=>e.currentTarget.style.background='none'}
            >
              <span className="material-symbols-outlined" style={{ color:'#1e1b4b' }}>settings</span>
            </button>
            <button style={{ background:'none',border:'none',cursor:'pointer',padding:'0.5rem',borderRadius:'50%',transition:'background 0.2s' }}
              onMouseEnter={e=>e.currentTarget.style.background='#fef3c7'}
              onMouseLeave={e=>e.currentTarget.style.background='none'}
            >
              <span className="material-symbols-outlined" style={{ color:'#1e1b4b' }}>account_circle</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
