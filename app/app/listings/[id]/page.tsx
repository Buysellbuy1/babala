cat >> app/listings/\[id\]/page.tsx << 'EOF'
'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { allItems } from '../../data'

export default function ItemDetailPage() {
  const params = useParams()
  const id = Number(params.id)
  const item = allItems.find(i => i.id === id)
  const [imgError, setImgError] = useState(false)
  if (!item) {
    return (
      <main style={{ minHeight:'100vh', background:'#050510', color:'white', fontFamily:'system-ui,sans-serif', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'20px' }}>
        <div style={{ fontSize:'60px', marginBottom:'20px' }}>😕</div>
        <h1 style={{ fontSize:'24px', fontWeight:900, marginBottom:'10px' }}>Item not found</h1>
        <p style={{ color:'rgba(255,255,255,0.4)', marginBottom:'28px' }}>This listing may have been removed.</p>
        <Link href="/listings" style={{ textDecoration:'none' }}>
          <button style={{ background:'linear-gradient(90deg,#ff6b35,#ff0080)', border:'none', color:'white', padding:'14px 28px', borderRadius:'50px', fontWeight:800, fontSize:'15px', cursor:'pointer' }}>Back to Listings</button>
        </Link>
      </main>
    )
  }
  const whatsappMessage = encodeURIComponent('Hi! I saw your listing on Babala for ' + item.title + ' at Rs ' + item.price.toLocaleString() + '. Is it still available?')
  const whatsappLink = 'https://wa.me/230' + item.whatsapp + '?text=' + whatsappMessage
  const relatedItems = allItems.filter(i => i.category === item.category && i.id !== item.id).slice(0, 4)
EOF
cat >> app/listings/\[id\]/page.tsx << 'EOF'
  return (
    <main style={{ minHeight:'100vh', background:'#050510', color:'white', fontFamily:'system-ui,sans-serif', paddingBottom:'120px', overflowX:'hidden' }}>
      <header style={{ padding:'16px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, zIndex:100, background:'rgba(5,5,16,0.92)', backdropFilter:'blur(24px)', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/listings" style={{ textDecoration:'none', color:'rgba(255,255,255,0.7)', fontSize:'14px', fontWeight:600 }}>← Back</Link>
        <Link href="/" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:'8px' }}>
          <div style={{ width:'32px', height:'32px', borderRadius:'9px', background:'linear-gradient(135deg,#ff6b35,#ff0080)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px', fontWeight:900 }}>B</div>
          <div style={{ fontSize:'20px', fontWeight:900, background:'linear-gradient(90deg,#ff6b35,#ffd700,#ff0080)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Babala</div>
        </Link>
        <div style={{ width:'60px' }} />
      </header>
      <div style={{ position:'relative', zIndex:1 }}>
        <div style={{ position:'relative', width:'100%', height:'300px', overflow:'hidden' }}>
          {!imgError
            ? <img src={item.img} alt={item.title} onError={() => setImgError(true)} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
            : <div style={{ width:'100%', height:'100%', background:'linear-gradient(135deg,rgba(255,107,53,0.2),rgba(5,5,16,0.9))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'60px' }}>📦</div>
          }
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,transparent 50%,rgba(5,5,16,1) 100%)' }} />
          <div style={{ position:'absolute', top:'16px', left:'16px', background:item.color, padding:'4px 14px', borderRadius:'20px', fontSize:'11px', fontWeight:800, color:'#000' }}>{item.badge}</div>
          <div style={{ position:'absolute', top:'16px', right:'16px', background:'rgba(0,0,0,0.6)', padding:'4px 12px', borderRadius:'20px', fontSize:'11px', color:'rgba(255,255,255,0.7)' }}>{item.time}</div>
        </div>
        <div style={{ padding:'0 20px', maxWidth:'600px', margin:'0 auto' }}>
          <div style={{ marginBottom:'20px', paddingTop:'4px' }}>
            <div style={{ fontSize:'11px', color:item.color, fontWeight:700, textTransform:'uppercase', letterSpacing:'2px', marginBottom:'8px' }}>{item.category}</div>
            <h1 style={{ fontSize:'26px', fontWeight:900, lineHeight:1.2, marginBottom:'12px' }}>{item.title}</h1>
            <div style={{ fontSize:'36px', fontWeight:900, color:item.color }}>Rs {item.price.toLocaleString()}</div>
          </div>
          <div style={{ display:'flex', gap:'10px', flexWrap:'wrap', marginBottom:'24px' }}>
            {[{icon:'📍',label:item.location},{icon:'✅',label:item.condition},{icon:'👤',label:item.seller}].map((pill,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'6px', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', padding:'8px 14px', borderRadius:'50px', fontSize:'13px', color:'rgba(255,255,255,0.8)' }}>
                <span>{pill.icon}</span> {pill.label}
              </div>
            ))}
          </div>
          <div style={{ height:'1px', background:'rgba(255,255,255,0.07)', marginBottom:'24px' }} />
          <div style={{ marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, marginBottom:'12px' }}>About this item</h2>
            <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.55)', lineHeight:1.8 }}>{item.description}</p>
          </div>
          <div style={{ background:'rgba(255,215,0,0.06)', border:'1px solid rgba(255,215,0,0.2)', borderRadius:'16px', padding:'14px 16px', marginBottom:'28px', display:'flex', gap:'12px' }}>
            <span style={{ fontSize:'20px' }}>🛡️</span>
            <div>
              <div style={{ fontSize:'12px', fontWeight:700, color:'#ffd700', marginBottom:'4px' }}>Safety Tip</div>
              <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.4)', lineHeight:1.6 }}>Always meet in a public place. Never send money in advance.</div>
            </div>
          </div>
          {relatedItems.length > 0 && (
            <div style={{ marginBottom:'28px' }}>
              <h2 style={{ fontSize:'16px', fontWeight:800, marginBottom:'14px' }}>More in {item.category}</h2>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
                {relatedItems.map(rel => (
                  <Link key={rel.id} href={'/listings/'+rel.id} style={{ textDecoration:'none', color:'white' }}>
                    <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'16px', overflow:'hidden' }}>
                      <div style={{ height:'100px', overflow:'hidden' }}>
                        <img src={rel.img} alt={rel.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                      </div>
                      <div style={{ padding:'10px' }}>
                        <div style={{ fontSize:'12px', fontWeight:700, marginBottom:'4px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{rel.title}</div>
                        <div style={{ fontSize:'14px', fontWeight:900, color:rel.color }}>Rs {rel.price.toLocaleString()}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:100, background:'rgba(5,5,16,0.97)', backdropFilter:'blur(30px)', borderTop:'1px solid rgba(255,255,255,0.06)', padding:'12px 20px 28px' }}>
        <div style={{ maxWidth:'600px', margin:'0 auto', display:'flex', gap:'12px', alignItems:'center' }}>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', marginBottom:'2px' }}>Asking price</div>
            <div style={{ fontSize:'22px', fontWeight:900, color:item.color }}>Rs {item.price.toLocaleString()}</div>
          </div>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration:'none', flex:2 }}>
            <button style={{ width:'100%', padding:'16px', borderRadius:'50px', border:'none', background:'linear-gradient(90deg,#25d366,#128c7e)', color:'white', fontWeight:800, fontSize:'16px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px' }}>
              <span style={{ fontSize:'20px' }}>💬</span> WhatsApp Seller
            </button>
          </a>
        </div>
      </div>
      <style>{`* { margin:0; padding:0; box-sizing:border-box; } ::-webkit-scrollbar { width:0; }`}</style>
    </main>
  )
}
EOF
wc -l app/listings/\[id\]/page.tsx
mkdir -p app/listings/\[id\]
> app/listings/\[id\]/page.tsx
wc -l app/listings/\[id\]/page.tsx
