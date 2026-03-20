import { useState, useRef, useEffect } from 'react';

const BOT_RESPONSES = [
  "Namaste! I'm here to help you on your learning journey. What would you like to explore today?",
  "Great question! Let me break that down for you in a way that suits your learning style.",
  "You're doing wonderfully! Your curiosity is your superpower. Keep exploring!",
  "I can help simplify this topic. Would you prefer a visual explanation or a story-based one?",
  "AMAZING! You've got this. Shall we dive deeper or move to a practice exercise?",
];

export default function ChatbotPanel({ onClose }) {
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Namaste! I'm Anvaya's learning companion. How can I support your journey today?" }
  ]);
  const [input, setInput] = useState('');
  const chatRef = useRef(null);
  const respIdx = useRef(0);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTimeout(() => {
      const reply = BOT_RESPONSES[respIdx.current % BOT_RESPONSES.length];
      respIdx.current++;
      setMessages(prev => [...prev, { from: 'bot', text: reply }]);
    }, 900);
  };

  return (
    <aside className="chatbot-panel slide-in-right">
      {/* Header */}
      <header style={{ padding:'1.5rem 2rem', display:'flex', alignItems:'center', justifyContent:'space-between', background:'rgba(255,255,255,0.4)', borderBottom:'1px solid rgba(200,197,207,0.1)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
          <div style={{ width:'3rem', height:'3rem', borderRadius:'50%', background:'#1a1b41', display:'flex',alignItems:'center',justifyContent:'center', border:'2px solid rgba(242,187,5,0.25)' }}>
            <span className="material-symbols-outlined" style={{ color:'#f6bf0e',fontSize:'1.5rem' }}>smart_toy</span>
          </div>
          <div>
            <h2 style={{ fontFamily:"'Noto Serif',serif", fontSize:'1.125rem', fontWeight:700, color:'#020229' }}>Anvaya Assistant</h2>
            <div style={{ display:'flex', alignItems:'center', gap:'0.375rem' }}>
              <span style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#f6bf0e', animation:'pulse 2s infinite', display:'block' }} />
              <span style={{ fontSize:'0.75rem', color:'rgba(71,70,78,0.8)', fontWeight:500 }}>Active now</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} style={{ width:'2.5rem',height:'2.5rem',borderRadius:'50%',border:'none',background:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'background 0.2s' }}
          onMouseEnter={e=>e.currentTarget.style.background='#edeeef'}
          onMouseLeave={e=>e.currentTarget.style.background='none'}>
          <span className="material-symbols-outlined" style={{ color:'#47464e' }}>close</span>
        </button>
      </header>

      {/* Chat messages */}
      <section ref={chatRef} className="no-scrollbar" style={{ flex:1, overflowY:'auto', padding:'2rem', display:'flex', flexDirection:'column', gap:'1.5rem' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display:'flex', justifyContent: msg.from==='user' ? 'flex-end' : 'flex-start', gap:'0.75rem', maxWidth:'85%', alignSelf: msg.from==='user' ? 'flex-end' : 'flex-start' }}>
            {msg.from === 'bot' && (
              <div style={{ flexShrink:0, width:'2rem',height:'2rem',borderRadius:'50%',background:'#e1e0ff',display:'flex',alignItems:'center',justifyContent:'center',alignSelf:'flex-end' }}>
                <span className="material-symbols-outlined" style={{ fontSize:'1rem',color:'#5a5b84' }}>smart_toy</span>
              </div>
            )}
            <div style={{
              padding:'1rem 1.25rem',
              borderRadius: msg.from==='bot' ? '1.5rem 1.5rem 1.5rem 0.25rem' : '1.5rem 1.5rem 0.25rem 1.5rem',
              background: msg.from==='bot' ? '#e1e0ff' : '#ffc720',
              color: msg.from==='bot' ? '#16173d' : '#251a00',
              fontSize:'0.9375rem',
              lineHeight:1.5,
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        {/* Quick chips */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem', marginTop:'0.5rem' }}>
          {['Explain simply','Give me a quiz','What\'s next?'].map(chip => (
            <button key={chip} onClick={() => { setInput(chip); }}
              style={{ padding:'0.5rem 1rem', background:'rgba(225,224,255,0.5)', border:'1px solid rgba(200,197,207,0.2)', borderRadius:'999px', fontSize:'0.8125rem', cursor:'pointer', color:'#191c1d', transition:'background 0.2s' }}
              onMouseEnter={e=>e.currentTarget.style.background='#e1e0ff'}
              onMouseLeave={e=>e.currentTarget.style.background='rgba(225,224,255,0.5)'}
            >{chip}</button>
          ))}
        </div>
      </section>

      {/* Input */}
      <footer style={{ padding:'1.5rem', background:'rgba(255,255,255,0.4)', borderTop:'1px solid rgba(200,197,207,0.1)' }}>
        <div style={{ display:'flex', gap:'0.75rem', alignItems:'center' }}>
          <input
            value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>e.key==='Enter' && send()}
            placeholder="Ask Anvaya anything..."
            style={{ flex:1, padding:'1rem 1.5rem', background:'#f3f4f5', border:'none', borderRadius:'var(--radius)', fontSize:'0.9375rem', color:'#191c1d', outline:'none', transition:'box-shadow 0.2s' }}
            onFocus={e=>e.target.style.boxShadow='0 0 0 2px rgba(242,187,5,0.3)'}
            onBlur={e=>e.target.style.boxShadow='none'}
          />
          <button onClick={send} style={{ width:'3.5rem',height:'3.5rem',borderRadius:'50%',border:'none',background:'linear-gradient(135deg,#775a00,#f6bf0e)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',boxShadow:'0 0 20px rgba(242,187,5,0.3)',transition:'all 0.3s' }}
            onMouseEnter={e=>e.currentTarget.style.boxShadow='0 0 30px rgba(242,187,5,0.5)'}
            onMouseLeave={e=>e.currentTarget.style.boxShadow='0 0 20px rgba(242,187,5,0.3)'}
          >
            <span className="material-symbols-outlined" style={{ color:'#020229' }}>mic</span>
          </button>
        </div>
        <p style={{ textAlign:'center', fontSize:'0.625rem', color:'rgba(71,70,78,0.4)', marginTop:'0.75rem', letterSpacing:'0.1em', textTransform:'uppercase', fontWeight:600 }}>Powered by Anvaya Intelligence</p>
      </footer>
    </aside>
  );
}
