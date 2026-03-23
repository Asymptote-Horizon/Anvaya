import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const QUESTIONS = [
  {
    step: 1,
    q: 'How do you best experience new information?',
    options: [
      { icon: 'auto_stories', label: 'Visuals & diagrams', col: 7 },
      { icon: 'menu_book',    label: 'Text & reading',     col: 5 },
      { icon: 'mic',          label: 'Audio & listening',  col: 5 },
      { icon: 'all_inclusive',label: 'A mix of everything',col: 7 },
    ],
  },
  {
    step: 2,
    q: 'What sparks your curiosity the most?',
    options: [
      { icon: 'science',        label: 'Science & Math',      col: 6 },
      { icon: 'code',           label: 'Tech & Coding',       col: 6 },
      { icon: 'palette',        label: 'Arts & Creativity',   col: 6 },
      { icon: 'history_edu',    label: 'History & Culture',   col: 6 },
    ],
  },
  {
    step: 3,
    q: 'What pace feels right for your learning style?',
    options: [
      { icon: 'bolt',      label: 'Quick bursts',       col: 6 },
      { icon: 'self_improvement', label: 'Deep dives',  col: 6 },
      { icon: 'schedule',  label: 'At my own pace',     col: 6 },
      { icon: 'group',     label: 'With others',        col: 6 },
    ],
  },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    // Trigger fade-in on mount / step change
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, [step]);

  const handleNext = () => {
    if (step < QUESTIONS.length - 1) {
      setSelected(null);
      setStep(s => s + 1);
    } else {
      // Show loading overlay then navigate
      setTransitioning(true);
      setTimeout(() => navigate('/dashboard'), 2200);
    }
  };

  const q = QUESTIONS[step];

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg, rgba(225,224,255,0.4) 0%, rgba(254,214,255,0.3) 100%), var(--surface)', fontFamily:"'Plus Jakarta Sans',sans-serif", display:'flex', flexDirection:'column' }}>
      {/* Loading overlay */}
      {transitioning && (
        <div style={{ position:'fixed', inset:0, zIndex:999, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(248,249,250,0.85)', backdropFilter:'blur(32px)' }}>
          <div style={{ textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:'2rem' }}>
            <div style={{ position:'relative', width:'6rem', height:'6rem' }}>
              <div style={{ position:'absolute', inset:0, border:'4px solid rgba(247,191,14,0.2)', borderRadius:'50%', animation:'ping 1.5s cubic-bezier(0,0,0.2,1) infinite' }} />
              <div style={{ position:'absolute', inset:'1rem', border:'4px solid #f6bf0e', borderTopColor:'transparent', borderRadius:'50%', animation:'spin 1s linear infinite' }} />
              <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span className="material-symbols-outlined" style={{ color:'#f6bf0e', fontSize:'2.5rem' }}>auto_fix_high</span>
              </div>
            </div>
            <div>
              <p style={{ fontFamily:"'Noto Serif',serif", fontSize:'1.5rem', fontWeight:700, color:'#020229', marginBottom:'0.5rem' }}>Tailoring your experience...</p>
              <p style={{ color:'var(--on-surface-variant)' }}>Setting up your learning space.</p>
            </div>
          </div>
        </div>
      )}

      {/* Progress dots */}
      <header style={{ paddingTop:'3rem', paddingBottom:'1.5rem', display:'flex', justifyContent:'center', alignItems:'center', gap:'1.5rem' }}>
        {QUESTIONS.map((_, i) => (
          <div key={i} style={{ width: i === step ? '1rem' : '0.75rem', height: i === step ? '1rem' : '0.75rem', borderRadius:'50%', background: i <= step ? 'linear-gradient(135deg,#775a00,#f6bf0e)' : 'var(--surface-container-highest)', boxShadow: i === step ? '0 0 15px rgba(242,187,5,0.6)' : 'none', transition:'all 0.4s ease' }} />
        ))}
      </header>

      {/* Question */}
      <main style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'1.5rem', maxWidth:'56rem', margin:'0 auto', width:'100%' }}>
        <section
          key={step}
          style={{
            width:'100%', textAlign:'center',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition:'opacity 0.55s ease, transform 0.55s ease',
          }}
        >
          <div style={{ marginBottom:'3rem' }}>
            <span style={{ fontSize:'0.75rem', fontWeight:600, letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--on-surface-variant)' }}>
              Step {step + 1} of {QUESTIONS.length}
            </span>
            <h1 style={{ fontFamily:"'Noto Serif',serif", fontSize:'clamp(1.75rem,4vw,3rem)', fontWeight:700, color:'#020229', letterSpacing:'-0.02em', lineHeight:1.25, marginTop:'0.75rem', maxWidth:'40rem', margin:'0.75rem auto 0' }}>
              {q.q}
            </h1>
          </div>

          {/* Options grid */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(12, 1fr)', gap:'1.5rem', width:'100%', marginBottom:'3rem' }}>
            {q.options.map(({ icon, label, col }, i) => {
              const isSelected = selected === i;
              return (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  style={{
                    gridColumn:`span ${col}`,
                    background: isSelected ? 'rgba(255,255,255,0.95)' : 'rgba(248,249,250,0.65)',
                    backdropFilter:'blur(16px)',
                    border: isSelected ? '2px solid rgba(242,187,5,0.6)' : '1px solid rgba(200,197,207,0.15)',
                    borderRadius:'var(--radius-lg)',
                    padding:'2rem',
                    textAlign:'left',
                    cursor:'pointer',
                    transition:'all 0.3s ease',
                    transform: isSelected ? 'translateY(-4px)' : 'translateY(0)',
                    boxShadow: isSelected ? '0 8px 24px rgba(242,187,5,0.15)' : '0 2px 8px rgba(0,0,0,0.04)',
                    display:'flex',
                    alignItems:'center',
                    gap:'1.5rem',
                  }}
                  onMouseEnter={e=>{if(!isSelected)e.currentTarget.style.transform='translateY(-4px)'}}
                  onMouseLeave={e=>{if(!isSelected)e.currentTarget.style.transform='translateY(0)'}}
                >
                  <div style={{ width:'3rem', height:'3rem', borderRadius:'50%', background: isSelected ? '#fef3c7' : '#e1e0ff', display:'flex', alignItems:'center', justifyContent:'center', color: isSelected ? '#d97706' : '#5a5b84', flexShrink:0 }}>
                    <span className="material-symbols-outlined" style={{ fontSize:'1.5rem' }}>{icon}</span>
                  </div>
                  <span style={{ fontSize:'1.125rem', fontWeight:600, color:'#020229' }}>{label}</span>
                  {isSelected && <span className="material-symbols-outlined" style={{ marginLeft:'auto', color:'#d97706' }}>check_circle</span>}
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <button className="btn-amber" onClick={handleNext} style={{ display:'inline-flex', opacity: selected !== null ? 1 : 0.5 }}>
            {step < QUESTIONS.length - 1 ? 'Next Step' : 'Begin Learning'}
            <span className="material-symbols-outlined">trending_flat</span>
          </button>
        </section>
      </main>

      <footer style={{ padding:'2rem', textAlign:'center' }}>
        <p style={{ fontSize:'0.875rem', color:'rgba(71,70,78,0.5)', fontWeight:500 }}>Anvaya Learning Sanctuary © 2025</p>
      </footer>

      {/* Decorative blobs */}
      <div style={{ position:'fixed', bottom:'-6rem', right:'-6rem', width:'24rem', height:'24rem', background:'rgba(2,2,41,0.04)', borderRadius:'50%', filter:'blur(100px)', zIndex:-1 }} />
      <div style={{ position:'fixed', top:'50%', left:'-6rem', width:'16rem', height:'16rem', background:'rgba(119,90,0,0.04)', borderRadius:'50%', filter:'blur(80px)', zIndex:-1 }} />
    </div>
  );
}
