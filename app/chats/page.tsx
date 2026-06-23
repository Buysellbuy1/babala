'use client'
import Link from 'next/link'
import { useState } from 'react'

const recentChats = [
  { id: 1, name: "Raj D.", item: "Solid Wood Dining Table", price: 4500, time: "2 min ago", avatar: "R", color: "#ff6b35", unread: 2, lastMessage: "Is it still available?" },
  { id: 2, name: "Marie C.", item: "Samsung Washing Machine", price: 6000, time: "1 hr ago", avatar: "M", color: "#00d4ff", unread: 0, lastMessage: "Ok I will come tomorrow morning" },
  { id: 3, name: "Kevin B.", item: "iPhone 13 Pro 256GB", price: 12000, time: "3 hr ago", avatar: "K", color: "#00ff88", unread: 1, lastMessage: "Can you do Rs 11,000?" },
  { id: 4, name: "Priya N.", item: "Baby Stroller & Cot", price: 2800, time: "1 day ago", avatar: "P", color: "#ff0080", unread: 0, lastMessage: "Thank you, very happy with it!" },
  { id: 5, name: "Alain F.", item: "Mountain Bike", price: 3200, time: "2 days ago", avatar: "A", color: "#b400ff", unread: 0, lastMessage: "Where can we meet?" },
]

export default function ChatsPage() {
  const [activeNav, setActiveNav] = useState('Chats')

  return (
    <main style={{ minHeight:'100vh', background:'#050510', color:'white', fontFamily:'system-ui,sans-serif', paddingBottom:'100px', overflowX:'hidden' }}>
      <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden' }}>
        <div style={{ position:'absolute', left:'20%', top:'10%', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle,rgba(255,0,128,0.06),transparent 70%)' }} />
        <div style={{ position:'absolute', right:'10%', bottom:'20%', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle,rgba(0,212,255,0.05),transparent 70%)' }} />
      </div>

      <header style={{ padding:'16px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, zIndex:100, background:'rgba(5,5,16,0.92)', backdropFilter:'blur(24px)', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:'10px' }}>
          <div style={{ width:'36px', height:'36px', borderRadius:'10px', background:'linear-gradient(135deg,#ff6b35,#ff0080)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', fontWeight:900, boxShadow:'0 0 20px rgba(255,107,53,0.5)' }}>B</div>
          <div style={{ fontSize:'22px', fontWeight:900, background:'linear-gradient(90deg,#ff6b35,#ffd700,#ff0080)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Babala</div>
        </Link>
        <div style={{ fontSize:'16px', fontWeight:800 }}>💬 Chats</div>
        <div style={{ width:'60px' }} />
      </header>

      <div style={{ position:'relative', zIndex:1, maxWidth:'600px', margin:'0 auto', padding:'20px' }}>

        {/* WhatsApp banner */}
        <div style={{ background:'linear-gradient(135deg,rgba(37,211,102,0.12),rgba(18,140,126,0.12))', border:'1px solid rgba(37,211,102,0.25)', borderRadius:'20px', padding:'20px', marginBottom:'24px', display:'flex', gap:'14px', alignItems:'center' }}>
          <div style={{ fontSize:'36px' }}>💬</div>
          <div>
            <div style={{ fontSize:'14px', fontWeight:800, color:'#25d366', marginBottom:'4px' }}>Chats happen on WhatsApp</div>
            <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.45)', lineHeight:1.6 }}>When you tap a listing and contact a seller, the conversation opens directly in WhatsApp. All your chats are saved there.</div>
          </div>
        </div>

        {/* Recent chats */}
        <div style={{ marginBottom:'20px' }}>
          <h2 style={{ fontSize:'16px', fontWeight:800, marginBottom:'4px' }}>Recent Contacts</h2>
          <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.35)', marginBottom:'16px' }}>People you have contacted about listings</p>

          <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
            {recentChats.map(chat => (
              <a key={chat.id} href={'https://wa.me/230?text=' + encodeURIComponent('Hi! Following up on ' + chat.item)} target="_blank" rel="noopener noreferrer" style={{ textDecoration:'none', color:'white' }}>
                <div style={{ background:'rgba(255,255,255,0.04)', border:`1px solid ${chat.color}22`, borderRadius:'18px', padding:'14px 16px', display:'flex', alignItems:'center', gap:'14px', transition:'all 0.2s', cursor:'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.background=`${chat.color}10`; e.currentTarget.style.borderColor=`${chat.color}55` }}
                  onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor=`${chat.color}22` }}>
                  <div style={{ position:'relative', flexShrink:0 }}>
                    <div style={{ width:'48px', height:'48px', borderRadius:'50%', background:`linear-gradient(135deg,${chat.color},${chat.color}88)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', fontWeight:800, boxShadow:`0 0 15px ${chat.color}44` }}>
                      {chat.avatar}
                    </div>
                    {chat.unread > 0 && (
                      <div style={{ position:'absolute', top:'-2px', right:'-2px', width:'18px', height:'18px', borderRadius:'50%', background:'#ff0080', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'10px', fontWeight:800, boxShadow:'0 0 10px rgba(255,0,128,0.6)' }}>
                        {chat.unread}
                      </div>
                    )}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'4px' }}>
                      <div style={{ fontWeight:700, fontSize:'14px' }}>{chat.name}</div>
                      <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.3)' }}>{chat.time}</div>
                    </div>
                    <div style={{ fontSize:'12px', color:chat.color, fontWeight:600, marginBottom:'3px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{chat.item} · Rs {chat.price.toLocaleString()}</div>
                    <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.4)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{chat.lastMessage}</div>
                  </div>
                  <div style={{ fontSize:'16px', flexShrink:0 }}>→</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Open WhatsApp button */}
        <a href="https://wa.me" target="_blank" rel="noopener noreferrer" style={{ textDecoration:'none', display:'block' }}>
          <button style={{ width:'100%', padding:'16px', borderRadius:'50px', border:'none', background:'linear-gradient(90deg,#25d366,#128c7e)', color:'white', fontWeight:800, fontSize:'16px', cursor:'pointer', boxShadow:'0 0 30px rgba(37,211,102,0.3)', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px' }}>
            <span style={{ fontSize:'20px' }}>💬</span> Open WhatsApp
          </button>
        </a>
      </div>

      <nav style={{ position:'fixed', bottom:0, left:0, right:0, background:'rgba(5,5,16,0.97)', backdropFilter:'blur(30px)', borderTop:'1px solid rgba(255,255,255,0.06)', display:'flex', justifyContent:'space-around', padding:'10px 0 14px', zIndex:100 }}>
        {[
          { icon:'🏠', label:'Home', href:'/', color:'#ff6b35' },
          { icon:'🔍', label:'Browse', href:'/listings', color:'#00d4ff' },
          { icon:'➕', label:'Sell', href:'/sell', color:'#ffd700' },
          { icon:'💬', label:'Chats', href:'/chats', color:'#ff0080' },
          { icon:'👤', label:'Profile', href:'/profile', color:'#00ff88' },
        ].map(nav => (
          <Link key={nav.label} href={nav.href} style={{ textDecoration:'none', color:'white', textAlign:'center', flex:1 }} onClick={() => setActiveNav(nav.label)}>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'4px' }}>
              <div style={{ fontSize:'22px', filter: activeNav === nav.label ? `drop-shadow(0 0 8px ${nav.color})` : 'none' }}>{nav.icon}</div>
              <div style={{ fontSize:'10px', color: activeNav === nav.label ? nav.color : 'rgba(255,255,255,0.3)', fontWeight: activeNav === nav.label ? 700 : 400 }}>{nav.label}</div>
              {activeNav === nav.label && <div style={{ width:'4px', height:'4px', borderRadius:'50%', background:nav.color, boxShadow:`0 0 8px ${nav.color}` }} />}
            </div>
          </Link>
        ))}
      </nav>

      <style>{`* { margin:0; padding:0; box-sizing:border-box; } ::-webkit-scrollbar{width:0}`}</style>
    </main>
  )
}