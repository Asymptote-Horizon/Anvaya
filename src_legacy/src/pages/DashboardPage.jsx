import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';
import BottomNav from '../components/BottomNav';

const AI_SUMMARY = {
  title: 'AI Technology and How It\'s Powering the World',
  tags: ['Artificial Intelligence', 'Machine Learning', 'Future'],
  body: '"Artificial Intelligence is no longer science fiction — it is the silent force reshaping every industry, from healthcare diagnostics that catch cancer earlier than any human eye, to language models that help students learn in their mother tongue. AI amplifies human capability, making knowledge more accessible, personalised, and equitable for every learner on the planet."',
  img1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCIWRooCp_53-zV8BVQjjcQqlIGEXKsek3_j5B6eODReQOndKE3dXJziuIV4fFuwWCyMkYMI-GmBS0QlXMcqWY8sdHPQiOU1TpHvwTiomO_uGmAqIuwctex-wZjeFm5FUOweHb1teaDsG1fW9LuoKF4pyXPIKWY59sI5gutpKSqA1VaMq70GwhEyRn4dSFLJOip0rOP4ckIfGNvQ33i69KovvREWPd_p3VdSA5VHW6UsjoQ_IiCHU_SEwGgjgTODsGpiLVW799YPw',
  img2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKTTXfok0BP9LxTB3m8bFASq_BoF-FJGkvV0xsgvTC_7vcw92j3nhA1wX98IQLiz9YGRUTIH-lvRQv3sLuYMnaYdf-uv5MjofKcK1lVBXkw5hrfTFCuiJm2hp6vMFEq5QIoEje3VcrQI3HNF-RFEl6ucFUbT9qni1fW4i-3cwsVWtQ-CFIKptDdYZxFleS5jeFHzVJQWjGp7k8p2U99rHzy0j6b5EH6CX_J_ap0ENqTNZy3hn3ii3_IoZbGXXF3XeWIkPsaGPNnAo',
};

const HOT_PICKS = [
  { tag:'Video', title:'The Quantum Mechanics of Everyday Life', img:'https://lh3.googleusercontent.com/aida-public/AB6AXuBOcnXsR3HIEruM_ruST9Hv9pxtTUA_OI3WC11TTU7fZhA2WAc8vvPFHXO-rHWQTfcmfgXrqnkpyU6uYcWUkxbkZH1zyHsxuZ0Q4HEFR8-OwQTpPczlB5RgQEtCQvWFFWOtiOkTvOKgDwKEckybqUzyg5eNVQTruCwF6-deZ2bUEVja1I4ClJ0KaxOkPGmYqrlHarYQOK21bAd2AIqP9qFJxnDKiizyUrnImNWyqivXVV6GWb2d2_bsPp8s2KflmuQxqbsV9dUl4VU' },
  { tag:'Audio', title:'Ethics in the Age of Artificial Intelligence', img:'https://lh3.googleusercontent.com/aida-public/AB6AXuBVZaq5rDWk33MRlpvvXqAiqYcB2mbzXX_sMWZCUzGFRxtNf_ZBP698F0wCEotV0weiOBrEW1_8oP7HHioJ6xMRLJbQmV4dGw3l_DxHCvIYHOv-E1s2ZpxbKYG3KVoSF7heWWGfsT5FMltshEK6RzDwHyrBheVNnoqXAhpjZkbNYxoHONOlVK_mebwDlZGM01MPffvWcwrfnTJq3jK0hTB3n-tfl8atfFhpP8QphoUnQso_oHlqo_uDc0DdzZ_fasu_O7qd1W3bfE0' },
  { tag:'Article', title:'Modernism: The Bridge Between Eras', img:'https://lh3.googleusercontent.com/aida-public/AB6AXuAwdbT5bKCOmnZNVCXbrXjPQgdRUhUKCbiwm28Ywnj7lHgP2jZwBlULAKnTu0s5NRLE7hbhaX20Brri2EOFj-a_PTXkQCptioXZidyt2fcLPUtBtw1V1F2FdFMdZG4HtK47WmU7QGTsP_FfmykDAoV2QXiPEFvUF4YsazvWXhGrXtIQXwygucX1gAwJ5nsHHzAJMm_ZzoKQ7wYD71DoACrMvFPuDXYBvocFVUtdE_hPRsi1I8ZN6IXGYMugnlH3uq-E-Uu8fWz7ox8' },
  { tag:'Video', title:'Biology of Sleep and Dreaming', img:'https://lh3.googleusercontent.com/aida-public/AB6AXuDKTTXfok0BP9LxTB3m8bFASq_BoF-FJGkvV0xsgvTC_7vcw92j3nhA1wX98IQLiz9YGRUTIH-lvRQv3sLuYMnaYdf-uv5MjofKcK1lVBXkw5hrfTFCuiJm2hp6vMFEq5QIoEje3VcrQI3HNF-RFEl6ucFUbT9qni1fW4i-3cwsVWtQ-CFIKptDdYZxFleS5jeFHzVJQWjGp7k8p2U99rHzy0j6b5EH6CX_J_ap0ENqTNZy3hn3ii3_IoZbGXXF3XeWIkPsaGPNnAo' },
];

const SPACES = [
  { title:'Mathematics', tags:['Calculus','Topology'], img:'https://lh3.googleusercontent.com/aida-public/AB6AXuDQg8HRcjnScBzPhXBCj2pQfHVIIlV_1UBonFcKrwyJj0NUMUm1kcS1ZVIBruxTa6dLlHcKZ2GHNCimQW7QAJF5AFS5TxvaghRkPLegy-yeT6dzREoVVYuJAcURu6KmwXQrnUedD3akBx_p9pCWPQia5HrKrJ4ggrLAfAIkE1CKA3_TQuOpH2LSUqRJWZwnCRvtnfHI8-bVUVp28yg6Gbq3wTCOGLV0W6CBfiUUDWaYATj3t5T7sxOsakULrMdPVzimS1HxFO8cIts' },
  { title:'Physics', tags:['Relativity','Optics'], img:'https://lh3.googleusercontent.com/aida-public/AB6AXuAnd9sH-RMR5f2J-nVbc6bHGLgPM4siNDzb0Uo8f-zzTRSTffG1HY832P6va2AwXJD28xKYuWj1FIuK2bgzY5diQAHQG63XvWaQUMnmGtii6bWp-nURA660Q0vJtxKdROTcSmJmEN-mpKjYA4pdt-VPy1O3cMnlT0nnMe3n2cXg2bANGX88mSAQJzRg--ubKmdYJ_9GjiyIjAq7bK-_lKoV3lwWIbR1Qei2cVZY8OoYT0EPRNHh9uw1bG2XASO88ysjpGgWjrI3bXM' },
  { title:'AI & Tech', tags:['LLMs','Robotics'], img:'https://lh3.googleusercontent.com/aida-public/AB6AXuBCIWRooCp_53-zV8BVQjjcQqlIGEXKsek3_j5B6eODReQOndKE3dXJziuIV4fFuwWCyMkYMI-GmBS0QlXMcqWY8sdHPQiOU1TpHvwTiomO_uGmAqIuwctex-wZjeFm5FUOweHb1teaDsG1fW9LuoKF4pyXPIKWY59sI5gutpKSqA1VaMq70GwhEyRn4dSFLJOip0rOP4ckIfGNvQ33i69KovvREWPd_p3VdSA5VHW6UsjoQ_IiCHU_SEwGgjgTODsGpiLVW799YPw' },
  { title:'Creative Writing', tags:['Storytelling','Poetry'], img:'https://lh3.googleusercontent.com/aida-public/AB6AXuB6mv36gaMsC17y3xk47ruxezJHTe2H6QXIB9srQfL58HI5Fb7pc0mKySAwiOXHUPlkRxGX9OylFjXAGfLeWsHuZhJlrEQ5MbbUnOmYBDbZegOVbFJVV-7Z2Xpn25pMCw-Z5adga3leHXTjdKFo-1KkxuXcWVf3XRhwj8Es1O1xUxWzcQWauKQP5vs8fu3tIqsx-QuIMzgYQUILjpm8A5ccOp9zyEpIj0GvGKZwIIwVZ_2MtkHHTyvLiigbvYMb4OMbn8IY3YlSumU' },
  { title:'Philosophy', tags:['Stoicism','Logic'], img:'https://lh3.googleusercontent.com/aida-public/AB6AXuDDkXmpBRC23iWx96QCfFoRxn1k-ayuALwo6yLUoj38vrEfjGFSXoMzpM-wGe4e-ag_kPjqK-ades5Z4DDnNTGBt5r3E46yJe21FnUWbz9SLWFPeBxmUHPob2eMHZl_90QJeYYJgUG-hwVMV3-niuB7GuJtUcV2KshNhlDuVYhnVyVBkUM1fQp6wXcUdyqu7zaVTWJgAH8SZJ9da0pxyR-jfxU22Tx1ee8LGlZVI30BDLPd8Ms8dakN4batCyix5SsT0OHc0GkuUag' },
  { title:'Literature', tags:['Classics','Diction'], img:'https://lh3.googleusercontent.com/aida-public/AB6AXuC-9VaM6xHrU_EroEBbNAeRWeFxkRFmtI1lVM24NDbgi0XW_RtcQJ3id2ulu_-TA31IbcbQrBLg3F7wDHKKtzzaud3igkxQ3bfmXz76eLyBGPHoOu0KuWyPo_hSauZM3hhT-B7l_0lG1FLAlfytpS0S5AGO3gpffeBKcdISeFJPB5glvO0OYJnWZbFbc8IazORdqoeA1ZUcS-fcS7NtvGaXUhniUBff8728zcYRp16s63fIbI5d51nyZhVk6Ok4siIsE559JtZLy48' },
];

export default function DashboardPage({ onChatOpen }) {
  const navigate = useNavigate();
  const [dropState, setDropState] = useState('idle'); // idle | dragging | converting | done
  const [tourDismissed, setTourDismissed] = useState(false);
  const fileInputRef = useRef(null);
  const linkInputRef = useRef(null);
  const [linkValue, setLinkValue] = useState('');

  const triggerConversion = () => {
    setDropState('converting');
    setTimeout(() => setDropState('done'), 3000);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDropState('idle');
    triggerConversion();
  };

  const handleDragOver = (e) => { e.preventDefault(); setDropState('dragging'); };
  const handleDragLeave = () => setDropState('idle');

  const handleFileInput = (e) => {
    if (e.target.files.length) triggerConversion();
  };

  const handleLinkSubmit = (e) => {
    e.preventDefault();
    if (linkValue.trim()) triggerConversion();
  };

  return (
    <div style={{ background:'var(--surface)', minHeight:'100vh', paddingBottom:'8rem' }}>
      <TopNav onChatOpen={onChatOpen} />
      <BottomNav onChatOpen={onChatOpen} />

      {/* Floating chatbot button */}
      <button onClick={onChatOpen} style={{ position:'fixed', bottom:'6rem', right:'2.5rem', width:'4rem', height:'4rem', borderRadius:'50%', background:'linear-gradient(135deg,#775a00,#f6bf0e)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 8px 24px rgba(119,90,0,0.3)', zIndex:50, transition:'all 0.3s' }}
        onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.1)'; e.currentTarget.style.boxShadow='0 12px 30px rgba(119,90,0,0.4)'}}
        onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(119,90,0,0.3)'}}
        title="Open Anvaya Assistant (or press JJ)"
      >
        <span className="material-symbols-outlined" style={{ color:'#020229', fontSize:'1.75rem' }}>smart_toy</span>
      </button>

      <main style={{ maxWidth:'72rem', margin:'0 auto', padding:'8rem 1.5rem 2rem', display:'flex', flexDirection:'column', gap:'5rem' }}>

        {/* Hero search */}
        <section style={{ display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', gap:'2rem' }}>
          <h1 style={{ fontFamily:"'Noto Serif',serif", fontSize:'clamp(2rem,5vw,3.75rem)', color:'#020229', maxWidth:'48rem', lineHeight:1.2 }}>
            What will you <span style={{ color:'var(--secondary)' }}>uncover</span> today?
          </h1>
          <div style={{ position:'relative', width:'100%', maxWidth:'40rem' }}>
            <input placeholder="Search your knowledge base..." style={{ width:'100%', height:'4rem', paddingLeft:'2rem', paddingRight:'4rem', borderRadius:'999px', background:'var(--surface-container-high)', border:'none', outline:'none', fontSize:'1.125rem', color:'var(--on-surface)', transition:'box-shadow 0.2s' }}
              onFocus={e=>e.target.style.boxShadow='0 0 0 2px rgba(242,187,5,0.4)'}
              onBlur={e=>e.target.style.boxShadow='none'}
            />
            <button style={{ position:'absolute', right:'0.75rem', top:'50%', transform:'translateY(-50%)', width:'2.75rem', height:'2.75rem', borderRadius:'50%', background:'var(--secondary-container)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'transform 0.2s' }}
              onMouseEnter={e=>e.currentTarget.style.transform='translateY(-50%) scale(1.1)'}
              onMouseLeave={e=>e.currentTarget.style.transform='translateY(-50%) scale(1)'}
            >
              <span className="material-symbols-outlined" style={{ color:'var(--on-secondary-container)', fontVariationSettings:"'FILL' 1" }}>mic</span>
            </button>
          </div>
        </section>

        {/* Tour card */}
        {!tourDismissed && (
          <section>
            <div className="glass-card" style={{ padding:'1.5rem', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
                <div style={{ width:'3rem', height:'3rem', borderRadius:'50%', background:'#e1e0ff', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <span className="material-symbols-outlined" style={{ color:'#5a5b84' }}>auto_awesome</span>
                </div>
                <div>
                  <h3 style={{ fontWeight:700, fontSize:'1.125rem', color:'#020229' }}>New here? Take the tour →</h3>
                  <p style={{ color:'var(--on-surface-variant)', fontSize:'0.875rem' }}>Discover how to transform any content into a learning journey.</p>
                </div>
              </div>
              <button onClick={()=>setTourDismissed(true)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--on-surface-variant)', padding:'0.5rem', borderRadius:'50%' }}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </section>
        )}

        {/* Hot Picks */}
        <section>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'1.5rem', padding:'0 0.5rem' }}>
            <div>
              <h2 style={{ fontFamily:"'Noto Serif',serif", fontSize:'1.875rem', color:'#020229' }}>Hot Picks</h2>
              <p style={{ color:'var(--on-surface-variant)' }}>Trending insights from the community</p>
            </div>
            <button style={{ color:'var(--secondary)', fontWeight:700, fontSize:'0.875rem', background:'none', border:'none', cursor:'pointer' }}
              onMouseEnter={e=>e.currentTarget.style.textDecoration='underline'}
              onMouseLeave={e=>e.currentTarget.style.textDecoration='none'}
            >View All</button>
          </div>
          <div style={{ display:'flex', overflowX:'auto', gap:'1.5rem', paddingBottom:'1.5rem' }} className="no-scrollbar">
            {HOT_PICKS.map(({tag,title,img})=>(
              <div key={title} onClick={()=>navigate('/reader')} style={{ minWidth:'280px', cursor:'pointer' }}>
                <div style={{ height:'12rem', borderRadius:'var(--radius)', overflow:'hidden', marginBottom:'1rem', position:'relative' }}>
                  <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s ease' }}
                    onMouseEnter={e=>e.currentTarget.style.transform='scale(1.05)'}
                    onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
                  />
                  <div style={{ position:'absolute', top:'1rem', left:'1rem', padding:'0.25rem 0.75rem', background:'rgba(255,255,255,0.92)', backdropFilter:'blur(8px)', borderRadius:'999px', fontSize:'10px', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#020229' }}>{tag}</div>
                </div>
                <h4 style={{ fontWeight:700, color:'#020229', padding:'0 0.25rem' }}>{title}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* Magic Transformer */}
        <section>
          <div style={{ background:'#020229', padding:'clamp(2rem,6vw,3rem)', borderRadius:'var(--radius-lg)', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(30,27,75,0.5),transparent)', pointerEvents:'none' }} />
            <div style={{ position:'relative', zIndex:1 }}>
              <h2 style={{ fontFamily:"'Noto Serif',serif", fontSize:'1.75rem', color:'#fff', textAlign:'center', marginBottom:'1.5rem' }}>The Magic Transformer ✨</h2>
              
              {dropState === 'idle' || dropState === 'dragging' ? (
                <>
                  <div
                    className={`drop-zone ${dropState==='dragging'?'drag-over':''}`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={()=>fileInputRef.current.click()}
                  >
                    <input ref={fileInputRef} type="file" style={{ display:'none' }} onChange={handleFileInput} />
                    <div style={{ display:'flex', justifyContent:'center', gap:'1.5rem', marginBottom:'1.5rem' }}>
                      {['picture_as_pdf','smart_display','mic','image'].map(icon=>(
                        <span key={icon} className="material-symbols-outlined" style={{ fontSize:'2.5rem', color: dropState==='dragging'?'#f6bf0e':'rgba(255,255,255,0.4)', transition:'color 0.3s' }}>{icon}</span>
                      ))}
                    </div>
                    <p style={{ color:'rgba(224,231,255,0.85)', fontSize:'1.125rem', fontWeight:500 }}>
                      Drop anything here — PDF, YouTube link, audio, image — and we'll transform it for your learning style.
                    </p>
                  </div>
                  {/* Link input */}
                  <form onSubmit={handleLinkSubmit} style={{ display:'flex', gap:'0.75rem', marginTop:'1.25rem' }}>
                    <input
                      ref={linkInputRef}
                      value={linkValue}
                      onChange={e=>setLinkValue(e.target.value)}
                      placeholder="Or paste a YouTube / website link..."
                      style={{ flex:1, padding:'0.875rem 1.25rem', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', borderRadius:'var(--radius)', color:'#fff', fontSize:'0.9375rem', outline:'none' }}
                    />
                    <button type="submit" style={{ padding:'0.875rem 1.5rem', background:'linear-gradient(135deg,#775a00,#f6bf0e)', border:'none', borderRadius:'var(--radius)', color:'#020229', fontWeight:700, cursor:'pointer', whiteSpace:'nowrap' }}>Transform →</button>
                  </form>
                </>
              ) : dropState === 'converting' ? (
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'1.5rem', padding:'3rem 0' }}>
                  <div style={{ display:'flex', gap:'0.375rem' }}>
                    {[0,1,2].map(i=>(
                      <div key={i} style={{ width:'0.75rem', height:'0.75rem', background:'#f6bf0e', borderRadius:'50%', animation:`bounce 1s infinite ${i*0.15}s` }} />
                    ))}
                  </div>
                  <p style={{ color:'rgba(255,255,255,0.8)', fontWeight:500, letterSpacing:'0.05em' }}>Converting your content...</p>
                </div>
              ) : (
                // AI Summary card
                <div className="glass-card" style={{ borderRadius:'var(--radius)', padding:'0', border:'1px solid rgba(242,187,5,0.2)', overflow:'hidden' }}>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0' }}>
                    <div style={{ padding:'2rem', display:'flex', flexDirection:'column', gap:'1.5rem' }}>
                      <div>
                        <h3 style={{ fontFamily:"'Noto Serif',serif", fontSize:'1.5rem', color:'#020229', marginBottom:'0.5rem' }}>{AI_SUMMARY.title}</h3>
                        <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
                          {AI_SUMMARY.tags.map(t=>(
                            <span key={t} style={{ background:'var(--surface-container-highest)', padding:'0.25rem 0.75rem', borderRadius:'999px', fontSize:'0.75rem', fontWeight:700, color:'var(--on-surface-variant)', textTransform:'uppercase', letterSpacing:'0.05em' }}>{t}</span>
                          ))}
                        </div>
                      </div>
                      <p style={{ color:'var(--on-surface)', lineHeight:1.7, fontStyle:'italic' }}>{AI_SUMMARY.body}</p>
                      <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
                        <button onClick={()=>navigate('/reader')} style={{ background:'#020229', color:'#fff', padding:'0.75rem 1.5rem', borderRadius:'999px', border:'none', cursor:'pointer', fontWeight:700, display:'flex', alignItems:'center', gap:'0.5rem' }}>
                          <span className="material-symbols-outlined" style={{ fontSize:'1rem' }}>auto_stories</span>
                          Read Full Summary
                        </button>
                        <button style={{ border:'1px solid var(--outline-variant)', padding:'0.75rem 1.5rem', borderRadius:'999px', background:'none', cursor:'pointer', fontWeight:700, color:'#020229' }}>
                          Save to Space
                        </button>
                      </div>
                    </div>
                    <div style={{ padding:'1.5rem', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', alignContent:'start' }}>
                      <div style={{ borderRadius:'var(--radius)', overflow:'hidden', height:'10rem', boxShadow:'0 8px 24px rgba(0,0,0,0.1)' }}>
                        <img src={AI_SUMMARY.img1} alt="AI visualization" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                      </div>
                      <div style={{ borderRadius:'var(--radius)', overflow:'hidden', height:'10rem', boxShadow:'0 8px 24px rgba(0,0,0,0.1)', marginTop:'2rem' }}>
                        <img src={AI_SUMMARY.img2} alt="Tech network" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                      </div>
                    </div>
                  </div>
                  <div style={{ padding:'1rem 2rem', borderTop:'1px solid var(--outline-variant)', display:'flex', justifyContent:'flex-end' }}>
                    <button onClick={()=>setDropState('idle')} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--on-surface-variant)', fontSize:'0.875rem', fontWeight:500 }}>← Transform another</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Learning Spaces */}
        <section>
          <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
            <h2 style={{ fontFamily:"'Noto Serif',serif", fontSize:'2.25rem', color:'#020229' }}>Your Learning Space</h2>
            <p style={{ color:'var(--on-surface-variant)', maxWidth:'36rem', margin:'0.5rem auto 0' }}>Cultivate your mind in curated subject zones, tailored by your recent explorations.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'2rem' }}>
            {SPACES.map(({title,tags,img})=>(
              <div key={title} className="glass-card" onClick={()=>navigate('/reader')} style={{ borderRadius:'var(--radius-lg)', overflow:'hidden', cursor:'pointer', transition:'transform 0.5s ease', position:'relative' }}
                onMouseEnter={e=>e.currentTarget.style.transform='translateY(-8px)'}
                onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}
              >
                <div style={{ height:'10rem', overflow:'hidden' }}>
                  <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.7s ease' }}
                    onMouseEnter={e=>e.currentTarget.style.transform='scale(1.1)'}
                    onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
                  />
                </div>
                <div style={{ padding:'1.5rem', display:'flex', flexDirection:'column', gap:'1rem' }}>
                  <h4 style={{ fontWeight:700, fontSize:'1.25rem', color:'#020229' }}>{title}</h4>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
                    {tags.map(t=>(
                      <span key={t} style={{ background:'var(--surface-container)', padding:'0.25rem 0.75rem', borderRadius:'999px', fontSize:'0.75rem', fontWeight:500, color:'var(--on-surface-variant)' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
