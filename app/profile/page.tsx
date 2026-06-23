'use client'
import Link from 'next/link'
import { useState } from 'react'
import { allItems } from '../data'

const userProfile = {
  name: "Dev Ramkhelawon",
  location: "Quatre Bornes",
  joined: "March 2024",
  avatar: "D",
  whatsapp: "58765432",
  bio: "Selling quality second-hand items from my home. Always honest about condition. Meet in public places only.",
  verified: true,
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('listings')
  const [activeNav, setActiveNav] = useState('Profile')
  const myListings = allItems.slice(0, 4)

  return (
    <main style={{ minHeight:'100vh', background:'#050510', color:'white', fontFamily:'system-ui,sans-serif', paddingBottom:'100px', overflowX:'hidden' }}>
      <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden' }}>
        <div style={{ position:'absolute', left:'20%', top:'0%', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle,rgba(0,255,136,0.07),transparent 70%)' }} />
        <div style={{ position:'absolute', right:'10%', bottom:'20%', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle,rgba(255,107,53,0.06),transparent 70%)' }} />
      </div>

      <header style={{ padding:'16px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, zIndex:100, background:'rgba(5,5,16,0.92)', backdropFilter:'blur(24px)', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:'10px' }}>
          <div style={{ width:'36px', height:'36px', borderRadius:'10px', background:'linear-gradient(135deg,#ff6b35,#ff0080)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', fontWeight:900, boxShadow:'0 0 20px rgba(255,107,53,0.5)' }}>B</div>
          <div style={{ fontSize:'22px', fontWeight:900, background:'linear-gradient(90deg,#ff6b35,#ffd700,#ff0080)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Babala</div>
        </Link>
        <button style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.6)', padding:'8px 16px', borderRadius:'50px', cursor:'pointer', fontSize:'13px' }}>Edit Profile</button>
      </header>

      <div style={{ position:'relative', zIndex:1 }}>

        <div style={{ padding:'32px 20px 24px', textAlign:'center' }}>
          <div style={{ width:'90px', height:'90px', borderRadius:'50%', background:'linear-gradient(135deg,#ff6b35,#ff0080)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'36px', fontWeight:900, margin:'0 auto 16px', boxShadow:'0 0 40px rgba(255,107,53,0.4)' }}>
            {userProfile.avatar}
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', marginBottom:'6px' }}>
            <h1 style={{ fontSize:'24px', fontWeight:900 }}>{userProfile.name}</h1>
            {userProfile.verified && <span style={{ background:'rgba(0,212,255,0.15)', border:'1px solid rgba(0,212,255,0.3)', color:'#00d4ff', fontSize:'10px', fontWeight:700, padding:'2px 8px', borderRadius:'20px' }}>✓ Verified</span>}
          </div>
          <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.4)', marginBottom:'8px' }}>📍 {userProfile.location} · Member since {userProfile.joined}</div>
          <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.5)', maxWidth:'300px', margin:'0 auto 20px', lineHeight:1.7 }}>{userProfile.bio}</p>

          <div style={{ display:'flex', justifyContent:'center', gap:'12px' }}>
            <a href={'https://wa.me/230' + userProfile.whatsapp} target="_blank" rel="noopener noreferrer" style={{ textDecoration:'none' }}>
              <button style={{ background:'linear-gradient(90deg,#25d366,#128c7e)', border:'none', color:'white', padding:'10px 20px', borderRadius:'50px', fontWeight:700, fontSize:'13px', cursor:'pointer', display:'flex', alignItems:'center', gap:'6px' }}>
                <span>💬</span> WhatsApp
              </button>
            </a>
            <Link href="/sell" style={{ textDecoration:'none' }}>
              <button style={{ background:'linear-gradient(90deg,#ff6b35,#ff0080)', border:'none', color:'white', padding:'10px 20px', borderRadius:'50px', fontWeight:700, fontSize:'13px', cursor:'pointer', boxShadow:'0 0 20px rgba(255,107,53,0.4)' }}>
                + New Listing
              </button>
            </Link>
          </div>
        </div>

        <div style={{ display:'flex', justifyContent:'center', padding:'0 20px 24px', maxWidth:'500px', margin:'0 auto' }}>
          {[
            { value:'4', label:'Listings', color:'#ff6b35' },
            { value:'12', label:'Sold', color:'#00ff88' },
            { value:'4.9★', label:'Rating', color:'#ffd700' },
          ].map((stat, i) => (
            <div key={i} style={{ flex:1, textAlign:'center', padding:'16px', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
              <div style={{ fontSize:'24px', fontWeight:900, color:stat.color, textShadow:`0 0 20px ${stat.color}` }}>{stat.value}</div>
              <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', textTransform:'uppercase', letterSpacing:'1px', marginTop:'4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ padding:'0 20px', maxWidth:'600px', margin:'0 auto' }}>
          <div style={{ display:'flex', gap:'8px', marginBottom:'20px', background:'rgba(255,255,255,0.04)', borderRadius:'50px', padding:'4px' }}>
            {['listings', 'sold', 'reviews'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                style={{ flex:1, padding:'10px', borderRadius:'50px', border:'none', background: activeTab === tab ? 'linear-gradient(90deg,#ff6b35,#ff0080)' : 'transparent', color: activeTab === tab ? 'white' : 'rgba(255,255,255,0.4)', fontWeight: activeTab === tab ? 700 : 400, fontSize:'13px', cursor:'pointer', textTransform:'capitalize', transition:'all 0.2s', boxShadow: activeTab === tab ? '0 0 20px rgba(255,107,53,0.3)' : 'none' }}>
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'listings' && (
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }}>
              {myListings.map(item => (
                <Link key={item.id} href={'/listings/'+item.id} style={{ textDecoration:'none', color:'white' }}>
                  <div style={{ background:'rgba(255,255,255,0.04)', border:`1px solid ${item.color}33`, borderRadius:'20px', overflow:'hidden', transition:'all 0.3s' }}
                    onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.borderColor=item.color }}
                    onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.borderColor=`${item.color}33` }}>
                    <div style={{ height:'120px', overflow:'hidden', position:'relative' }}>
                      <img src={item.img} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,transparent 40%,rgba(5,5,16,0.8))' }} />
                      <div style={{ position:'absolute', top:'8px', left:'8px', background:item.color, padding:'2px 8px', borderRadius:'20px', fontSize:'9px', fontWeight:800, color:'#000' }}>{item.badge}</div>
                    </div>
                    <div style={{ padding:'10px' }}>
                      <div style={{ fontSize:'12px', fontWeight:700, marginBottom:'4px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.title}</div>
                      <div style={{ fontSize:'15px', fontWeight:900, color:item.color }}>Rs {item.price.toLocaleString()}</div>
                      <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.3)', marginTop:'4px' }}>📍 {item.location}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {activeTab === 'sold' && (
            <div style={{ textAlign:'center', padding:'40px 20px' }}>
              <div style={{ fontSize:'48px', marginBottom:'16px' }}>📦</div>
              <div style={{ fontSize:'16px', fontWeight:700, marginBottom:'8px' }}>12 items sold</div>
              <div style={{ color:'rgba(255,255,255,0.4)', fontSize:'13px' }}>Your sold listings will appear here.</div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
              {[
                { name:'Marie C.', rating:5, text:'Great seller, item exactly as described. Fast reply on WhatsApp!', time:'2 days ago' },
                { name:'Kevin B.', rating:5, text:'Very honest about the condition. Would buy again.', time:'1 week ago' },
                { name:'Priya N.', rating:4, text:'Good item, met in a safe location. Recommended!', time:'2 weeks ago' },
              ].map((review, i) => (
                <div key={i} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'16px', padding:'16px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'8px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                      <div style={{ width:'32px', height:'32px', borderRadius:'50%', background:'linear-gradient(135deg,#ff6b35,#ff0080)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'13px', fontWeight:700 }}>{review.name[0]}</div>
                      <div>
                        <div style={{ fontSize:'13px', fontWeight:700 }}>{review.name}</div>
                        <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.3)' }}>{review.time}</div>
                      </div>
                    </div>
                    <div style={{ color:'#ffd700', fontSize:'13px' }}>{'★'.repeat(review.rating)}</div>
                  </div>
                  <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.5)', lineHeight:1.6 }}>{review.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
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