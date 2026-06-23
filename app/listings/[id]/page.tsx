'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '../../../lib/supabase'

export default function ItemDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [item, setItem] = useState<any>(null)
  const [related, setRelated] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activePhoto, setActivePhoto] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('id', id)
        .single()
      if (error || !data) { setLoading(false); return }
      setItem(data)
      const { data: relatedData } = await supabase
        .from('listings')
        .select('*')
        .eq('category', data.category)
        .neq('id', id)
        .limit(4)
      setRelated(relatedData || [])
      setLoading(false)
    }
    fetchItem()
  }, [id])

  const categoryColors: Record<string, string> = {
    "Furniture & Home": "#ff6b35", "Appliances": "#00d4ff", "Clothing & Shoes": "#ff0080",
    "Electronics": "#ffd700", "Books & Hobbies": "#00ff88", "Baby & Kids": "#ff6b35",
    "Vehicles": "#b400ff", "Garden & Outdoor": "#00ff88", "Everything Else": "#00d4ff"
  }

  if (loading) {
    return (
      <main style={{ minHeight:'100vh', background:'#050510', color:'white', fontFamily:'system-ui,sans-serif', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:'40px', marginBottom:'16px' }}>⏳</div>
          <div style={{ color:'rgba(255,255,255,0.4)' }}>Loading...</div>
        </div>
      </main>
    )
  }

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

  const color = categoryColors[item.category] || '#ff6b35'
  const photos: string[] = item.image_urls?.length > 0 ? item.image_urls : item.image_url ? [item.image_url] : []
  const msg = encodeURIComponent('Hi! I saw your listing on Babala for ' + item.title + ' at Rs ' + item.price.toLocaleString() + '. Is it still available?')
  const waLink = 'https://wa.me/230' + item.whatsapp + '?text=' + msg

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    return `${Math.floor(hrs / 24)}d ago`
  }

  return (
    <main style={{ minHeight:'100vh', background:'#050510', color:'white', fontFamily:'system-ui,sans-serif', paddingBottom:'120px', overflowX:'hidden' }}>

      {/* Lightbox */}
      {lightbox && photos.length > 0 && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.97)', zIndex:9999, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'20px' }}>
          <button onClick={() => setLightbox(false)}
            style={{ position:'absolute', top:'20px', right:'20px', background:'rgba(255,255,255,0.1)', border:'none', color:'white', width:'40px', height:'40px', borderRadius:'50%', fontSize:'20px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>×</button>
          <img src={photos[activePhoto]} alt="" style={{ maxWidth:'95vw', maxHeight:'75vh', objectFit:'contain', borderRadius:'12px' }} />
          {photos.length > 1 && (
            <div style={{ display:'flex', gap:'12px', alignItems:'center' }}>
              <button onClick={() => setActivePhoto(i => (i - 1 + photos.length) % photos.length)}
                style={{ background:'rgba(255,255,255,0.1)', border:'none', color:'white', width:'40px', height:'40px', borderRadius:'50%', fontSize:'18px', cursor:'pointer' }}>‹</button>
              <span style={{ color:'rgba(255,255,255,0.5)', fontSize:'13px' }}>{activePhoto + 1} / {photos.length}</span>
              <button onClick={() => setActivePhoto(i => (i + 1) % photos.length)}
                style={{ background:'rgba(255,255,255,0.1)', border:'none', color:'white', width:'40px', height:'40px', borderRadius:'50%', fontSize:'18px', cursor:'pointer' }}>›</button>
            </div>
          )}
          {photos.length > 1 && (
            <div style={{ display:'flex', gap:'8px' }}>
              {photos.map((photo, i) => (
                <div key={i} onClick={() => setActivePhoto(i)}
                  style={{ width:'52px', height:'52px', borderRadius:'8px', overflow:'hidden', border:`2px solid ${i===activePhoto ? 'white' : 'rgba(255,255,255,0.2)'}`, cursor:'pointer' }}>
                  <img src={photo} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden' }}>
        <div style={{ position:'absolute', left:'10%', top:'5%', width:'500px', height:'500px', borderRadius:'50%', background:`radial-gradient(circle,${color}12,transparent 70%)` }} />
      </div>

      <header style={{ padding:'16px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, zIndex:100, background:'rgba(5,5,16,0.92)', backdropFilter:'blur(24px)', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/listings" style={{ textDecoration:'none', color:'rgba(255,255,255,0.7)', fontSize:'14px', fontWeight:600 }}>← Back</Link>
        <Link href="/" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:'8px' }}>
          <div style={{ width:'32px', height:'32px', borderRadius:'9px', background:'linear-gradient(135deg,#ff6b35,#ff0080)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px', fontWeight:900 }}>B</div>
          <div style={{ fontSize:'20px', fontWeight:900, background:'linear-gradient(90deg,#ff6b35,#ffd700,#ff0080)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Babala</div>
        </Link>
        <div style={{ width:'60px' }} />
      </header>

      <div style={{ position:'relative', zIndex:1 }}>

        {/* Main photo */}
        <div style={{ position:'relative', width:'100%', height:'320px', overflow:'hidden', background:'#0a0a1a' }}>
          {photos.length > 0
            ? <img src={photos[activePhoto]} alt={item.title}
                onClick={() => setLightbox(true)}
                style={{ width:'100%', height:'100%', objectFit:'contain', cursor:'zoom-in', display:'block', background:'#0a0a1a' }} />
            : <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'80px' }}>📦</div>
          }
          <div style={{ position:'absolute', top:'16px', left:'16px', background:color, padding:'4px 14px', borderRadius:'20px', fontSize:'11px', fontWeight:800, color:'#000' }}>{item.badge || item.condition}</div>
          <div style={{ position:'absolute', top:'16px', right:'16px', background:'rgba(0,0,0,0.6)', padding:'4px 12px', borderRadius:'20px', fontSize:'11px', color:'rgba(255,255,255,0.7)' }}>{timeAgo(item.created_at)}</div>
          {photos.length > 0 && (
            <div onClick={() => setLightbox(true)}
              style={{ position:'absolute', bottom:'16px', right:'16px', background:'rgba(0,0,0,0.7)', padding:'6px 12px', borderRadius:'20px', fontSize:'12px', color:'white', cursor:'pointer', display:'flex', alignItems:'center', gap:'4px' }}>
              🔍 {photos.length > 1 ? `1/${photos.length}` : 'Zoom'}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {photos.length > 1 && (
          <div style={{ display:'flex', gap:'8px', padding:'12px 20px', overflowX:'auto' }}>
            {photos.map((photo, i) => (
              <div key={i} onClick={() => setActivePhoto(i)}
                style={{ flexShrink:0, width:'64px', height:'64px', borderRadius:'10px', overflow:'hidden', border:`2px solid ${i===activePhoto ? color : 'rgba(255,255,255,0.15)'}`, cursor:'pointer', transition:'all 0.2s', opacity: i===activePhoto ? 1 : 0.6 }}>
                <img src={photo} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
              </div>
            ))}
          </div>
        )}

        <div style={{ padding:'0 20px', maxWidth:'600px', margin:'0 auto' }}>
          <div style={{ marginBottom:'20px', paddingTop:'16px' }}>
            <div style={{ fontSize:'11px', color:color, fontWeight:700, textTransform:'uppercase', letterSpacing:'2px', marginBottom:'8px' }}>{item.category}</div>
            <h1 style={{ fontSize:'26px', fontWeight:900, lineHeight:1.2, marginBottom:'12px' }}>{item.title}</h1>
            <div style={{ fontSize:'36px', fontWeight:900, color }}>Rs {item.price.toLocaleString()}</div>
          </div>

          <div style={{ display:'flex', gap:'10px', flexWrap:'wrap', marginBottom:'24px' }}>
            {[{icon:'📍',label:item.location},{icon:'✅',label:item.condition},{icon:'👤',label:item.seller_name}].map((p,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'6px', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', padding:'8px 14px', borderRadius:'50px', fontSize:'13px' }}>
                <span>{p.icon}</span> {p.label}
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

          {related.length > 0 && (
            <div style={{ marginBottom:'28px' }}>
              <h2 style={{ fontSize:'16px', fontWeight:800, marginBottom:'14px' }}>More in {item.category}</h2>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
                {related.map(rel => {
                  const relColor = categoryColors[rel.category] || '#ff6b35'
                  const relPhoto = rel.image_urls?.[0] || rel.image_url || null
                  return (
                    <Link key={rel.id} href={'/listings/'+rel.id} style={{ textDecoration:'none', color:'white' }}>
                      <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'16px', overflow:'hidden' }}>
                        <div style={{ height:'100px', overflow:'hidden', background:`${relColor}22`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                          {relPhoto
                            ? <img src={relPhoto} alt={rel.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                            : <span style={{ fontSize:'32px' }}>📦</span>
                          }
                        </div>
                        <div style={{ padding:'10px' }}>
                          <div style={{ fontSize:'12px', fontWeight:700, marginBottom:'4px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{rel.title}</div>
                          <div style={{ fontSize:'14px', fontWeight:900, color:relColor }}>Rs {rel.price.toLocaleString()}</div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:100, background:'rgba(5,5,16,0.97)', backdropFilter:'blur(30px)', borderTop:'1px solid rgba(255,255,255,0.06)', padding:'12px 20px 28px' }}>
        <div style={{ maxWidth:'600px', margin:'0 auto', display:'flex', gap:'12px', alignItems:'center' }}>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', marginBottom:'2px' }}>Asking price</div>
            <div style={{ fontSize:'22px', fontWeight:900, color }}>Rs {item.price.toLocaleString()}</div>
          </div>
          <a href={waLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration:'none', flex:2 }}>
            <button style={{ width:'100%', padding:'16px', borderRadius:'50px', border:'none', background:'linear-gradient(90deg,#25d366,#128c7e)', color:'white', fontWeight:800, fontSize:'16px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px' }}>
              <span>💬</span> WhatsApp Seller
            </button>
          </a>
        </div>
      </div>

      <style>{`* { margin:0; padding:0; box-sizing:border-box; } ::-webkit-scrollbar{width:0}`}</style>
    </main>
  )
}