import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SettingsContext } from '../App';
import TopNav from '../components/TopNav';
import BottomNav from '../components/BottomNav';

const CONTRAST_OPTIONS = [
  { id:'normal', label:'Normal', preview: '#f8f9fa' },
  { id:'high',   label:'High Contrast', preview:'#000000' },
  { id:'dark',   label:'Dark', preview:'#191c1d' },
  { id:'warm',   label:'Warm', preview:'#fdf0e2' },
];

const SHORTCUTS = [
  { action:'Open Assistant',  combo:'J J' },
  { action:'Go Back',         combo:'F F' },
  { action:'Toggle Audio',    combo:'Space' },
  { action:'Increase Text',   combo:'+ / =' },
  { action:'Decrease Text',   combo:'- / _' },
];

export default function SettingsPage() {
  const navigate = useNavigate();
  const { settings, setSettings } = useContext(SettingsContext);

  const update = (key, value) => setSettings(s => ({ ...s, [key]: value }));

  const reset = () => setSettings({ fontSize:16, lineHeight:1.6, letterSpacing:0.02, contrast:'normal', spacing:1 });

  /* Preview text reflects the live settings */
  const previewStyle = {
    fontSize: settings.fontSize + 'px',
    lineHeight: settings.lineHeight,
    letterSpacing: settings.letterSpacing + 'em',
  };

  return (
    <div style={{ background:'var(--surface)', minHeight:'100vh', paddingBottom:'8rem' }}>
      <TopNav />
      <BottomNav />

      <main style={{ maxWidth:'72rem', margin:'0 auto', padding:'8rem 1.5rem 2rem', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'3rem' }}>

        {/* Header */}
        <div style={{ gridColumn:'1/-1', marginBottom:'1rem' }}>
          <h1 style={{ fontFamily:"'Noto Serif',serif", fontSize:'2.75rem', fontWeight:700, color:'#020229', letterSpacing:'-0.02em', marginBottom:'0.5rem' }}>Reading Preferences</h1>
          <p style={{ color:'var(--on-surface-variant)', fontSize:'1.0625rem', maxWidth:'36rem' }}>
            Tailor your digital sanctuary. Adjust settings to create the most comfortable learning environment for how you experience the world.
          </p>
        </div>

        {/* Left: Controls */}
        <aside style={{ display:'flex', flexDirection:'column', gap:'2.5rem' }}>

          {/* Typography */}
          <section style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
              <span className="material-symbols-outlined" style={{ color:'#775a00' }}>text_fields</span>
              <h2 style={{ fontSize:'1.25rem', fontWeight:700, color:'#020229' }}>Typography & Display</h2>
            </div>
            <div className="glass-card" style={{ padding:'1.5rem', display:'flex', flexDirection:'column', gap:'2rem' }}>
              {/* Font size */}
              <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <label style={{ fontSize:'0.75rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--on-surface-variant)' }}>Font Size</label>
                  <span style={{ color:'#775a00', fontWeight:700 }}>{settings.fontSize}px</span>
                </div>
                <input type="range" min={12} max={32} value={settings.fontSize} onChange={e=>update('fontSize', +e.target.value)} />
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.75rem', color:'var(--on-surface-variant)' }}>
                  <span>12px (Small)</span><span>32px (Large)</span>
                </div>
              </div>

              {/* Line Height */}
              <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <label style={{ fontSize:'0.75rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--on-surface-variant)' }}>Line Height</label>
                  <span style={{ color:'#775a00', fontWeight:700 }}>{settings.lineHeight.toFixed(1)}</span>
                </div>
                <input type="range" min={1.2} max={2.4} step={0.1} value={settings.lineHeight} onChange={e=>update('lineHeight', +e.target.value)} />
              </div>

              {/* Letter Spacing */}
              <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <label style={{ fontSize:'0.75rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--on-surface-variant)' }}>Letter Spacing</label>
                  <span style={{ color:'#775a00', fontWeight:700 }}>{(settings.letterSpacing*100).toFixed(0)}%</span>
                </div>
                <input type="range" min={0} max={0.15} step={0.005} value={settings.letterSpacing} onChange={e=>update('letterSpacing', +e.target.value)} />
              </div>

              {/* Font toggle */}
              <div style={{ display:'flex', background:'var(--surface-container-high)', borderRadius:'999px', padding:'0.25rem' }}>
                <button style={{ flex:1, padding:'0.75rem 1.5rem', borderRadius:'999px', border:'none', cursor:'pointer', fontWeight:700, background:'#fff', boxShadow:'0 2px 8px rgba(0,0,0,0.06)', color:'#020229', fontFamily:"'Noto Serif',serif" }}>Noto Serif</button>
                <button style={{ flex:1, padding:'0.75rem 1.5rem', borderRadius:'999px', border:'none', cursor:'pointer', fontWeight:500, background:'none', color:'var(--on-surface-variant)', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Jakarta Sans</button>
              </div>
            </div>
          </section>

          {/* Contrast */}
          <section style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
              <span className="material-symbols-outlined" style={{ color:'#775a00' }}>palette</span>
              <h2 style={{ fontSize:'1.25rem', fontWeight:700, color:'#020229' }}>Contrast & Theme</h2>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'0.75rem' }}>
              {CONTRAST_OPTIONS.map(({id, label, preview})=>(
                <button key={id} onClick={()=>update('contrast',id)}
                  style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'0.75rem', padding:'1rem', borderRadius:'var(--radius-lg)', background: settings.contrast===id ? '#fff' : 'rgba(248,249,250,0.6)', backdropFilter:'blur(16px)', border: settings.contrast===id ? '2px solid #d97706' : '1px solid rgba(200,197,207,0.15)', cursor:'pointer', boxShadow: settings.contrast===id ? '0 4px 12px rgba(119,90,0,0.15)' : 'none', transition:'all 0.3s' }}
                >
                  <div style={{ width:'2.5rem', height:'2.5rem', borderRadius:'50%', background:preview, border:'1px solid rgba(200,197,207,0.25)' }} />
                  <span style={{ fontSize:'0.75rem', fontWeight: settings.contrast===id ? 700 : 500, color: settings.contrast===id ? '#020229' : 'var(--on-surface-variant)' }}>{label}</span>
                  {settings.contrast===id && <span className="material-symbols-outlined" style={{ fontSize:'0.875rem', color:'#d97706' }}>check</span>}
                </button>
              ))}
            </div>
          </section>

          {/* Shortcuts */}
          <section style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
              <span className="material-symbols-outlined" style={{ color:'#775a00' }}>keyboard</span>
              <h2 style={{ fontSize:'1.25rem', fontWeight:700, color:'#020229' }}>Shortcut Mapping</h2>
            </div>
            <div className="glass-card" style={{ borderRadius:'var(--radius-lg)', overflow:'hidden', padding:0 }}>
              <table style={{ width:'100%', borderCollapse:'collapse' }}>
                <thead>
                  <tr style={{ background:'var(--surface-container-low)', borderBottom:'1px solid rgba(200,197,207,0.12)' }}>
                    <th style={{ padding:'1rem 1.5rem', textAlign:'left', fontSize:'0.75rem', fontWeight:700, color:'var(--on-surface-variant)', textTransform:'uppercase', letterSpacing:'0.08em' }}>Action</th>
                    <th style={{ padding:'1rem 1.5rem', textAlign:'right', fontSize:'0.75rem', fontWeight:700, color:'var(--on-surface-variant)', textTransform:'uppercase', letterSpacing:'0.08em' }}>Combo</th>
                  </tr>
                </thead>
                <tbody>
                  {SHORTCUTS.map(({action,combo},i)=>(
                    <tr key={action} style={{ borderBottom: i < SHORTCUTS.length-1 ? '1px solid rgba(200,197,207,0.08)' : 'none' }}>
                      <td style={{ padding:'0.875rem 1.5rem', fontSize:'0.875rem', fontWeight:500, color:'#020229' }}>{action}</td>
                      <td style={{ padding:'0.875rem 1.5rem', textAlign:'right' }}>
                        {combo.split(' ').map((k,i)=>(
                          <span key={i}>
                            <kbd style={{ background:'var(--surface-container)', padding:'0.25rem 0.5rem', borderRadius:'0.375rem', fontSize:'0.75rem', fontWeight:700, border:'1px solid rgba(200,197,207,0.25)', boxShadow:'0 1px 2px rgba(0,0,0,0.06)' }}>{k}</kbd>
                            {i < combo.split(' ').length-1 && <span style={{ margin:'0 0.25rem', color:'var(--on-surface-variant)', fontSize:'0.75rem' }}>+</span>}
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </aside>

        {/* Right: Live preview */}
        <section>
          <div style={{ position:'sticky', top:'8rem', display:'flex', flexDirection:'column', gap:'1.5rem' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
                <span className="material-symbols-outlined" style={{ color:'#775a00' }}>visibility</span>
                <h2 style={{ fontSize:'1.25rem', fontWeight:700, color:'#020229' }}>Live Preview</h2>
              </div>
              <span style={{ fontSize:'0.75rem', fontWeight:700, color:'#775a00', textTransform:'uppercase', letterSpacing:'0.12em', background:'rgba(119,90,0,0.08)', padding:'0.25rem 0.75rem', borderRadius:'999px' }}>Active View</span>
            </div>

            <div style={{ background:'var(--surface-container-lowest)', borderRadius:'var(--radius-lg)', padding:'3rem', boxShadow:'0 40px 100px -20px rgba(0,0,0,0.07)', border:'1px solid rgba(200,197,207,0.08)', minHeight:'28rem', display:'flex', flexDirection:'column', justifyContent:'center', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:'linear-gradient(90deg, transparent, rgba(119,90,0,0.15), transparent)' }} />
              <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem', maxWidth:'32rem', margin:'0 auto', ...previewStyle }}>
                <h3 style={{ fontFamily:"'Noto Serif',serif", fontSize: `${Math.round(settings.fontSize * 1.5)}px`, color:'#020229', lineHeight:1.25 }}>The Art of Deep Learning</h3>
                <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem', color:'rgba(2,2,41,0.75)', ...previewStyle }}>
                  <p>True learning is not the accumulation of data, but the transformation of the mind. When we create a <span style={{ background:'rgba(119,90,0,0.1)', paddingInline:'0.25rem', borderBottom:'2px solid rgba(119,90,0,0.3)' }}>digital sanctuary</span> for our focus, the complexities of the world dissolve into clear patterns.</p>
                  <p>Consider how your eyes traverse this page. The space between lines, the weight of the serifs, and the warmth of the background work in concert to reduce cognitive load.</p>
                  <p style={{ opacity:0.4, fontStyle:'italic' }}>"The quietest mind hears the loudest truths."</p>
                </div>
              </div>
              <div style={{ position:'absolute', bottom:'-2.5rem', right:'-2.5rem', width:'12rem', height:'12rem', background:'rgba(119,90,0,0.04)', borderRadius:'50%', filter:'blur(48px)' }} />
            </div>

            <div style={{ display:'flex', justifyContent:'center', gap:'2rem', padding:'1rem 0', borderTop:'1px solid rgba(200,197,207,0.1)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', color:'var(--on-surface-variant)', fontSize:'0.875rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize:'1rem' }}>zoom_in</span>
                <span>Text: {settings.fontSize}px</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', color:'var(--on-surface-variant)', fontSize:'0.875rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize:'1rem' }}>auto_awesome</span>
                <span>Theme: {settings.contrast}</span>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Sticky footer */}
      <footer style={{ position:'fixed', bottom:'5rem', left:0, right:0, zIndex:45, padding:'0 1.5rem' }}>
        <div style={{ maxWidth:'72rem', margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', background:'rgba(255,255,255,0.85)', backdropFilter:'blur(24px)', borderRadius:'var(--radius-xl)', padding:'1.25rem 2rem', boxShadow:'0 -10px 40px rgba(0,0,0,0.04)', border:'1px solid rgba(200,197,207,0.1)' }}>
          <p style={{ fontSize:'0.875rem', color:'var(--on-surface-variant)' }}>Changes are previewed instantly. Your settings are saved.</p>
          <div style={{ display:'flex', gap:'1rem' }}>
            <button onClick={reset} style={{ padding:'0.875rem 2rem', borderRadius:'999px', border:'none', background:'none', color:'#020229', fontWeight:700, cursor:'pointer', transition:'background 0.2s' }}
              onMouseEnter={e=>e.currentTarget.style.background='var(--surface-container-high)'}
              onMouseLeave={e=>e.currentTarget.style.background='none'}
            >Reset Defaults</button>
            <button style={{ padding:'0.875rem 2.5rem', borderRadius:'999px', border:'none', background:'linear-gradient(135deg,#775a00,#f6bf0e)', color:'#020229', fontWeight:700, cursor:'pointer', boxShadow:'0 8px 24px rgba(119,90,0,0.25)', display:'flex', alignItems:'center', gap:'0.5rem', transition:'all 0.3s' }}
              onMouseEnter={e=>e.currentTarget.style.transform='scale(1.03)'}
              onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
            >
              Apply Settings
              <span className="material-symbols-outlined" style={{ fontSize:'1.25rem' }}>done_all</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
