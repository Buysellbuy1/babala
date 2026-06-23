'use client'
import Link from 'next/link'
import { useState, useEffect, useMemo } from 'react'
import { supabase } from '../../lib/supabase'

const categories = [
  "All", "Furniture & Home", "Appliances", "Clothing & Shoes",
  "Electronics", "Books & Hobbies", "Baby & Kids", "Vehicles",
  "Garden & Outdoor", "Everything Else"
]

const categoryIcons: Record<string, string> = {
  "All": "🔥", "Furniture & Home": "🛋️", "Appliances": "🏠",
  "Clothing & Shoes": "👗", "Electronics": "📱", "Books & Hobbies": "📚",
  "Baby & Kids": "🧸", "Vehicles": "🚗", "Garden & Outdoor": "🌿", "Everything Else": "📦"
}

const categoryColors: Record<string, string> = {
  "Furniture & Home": "#ff6b35", "Appliances": "#00d4ff", "Clothing & Shoes": "#ff0080",
  "Electronics": "#ffd700", "Books & Hobbies": "#00ff88", "Baby & Kids": "#ff6b35",
  "Vehicles": "#b400ff", "Garden & Outdoor": "#00ff88", "Everything Else": "#00d4ff", "All": "#ff6b35"
}

const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low"]

export default function ListingsPage() {
  const [allItems, setAllItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortBy, setSortBy] = useState('Newest')
  const [maxPrice, setMaxPrice] = useState(300000)
  const [showFilters, setShowFilters] = useState(false)
  const [activeNav, setActiveNav] = useState('Browse')

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) console.error(error)
      else setAllItems(data || [])
      setLoading(false)
    }
    fetchListings()
  }, [])

  const filtered = useMemo(() => {
    let items = [...allItems]
    if (search) items = items.filter(i => i.title.toLowerCase().includes(search.toLowerCase()))
    if (activeCategory !== 'All') items = items.filter(i => i.category === activeCategory)
    items = items.filter(i => i.price <= maxPrice)
    if (sortBy === 'Price: Low to High') items.sort((a, b) => a.price - b.price)
    else if (sortBy === 'Price: High to Low') items.sort((a, b) => b.price - a.price)
    return items
  }, [allItems, search, activeCategory, sortBy, maxPrice])

  const formatPrice = (p: number) =>
    p >= 1000 ? `Rs ${(p / 1000).toFixed(p % 1000 === 0 ? 0 : 1)}k` : `Rs ${p}`

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    return `${Math.floor(hrs / 24)}d ago`
  }

  return (
    <main style={{ minHeight:'100vh', background:'#050510', color:'white', fontFamily:'system-ui,sans-serif', paddingBottom:'100px', overflowX:'hidden' }}>
      <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden' }}>
        <div style={{ position:'absolute', left:'20%', top:'10%', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle,rgba(0,212,255,0.07),transparent 70%)' }} />
        <div style={{ position:'absolute', right:'10%', bottom:'20%', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle,rgba(255,107,53,0.06),transparent 70%)' }} />
      </div>

      <header style={{ padding:'16px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, zIndex:100, background:'rgba(5,5,16,0.92)', backdropFilter:'blur(24px)', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:'10px' }}>
          <div style={{ width:'36px', height:'36px', borderRadius:'10px', background:'linear-gradient(135deg,#ff6b35,#ff0080)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', fontWeight:900, boxShadow:'0 0 20px rgba(255,107,53,0.5)' }}>B</div>
          <div style={{ fontSize:'22px', fontWeight:900, background:'linear-gradient(90deg,#ff6b35,#ffd700,#ff0080)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Babala</div>
        </Link>
        <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
          <button onClick={() => setShowFilters(f => !f)}
            style={{ background: showFilters?'rgba(255,107,53,0.2)':'rgba(255,255,255,0.06)', border:`1px solid ${showFilters?'#ff6b35':'rgba(255,255,255,0.1)'}`, color: showFilters?'#ff6b35':'white', padding:'8px 16px', borderRadius:'50px', cursor:'pointer', fontSize:'13px', fontWeight:600 }}>
            ⚡ Filters {showFilters?'▲':'▼'}
          </button>
          <Link href="/sell" style={{ textDecoration:'none' }}>
            <button style={{ background:'linear-gradient(90deg,#ff6b35,#ff0080)', border:'none', color:'white', padding:'8px 16px', borderRadius:'50px', cursor:'pointer', fontWeight:700, fontSize:'13px' }}>+ Sell</button>
          </Link>
        </div>
      </header>

      <div style={{ position:'relative', zIndex:1 }}>
        <div style={{ padding:'16px 20px 0' }}>
          <div style={{ position:'relative', maxWidth:'600px', margin:'0 auto' }}>
            <div style={{ position:'absolute', inset:'-1px', borderRadius:'50px', background:'linear-gradient(90deg,#ff6b35,#ff0080,#00d4ff)', opacity:0.5, zIndex:0 }} />
            <div style={{ position:'relative', zIndex:1, background:'#0d0d1f', borderRadius:'50px', padding:'2px' }}>
              <input type="text" placeholder="Search listings..." value={search} onChange={e => setSearch(e.target.value)}
                style={{ width:'100%', padding:'14px 50px 14px 22px', borderRadius:'50px', border:'none', background:'rgba(255,255,255,0.05)', color:'white', fontSize:'14px', outline:'none', boxSizing:'border-box' }} />
              <span style={{ position:'absolute', right:'18px', top:'50%', transform:'translateY(-50%)', fontSize:'16px' }}>🔍</span>
            </div>
          </div>
        </div>

        {showFilters && (
          <div style={{ margin:'16px 20px', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'20px', padding:'20px' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
              <div>
                <div style={{ fontSize:'11px', fontWeight:700, color:'rgba(255,255,255,0.4)', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'10px' }}>Sort By</div>
                <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
                  {sortOptions.map(s => (
                    <button key={s} onClick={() => setSortBy(s)}
                      style={{ background: sortBy===s?'rgba(255,107,53,0.15)':'rgba(255,255,255,0.04)', border:`1px solid ${sortBy===s?'#ff6b35':'rgba(255,255,255,0.08)'}`, color: sortBy===s?'#ff6b35':'rgba(255,255,255,0.6)', padding:'8px 12px', borderRadius:'10px', cursor:'pointer', fontSize:'12px', fontWeight: sortBy===s?700:400, textAlign:'left' }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize:'11px', fontWeight:700, color:'rgba(255,255,255,0.4)', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'10px' }}>Max Price: <span style={{ color:'#ffd700' }}>Rs {maxPrice.toLocaleString()}</span></div>
                <input type="range" min={500} max={300000} step={500} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}
                  style={{ width:'100%', accentColor:'#ff6b35', cursor:'pointer', marginTop:'8px' }} />
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:'11px', color:'rgba(255,255,255,0.3)', marginTop:'4px' }}>
                  <span>Rs 500</span><span>Rs 300,000</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={{ padding:'16px 20px 0', overflowX:'auto', display:'flex', gap:'8px' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{ flexShrink:0, background: activeCategory===cat?'linear-gradient(90deg,#ff6b35,#ff0080)':'rgba(255,255,255,0.05)', border:`1px solid ${activeCategory===cat?'transparent':'rgba(255,255,255,0.08)'}`, color:'white', padding:'8px 16px', borderRadius:'50px', cursor:'pointer', fontSize:'12px', fontWeight: activeCategory===cat?700:400, display:'flex', alignItems:'center', gap:'6px', whiteSpace:'nowrap', transition:'all 0.2s' }}>
              <span>{categoryIcons[cat]}</span> {cat}
            </button>
          ))}
        </div>

        <div style={{ padding:'16px 20px 12px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.4)' }}>
            <span style={{ color:'#ff6b35', fontWeight:700 }}>{filtered.length}</span> listings found
          </div>
          {(activeCategory !== 'All' || search) && (
            <button onClick={() => { setActiveCategory('All'); setSearch(''); setMaxPrice(300000) }}
              style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.5)', padding:'4px 12px', borderRadius:'20px', cursor:'pointer', fontSize:'11px' }}>
              Clear all ×
            </button>
          )}
        </div>

        {loading ? (
          <div style={{ textAlign:'center', padding:'60px 20px' }}>
            <div style={{ fontSize:'40px', marginBottom:'16px' }}>⏳</div>
            <div style={{ color:'rgba(255,255,255,0.4)', fontSize:'14px' }}>Loading listings...</div>
          </div>
        ) : (
          <div style={{ padding:'0 20px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }}>
            {filtered.length === 0 ? (
              <div style={{ gridColumn:'span 2', textAlign:'center', padding:'60px 20px' }}>
                <div style={{ fontSize:'48px', marginBottom:'16px' }}>🔍</div>
                <div style={{ fontSize:'18px', fontWeight:700, marginBottom:'8px' }}>No listings yet</div>
                <div style={{ color:'rgba(255,255,255,0.4)', fontSize:'14px', marginBottom:'20px' }}>Be the first to post!</div>
                <Link href="/sell" style={{ textDecoration:'none' }}>
                  <button style={{ background:'linear-gradient(90deg,#ff6b35,#ff0080)', border:'none', color:'white', padding:'12px 28px', borderRadius:'50px', fontWeight:700, cursor:'pointer', fontSize:'14px' }}>+ Post a Listing</button>
                </Link>
              </div>
            ) : filtered.map((item) => {
              const color = categoryColors[item.category] || '#ff6b35'
              return (
                <Link key={item.id} href={'/listings/'+item.id} style={{ textDecoration:'none', color:'white' }}>
                  <div style={{ background:'rgba(255,255,255,0.04)', backdropFilter:'blur(20px)', border:`1px solid ${color}33`, borderRadius:'20px', overflow:'hidden', cursor:'pointer', transition:'all 0.3s ease', boxShadow:`0 6px 24px ${color}22` }}
                    onMouseEnter={e => { e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.borderColor=color }}
                    onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.borderColor=`${color}33` }}>
                    <div style={{ height:'140px', position:'relative', overflow:'hidden', background:`${color}22` }}>
                      {item.image_url
                        ? <img src={item.image_url} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                        : <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'40px' }}>{categoryIcons[item.category] || '📦'}</div>
                      }
                      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,transparent 40%,rgba(5,5,16,0.85))' }} />
                      <div style={{ position:'absolute', top:'10px', left:'10px', background:color, padding:'3px 10px', borderRadius:'20px', fontSize:'9px', fontWeight:800, color:'#000' }}>{item.badge || item.condition}</div>
                      <div style={{ position:'absolute', top:'10px', right:'10px', background:'rgba(0,0,0,0.6)', padding:'3px 8px', borderRadius:'20px', fontSize:'9px', color:'rgba(255,255,255,0.7)' }}>{timeAgo(item.created_at)}</div>
                    </div>
                    <div style={{ padding:'12px' }}>
                      <div style={{ fontWeight:700, fontSize:'13px', marginBottom:'6px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.title}</div>
                      <div style={{ fontWeight:900, fontSize:'18px', color, textShadow:`0 0 20px ${color}` }}>{formatPrice(item.price)}</div>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'8px' }}>
                        <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)' }}>📍 {item.location}</div>
                        <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.3)' }}>👤 {item.seller_name}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>

      <nav style={{ position:'fixed', bottom:0, left:0, right:0, background:'rgba(5,5,16,0.97)', backdropFilter:'blur(30px)', borderTop:'1px solid rgba(255,255,255,0.06)', display:'flex', justifyContent:'space-around', padding:'10px 0 14px', zIndex:100 }}>
        {[{ icon:'🏠', label:'Home', href:'/', color:'#ff6b35' },{ icon:'🔍', label:'Browse', href:'/listings', color:'#00d4ff' },{ icon:'➕', label:'Sell', href:'/sell', color:'#ffd700' },{ icon:'💬', label:'Chats', href:'/chats', color:'#ff0080' },{ icon:'👤', label:'Profile', href:'/profile', color:'#00ff88' }].map(nav => (
          <Link key={nav.label} href={nav.href} style={{ textDecoration:'none', color:'white', textAlign:'center', flex:1 }} onClick={() => setActiveNav(nav.label)}>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'4px' }}>
              <div style={{ fontSize:'22px', filter: activeNav===nav.label?`drop-shadow(0 0 8px ${nav.color})`:'none' }}>{nav.icon}</div>
              <div style={{ fontSize:'10px', color: activeNav===nav.label?nav.color:'rgba(255,255,255,0.3)', fontWeight: activeNav===nav.label?700:400 }}>{nav.label}</div>
              {activeNav===nav.label && <div style={{ width:'4px', height:'4px', borderRadius:'50%', background:nav.color }} />}
            </div>
          </Link>
        ))}
      </nav>

      <style>{`* { margin:0; padding:0; box-sizing:border-box; } input::placeholder { color:rgba(255,255,255,0.3); } ::-webkit-scrollbar{width:0;height:0}`}</style>
    </main>
  )
}