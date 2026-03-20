import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// YouTube video URL — set video ID here. Default: "How AI is changing education" TED talk.
// Replace YOUTUBE_VIDEO_ID with any YouTube video ID you'd like to embed.
const YOUTUBE_VIDEO_ID = 'aircAruvnKk'; // "How AI Could Empower Any Business" (Andrew Ng, TED)


const CAPTIONS = [
  'Artificial intelligence is reshaping every industry on the planet...',
  'From healthcare diagnostics to personalised learning experiences...',
  'Neural networks can now process information at speeds beyond human imagination...',
  'Every student deserves access to education that speaks their language...',
  'Anvaya adapts to your unique learning style, not the other way around...',
  'The future of learning is inclusive, adaptive, and powered by your superpower...',
];

const CAPTION_TICKER = CAPTIONS.join('   ✦   ') + '   ✦   ' + CAPTIONS.join('   ✦   ') + '   ✦   ';

export default function ContentReaderPage() {
  const navigate = useNavigate();
  const [captionIdx, setCaptionIdx] = useState(0);
  const [captionVisible, setCaptionVisible] = useState(true);
  const [handPose, setHandPose] = useState('idle'); // idle | A | B | C cycling
  const handTimer = useRef(null);

  // Caption cycling with crossfade
  useEffect(() => {
    const t = setInterval(() => {
      setCaptionVisible(false);
      setTimeout(() => {
        setCaptionIdx(i => (i + 1) % CAPTIONS.length);
        setCaptionVisible(true);
      }, 400);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  // Silhouette hand-pose cycling
  const poses = ['🤟','👋','🤜','✌️','🖐️'];
  const [poseIdx, setPoseIdx] = useState(0);
  useEffect(() => {
    handTimer.current = setInterval(() => setPoseIdx(i => (i+1) % poses.length), 2200);
    return () => clearInterval(handTimer.current);
  }, []);

  return (
    <div style={{ background:'var(--surface)', minHeight:'100vh', display:'flex', flexDirection:'column' }}>
      {/* Top nav */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:50, padding:'1rem 1.5rem 0' }}>
        <div className="glass" style={{ maxWidth:'64rem', margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0.5rem 1.5rem', borderRadius:'999px', boxShadow:'0 20px 40px -10px rgba(0,0,0,0.04)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
            <button onClick={()=>navigate(-1)} style={{ width:'2.5rem', height:'2.5rem', borderRadius:'50%', background:'#fef3c7', color:'#78350f', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'transform 0.2s' }}
              onMouseEnter={e=>e.currentTarget.style.transform='scale(1.05)'}
              onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div>
              <span style={{ fontSize:'0.75rem', color:'rgba(2,2,41,0.55)', fontWeight:500 }}>Anvaya Reader</span>
              <div style={{ display:'flex', gap:'0.5rem', fontSize:'0.875rem', fontFamily:"'Noto Serif',serif" }}>
                <span style={{ color:'rgba(2,2,41,0.4)' }}>Library</span>
                <span style={{ color:'rgba(2,2,41,0.4)' }}>/</span>
                <span style={{ color:'#1e1b4b', fontWeight:700 }}>AI Technology</span>
              </div>
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', padding:'0.375rem 1rem', borderRadius:'999px', background:'#ecfdf5', color:'#065f46', fontSize:'0.75rem', fontWeight:700, border:'1px solid #a7f3d0' }}>
              <span className="material-symbols-outlined" style={{ fontSize:'1rem' }}>videocam</span>
              <span>Gesture Control: ON</span>
            </div>
            <button onClick={()=>navigate('/settings')} style={{ background:'none', border:'none', cursor:'pointer', padding:'0.5rem', borderRadius:'50%' }}>
              <span className="material-symbols-outlined" style={{ color:'#1e1b4b' }}>settings</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main grid */}
      <main style={{ flex:1, marginTop:'6rem', marginBottom:'8rem', padding:'1.5rem', maxWidth:'1400px', margin:'6rem auto 8rem', width:'100%', display:'grid', gridTemplateColumns:'7fr 3fr', gap:'2rem' }}>

        {/* Left: Video + content */}
        <section style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
          {/* YouTube embed */}
          <div style={{ position:'relative', borderRadius:'var(--radius-lg)', overflow:'hidden', boxShadow:'0 25px 50px rgba(2,2,41,0.2)', aspectRatio:'16/9', background:'#020229' }}>
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1`}
              title="AI Technology — Anvaya Learning Content"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', border:'none' }}
            />
          </div>

          {/* Content description */}
          <div style={{ background:'var(--surface-container-low)', borderRadius:'var(--radius-lg)', padding:'2rem' }}>
            <h1 style={{ fontFamily:"'Noto Serif',serif", fontSize:'1.875rem', color:'#020229', marginBottom:'1rem' }}>AI Technology and How It's Powering the World</h1>
            <p style={{ color:'var(--on-surface-variant)', lineHeight:1.75, fontSize:'1.0625rem' }}>
              In this session, we explore how Artificial Intelligence has transitioned from theory to the most transformative technology of our era. 
              From adaptive learning systems that personalise education to your unique style, to medical AI that detects conditions earlier than ever — 
              this content breaks down complex ideas into accessible, meaningful insights for every learner.
            </p>
          </div>
        </section>

        {/* Right: Sign Language + tools */}
        <aside style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
          {/* Sign Language box */}
          <div style={{ borderRadius:'var(--radius-lg)', overflow:'hidden', border:'1px solid rgba(200,197,207,0.15)', boxShadow:'0 10px 30px rgba(0,0,0,0.08)' }}>
            <div style={{ background:'#020229', padding:'0.75rem 1.5rem', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <span style={{ fontSize:'10px', fontWeight:700, color:'#f6bf0e', letterSpacing:'0.12em', textTransform:'uppercase' }}>Sign Language Interpreter</span>
              <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#ef4444', animation:'pulse 2s infinite' }} />
            </div>
            {/* Silhouette animation */}
            <div style={{ aspectRatio:'1/1', position:'relative', background:'#0a0a2e', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
              {/* Camera guide corners */}
              {[{top:'1.5rem',left:'1.5rem',borderTop:'2px solid',borderLeft:'2px solid'},{top:'1.5rem',right:'1.5rem',borderTop:'2px solid',borderRight:'2px solid'},{bottom:'1.5rem',left:'1.5rem',borderBottom:'2px solid',borderLeft:'2px solid'},{bottom:'1.5rem',right:'1.5rem',borderBottom:'2px solid',borderRight:'2px solid'}].map((s,i)=>(
                <div key={i} style={{ position:'absolute', width:'1.25rem', height:'1.25rem', borderColor:'rgba(242,187,5,0.4)', ...s }} />
              ))}
              {/* Animated silhouette */}
              <div className="silhouette-anim" style={{ fontSize:'5rem', userSelect:'none', filter:'drop-shadow(0 0 20px rgba(242,187,5,0.2))' }}>
                {poses[poseIdx]}
              </div>
              {/* Dotted inner border */}
              <div style={{ position:'absolute', inset:'1rem', border:'2px dashed rgba(255,255,255,0.06)', borderRadius:'var(--radius)' }} />
              {/* Scan line animation */}
              <div style={{ position:'absolute', left:0, right:0, height:'2px', background:'linear-gradient(90deg, transparent, rgba(242,187,5,0.4), transparent)', animation:'silhouette-scan 3s ease-in-out infinite' }} />
            </div>
            <div style={{ padding:'0.75rem', background:'rgba(255,255,255,0.5)', backdropFilter:'blur(8px)', display:'flex', justifyContent:'center' }}>
              <button style={{ fontSize:'0.75rem', fontWeight:700, color:'rgba(2,2,41,0.55)', background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:'0.5rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize:'1rem' }}>video_settings</span>
                Switch Interpreter Camera
              </button>
            </div>
          </div>

          {/* Quick tools */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
            {[
              {icon:'font_download',label:'Text Size: L'},
              {icon:'palette',label:'Contrast: High'},
              {icon:'menu_book',label:'Vocabulary Mode'},
            ].map(({icon,label})=>(
              <div key={label} style={{ background:'#fff', padding:'0.5rem 1rem', borderRadius:'999px', fontSize:'0.75rem', fontWeight:500, color:'#020229', boxShadow:'0 2px 8px rgba(0,0,0,0.06)', border:'1px solid rgba(200,197,207,0.15)', display:'flex', alignItems:'center', gap:'0.5rem', cursor:'pointer' }}>
                <span className="material-symbols-outlined" style={{ fontSize:'1rem', color:'#775a00' }}>{icon}</span>
                {label}
              </div>
            ))}
          </div>

          {/* Progress card */}
          <div style={{ background:'rgba(119,90,0,0.06)', borderRadius:'var(--radius-lg)', padding:'1.5rem', border:'1px solid rgba(119,90,0,0.15)' }}>
            <span style={{ fontSize:'10px', fontWeight:700, color:'#775a00', textTransform:'uppercase', letterSpacing:'0.12em', display:'block', marginBottom:'0.75rem' }}>Current Milestone</span>
            <h3 style={{ fontFamily:"'Noto Serif',serif", fontSize:'1.125rem', color:'#020229', marginBottom:'1rem' }}>AI Fundamentals</h3>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.75rem', color:'var(--on-surface-variant)', marginBottom:'0.5rem' }}>
              <span>Progress</span><span style={{ fontWeight:700 }}>42%</span>
            </div>
            <div style={{ background:'rgba(119,90,0,0.1)', borderRadius:'999px', height:'8px', overflow:'hidden' }}>
              <div style={{ background:'linear-gradient(90deg,#775a00,#f6bf0e)', height:'100%', width:'42%', borderRadius:'999px' }} />
            </div>
          </div>
        </aside>
      </main>

      {/* Caption ticker strip */}
      <footer style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:50, padding:'1rem 1.5rem 1.5rem' }}>
        <div className="dark-glass" style={{ maxWidth:'64rem', margin:'0 auto', borderRadius:'var(--radius-xl)', padding:'1.25rem 1.5rem', boxShadow:'0 -20px 40px rgba(0,0,0,0.08)', border:'1px solid rgba(255,255,255,0.08)', display:'flex', alignItems:'center', gap:'1.5rem', overflow:'hidden' }}>
          <div style={{ flexShrink:0, width:'3rem', height:'3rem', borderRadius:'50%', background:'rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'center', color:'#f6bf0e' }}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings:"'FILL' 1" }}>closed_caption</span>
          </div>
          <div style={{ flex:1, overflow:'hidden' }}>
            {/* Scrolling ticker using CSS animation */}
            <div style={{ overflow:'hidden', whiteSpace:'nowrap' }}>
              <div className="caption-ticker-inner" style={{ color:'rgba(255,255,255,0.88)', fontSize:'clamp(0.875rem,1.5vw,1.125rem)', fontWeight:500 }}>
                <span style={{ color:'rgba(242,187,5,0.6)', fontStyle:'italic', marginRight:'0.5rem' }}>Captions:</span>
                {CAPTION_TICKER}
              </div>
            </div>
          </div>
          <div style={{ flexShrink:0, display:'flex', gap:'0.75rem', borderLeft:'1px solid rgba(255,255,255,0.08)', paddingLeft:'1.5rem' }}>
            {['translate','more_vert'].map(icon=>(
              <button key={icon} style={{ width:'2.5rem',height:'2.5rem',borderRadius:'50%',background:'rgba(255,255,255,0.05)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',transition:'background 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.1)'}
                onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.05)'}
              >
                <span className="material-symbols-outlined">{icon}</span>
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
