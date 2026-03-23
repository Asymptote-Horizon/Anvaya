import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const INDIAN_LANGUAGES = [
  'English','हिन्दी (Hindi)','বাংলা (Bengali)','తెలుగు (Telugu)',
  'मराठी (Marathi)','தமிழ் (Tamil)','ગુજરાતી (Gujarati)',
  'ಕನ್ನಡ (Kannada)','ਪੰਜਾਬੀ (Punjabi)','മലയാളം (Malayalam)',
  'ओडिया (Odia)','অসমীয়া (Assamese)','मैथिली (Maithili)',
];

const HINDI_PHRASE = 'जी हाँ, मुझे हिंदी मे सीखना है.';

export default function LandingPage() {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const [showMicPulse, setShowMicPulse] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [selectedLang, setSelectedLang] = useState('हिन्दी (Hindi)');
  const [langToastHidden, setLangToastHidden] = useState(false);
  const typingRef = useRef(null);
  const dropRef = useRef(null);

  // Hide language toast after 3s
  useEffect(() => {
    const t = setTimeout(() => setLangToastHidden(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // Typing effect + mic pulse after 30s
  useEffect(() => {
    const triggerTimer = setTimeout(() => {
      setShowCursor(true);
      setShowMicPulse(true);
      let i = 0;
      typingRef.current = setInterval(() => {
        setTypedText(HINDI_PHRASE.slice(0, i + 1));
        i++;
        if (i >= HINDI_PHRASE.length) clearInterval(typingRef.current);
      }, 80);
    }, 30000);
    return () => { clearTimeout(triggerTimer); clearInterval(typingRef.current); };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const h = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setShowLangDropdown(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const handleLangSelect = (lang) => {
    setSelectedLang(lang);
    setShowLangDropdown(false);
    if (lang === 'English') {
      setTimeout(() => navigate('/onboarding'), 400);
    }
  };

  return (
    <div className="bg-flowing" style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
      {/* Language toast */}
      {!langToastHidden && (
        <div style={{ position:'fixed', top:'2rem', left:'50%', transform:'translateX(-50%)', zIndex:60 }}>
          <div className="glass bounce" style={{ padding:'0.75rem 1.5rem', borderRadius:'999px', boxShadow:'0 10px 30px rgba(0,0,0,0.06)', display:'flex', alignItems:'center', gap:'0.75rem' }}>
            <span style={{ fontSize:'1.25rem' }}>🌐</span>
            <span style={{ fontSize:'0.875rem', fontWeight:500, letterSpacing:'0.03em' }}>Language detected: {selectedLang}</span>
          </div>
        </div>
      )}

      {/* Top nav */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:50, padding:'1rem 1.5rem 0' }}>
        <div className="glass" style={{ maxWidth:'64rem', margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0.5rem 1.5rem', borderRadius:'999px', boxShadow:'0 20px 40px -10px rgba(0,0,0,0.04)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
            <div style={{ width:'2rem',height:'2rem',borderRadius:'50%',background:'linear-gradient(135deg,#775a00,#f6bf0e)',boxShadow:'0 0 12px rgba(242,187,5,0.5)',display:'flex',alignItems:'center',justifyContent:'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize:'1rem',color:'#020229',fontVariationSettings:"'FILL' 1" }}>light_mode</span>
            </div>
            <span style={{ fontFamily:"'Noto Serif',serif",fontSize:'1.5rem',fontWeight:700,color:'#1e1b4b',textShadow:'0 0 8px rgba(242,187,5,0.4)' }}>Anvaya</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'1.5rem' }}>
            {/* Language selector */}
            <div ref={dropRef} style={{ position:'relative' }}>
              <button onClick={()=>setShowLangDropdown(v=>!v)}
                style={{ display:'flex',alignItems:'center',gap:'0.375rem',background:'none',border:'1px solid rgba(200,197,207,0.3)',borderRadius:'999px',padding:'0.375rem 0.875rem',cursor:'pointer',fontSize:'0.875rem',color:'#1e1b4b',fontWeight:500,transition:'background 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.5)'}
                onMouseLeave={e=>e.currentTarget.style.background='none'}
              >
                <span style={{ fontSize:'1rem' }}>🌐</span>
                <span style={{ maxWidth:'120px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{selectedLang}</span>
                <span className="material-symbols-outlined" style={{ fontSize:'1rem' }}>expand_more</span>
              </button>
              {showLangDropdown && (
                <div style={{ position:'absolute', top:'calc(100% + 0.5rem)', right:0, background:'rgba(255,255,255,0.95)', backdropFilter:'blur(20px)', borderRadius:'var(--radius)', boxShadow:'0 20px 40px rgba(0,0,0,0.1)', border:'1px solid rgba(200,197,207,0.2)', minWidth:'200px', maxHeight:'280px', overflowY:'auto', zIndex:100 }} className="no-scrollbar">
                  {INDIAN_LANGUAGES.map(lang => (
                    <button key={lang} onClick={()=>handleLangSelect(lang)}
                      style={{ display:'block',width:'100%',padding:'0.75rem 1rem',textAlign:'left',background:selectedLang===lang?'#fef3c7':'none',border:'none',cursor:'pointer',fontSize:'0.875rem',color:'#191c1d',fontWeight:selectedLang===lang?600:400,transition:'background 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.background='#fef3c7'}
                      onMouseLeave={e=>e.currentTarget.style.background=selectedLang===lang?'#fef3c7':'none'}
                    >
                      {lang === 'English' && <span style={{ fontSize:'0.75rem',background:'#d97706',color:'#fff',borderRadius:'999px',padding:'1px 6px',marginRight:'0.5rem',fontWeight:700 }}>→ Proceed</span>}
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <a href="#" style={{ color:'#d97706',fontWeight:700,fontFamily:"'Noto Serif',serif",fontSize:'1rem',textDecoration:'none' }}>Home</a>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main style={{ position:'relative', zIndex:10, width:'100%', maxWidth:'56rem', padding:'1.5rem', textAlign:'center', marginTop:'5rem' }}>
        <div className="glass" style={{ borderRadius:'var(--radius-lg)', padding:'clamp(3rem,8vw,5rem)', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column', alignItems:'center' }}>
          {/* Branding */}
          <div style={{ marginBottom:'3rem' }}>
            <h1 style={{ fontFamily:"'Noto Serif',serif", fontSize:'clamp(2.5rem,6vw,4.5rem)', fontWeight:700, color:'#020229', letterSpacing:'-0.03em', marginBottom:'1.5rem', lineHeight:1.15 }}>
              Every mind learns differently.{' '}
              <span style={{ color:'var(--secondary)' }}>Anvaya</span> speaks yours.
            </h1>
            <p style={{ fontSize:'clamp(1rem,2vw,1.25rem)', color:'var(--on-surface-variant)', maxWidth:'40rem', margin:'0 auto', lineHeight:1.7 }}>
              A personalised learning portal — powered by your superpower.
            </p>
          </div>

          {/* Typing display */}
          <div style={{ width:'100%', maxWidth:'28rem', marginBottom:'3rem' }}>
            <div style={{ background:'rgba(243,244,245,0.5)', borderRadius:'var(--radius)', padding:'1.5rem', minHeight:'5rem', display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid rgba(200,197,207,0.1)' }}>
              <span style={{ fontFamily:"'Noto Serif',serif", fontSize:'clamp(1.25rem,3vw,1.75rem)', color:'#020229' }}>
                {typedText || <span style={{ color:'rgba(2,2,41,0.3)', fontStyle:'italic' }}>Select English above to begin your journey...</span>}
                {showCursor && typedText.length < HINDI_PHRASE.length && (
                  <span style={{ borderRight:'2px solid #020229', marginLeft:'2px', animation:'blink 1s step-end infinite', display:'inline-block' }}>&zwnj;</span>
                )}
              </span>
            </div>
          </div>

          {/* CTA */}
          <button className="btn-primary" onClick={() => navigate('/onboarding')}>
            <span>Begin</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>

          {/* Decorative blurs */}
          <div style={{ position:'absolute', top:'-6rem', right:'-6rem', width:'16rem', height:'16rem', background:'rgba(119,90,0,0.08)', borderRadius:'50%', filter:'blur(80px)', pointerEvents:'none' }} />
          <div style={{ position:'absolute', bottom:'-6rem', left:'-6rem', width:'16rem', height:'16rem', background:'rgba(2,2,41,0.04)', borderRadius:'50%', filter:'blur(80px)', pointerEvents:'none' }} />
        </div>
      </main>

      {/* Voice / Mic pulse */}
      <footer style={{ position:'fixed', bottom:0, left:0, width:'100%', zIndex:40, display:'flex', flexDirection:'column', alignItems:'center', padding:'1.5rem 1.5rem 3rem' }}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'1rem', marginBottom:'2rem' }}>
          <div style={{ position:'relative' }}>
            {showMicPulse && <>
              <div style={{ position:'absolute', inset:0, background:'rgba(247,191,14,0.2)', borderRadius:'50%', transform:'scale(1.5)', animation:'ping 1.5s cubic-bezier(0,0,0.2,1) infinite' }} />
              <div style={{ position:'absolute', inset:0, background:'rgba(247,191,14,0.35)', borderRadius:'50%', transform:'scale(1.25)', animation:'pulse 2s infinite' }} />
            </>}
            <div style={{ position:'relative', background:'linear-gradient(135deg,#775a00,#f6bf0e)', color:'#020229', width:'4rem', height:'4rem', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 8px 24px rgba(119,90,0,0.3)', ...(showMicPulse ? { animation:'micPulse 1.5s ease-out infinite' } : {}) }}>
              <span className="material-symbols-outlined" style={{ fontSize:'1.75rem', fontVariationSettings:"'FILL' 1" }}>mic</span>
            </div>
          </div>
          <span style={{ fontSize:'0.75rem', fontWeight:500, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(71,70,78,0.6)', animation:showMicPulse?'pulse 2s infinite':undefined }}>
            {showMicPulse ? 'Listening... speak to begin' : 'Tap to speak'}
          </span>
        </div>

        {/* Bottom nav bar */}
        <div style={{ width:'100%', maxWidth:'28rem', background:'rgba(255,255,255,0.85)', backdropFilter:'blur(24px)', borderRadius:'999px', display:'flex', justifyContent:'space-around', alignItems:'center', padding:'0.75rem 1.5rem', boxShadow:'0 -10px 40px rgba(0,0,0,0.03)', border:'1px solid rgba(200,197,207,0.1)' }}>
          {[{icon:'auto_stories',label:'Read'},{icon:'mic',label:'Speak'},{icon:'settings_accessibility',label:'Tools'},{icon:'smart_toy',label:'Help'}].map(({icon,label},i) => (
            <div key={label} style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:'2px',padding:'0.5rem 1.25rem',borderRadius:'999px',...(i===0?{background:'#fef3c7',color:'#78350f',animation:'pulse 2s infinite'}:{color:'rgba(2,2,41,0.4)'}) }}>
              <span className="material-symbols-outlined">{icon}</span>
              <span style={{ fontSize:'10px', fontWeight:500 }}>{label}</span>
            </div>
          ))}
        </div>
      </footer>

      {/* Background blobs */}
      <div style={{ position:'fixed', top:'25%', left:'-5rem', width:'24rem', height:'24rem', background:'rgba(2,2,41,0.04)', borderRadius:'50%', filter:'blur(120px)', zIndex:-1 }} />
      <div style={{ position:'fixed', bottom:'25%', right:'-5rem', width:'24rem', height:'24rem', background:'rgba(119,90,0,0.08)', borderRadius:'50%', filter:'blur(120px)', zIndex:-1 }} />
    </div>
  );
}
