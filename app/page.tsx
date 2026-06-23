'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const categories = [
  { name: "Furniture & Home", icon: "🛋️", count: "124", color: "#ff6b35", glow: "rgba(255,107,53,0.4)" },
  { name: "Appliances", icon: "🏠", count: "67", color: "#00d4ff", glow: "rgba(0,212,255,0.4)" },
  { name: "Clothing & Shoes", icon: "👗", count: "213", color: "#ff0080", glow: "rgba(255,0,128,0.4)" },
  { name: "Electronics", icon: "📱", count: "89", color: "#ffd700", glow: "rgba(255,215,0,0.4)" },
  { name: "Books & Hobbies", icon: "📚", count: "56", color: "#00ff88", glow: "rgba(0,255,136,0.4)" },
  { name: "Baby & Kids", icon: "🧸", count: "78", color: "#ff6b35", glow: "rgba(255,107,53,0.4)" },
  { name: "Vehicles", icon: "🚗", count: "45", color: "#b400ff", glow: "rgba(180,0,255,0.4)" },
  { name: "Garden & Outdoor", icon: "🌿", count: "34", color: "#00ff88", glow: "rgba(0,255,136,0.4)" },
  { name: "Everything Else", icon: "📦", count: "98", color: "#00d4ff", glow: "rgba(0,212,255,0.4)" },
]

const hotItems = [
  { id: 1, title: "Solid Wood Dining Table", price: "Rs 4,500", location: "Curepipe", badge: "Moving Sale", time: "2 min ago", color: "#ff6b35", glow: "rgba(255,107,53,0.3)", img: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&q=80" },
  { id: 2, title: "Samsung Washing Machine", price: "Rs 6,000", location: "Port Louis", badge: "Gently Used", time: "20 min ago", color: "#00d4ff", glow: "rgba(0,212,255,0.3)", img: "https://images.unsplash.com/photo-1626806787461-102c1a7f1b34?w=400&q=80" },
  { id: 3, title: "Baby Stroller & Cot", price: "Rs 2,800", location: "Rose Hill", badge: "Bargain", time: "1 hr ago", color: "#ff0080", glow: "rgba(255,0,128,0.3)", img: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&q=80" },
  { id: 4, title: "L-Shape Corner Sofa", price: "Rs 8,500", location: "Quatre Bornes", badge: "Must Go", time: "3 hr ago", color: "#ffd700", glow: "rgba(255,215,0,0.3)", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80" },
]

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  size: 2 + Math.random() * 3,
}))

export default function Home() {
  const [search, setSearch] = useState('')
  const [activeNav, setActiveNav] = useState('Home')
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 50)
    return () => clearInterval(t)
  }, [])

  return (
    <main style={{ minHeight: '100vh', background: '#050510', color: 'white', fontFamily: 'system-ui, sans-serif', paddingBottom: '90px', overflowX: 'hidden', position: 'relative' }}>

      {/* Animated Background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[
          { color: 'rgba(255,107,53,0.12)', x: '10%', y: '10%', size: '500px', speed: 0.0003 },
          { color: 'rgba(0,212,255,0.10)', x: '70%', y: '5%', size: '600px', speed: 0.0002 },
          { color: 'rgba(255,0,128,0.08)', x: '30%', y: '60%', size: '700px', speed: 0.00015 },
          { color: 'rgba(180,0,255,0.07)', x: '80%', y: '70%', size: '400px', speed: 0.00025 },
        ].map((orb, i) => (
          <div key={i} style={{ position: 'absolute', left: orb.x, top: orb.y, width: orb.size, height: orb.size, borderRadius: '50%', background: `radial-gradient(circle, ${orb.color}, transparent 70%)`, transform: `translate(${Math.sin(tick * orb.speed + i) * 40}px, ${Math.cos(tick * orb.speed + i) * 30}px)` }} />
        ))}
        {particles.map(p => (
          <div key={p.id} style={{ position: 'absolute', left: `${p.left}%`, bottom: `${((tick * 0.02 + p.delay * 50) % 120) - 10}%`, width: `${p.size}px`, height: `${p.size}px`, borderRadius: '50%', background: 'rgba(255,255,255,0.6)', boxShadow: '0 0 6px rgba(255,255,255,0.8)', opacity: 0.4 }} />
        ))}
      </div>

      {/* Header */}
      <header style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100, background: 'rgba(5,5,16,0.85)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #ff6b35, #ff0080)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 900, boxShadow: '0 0 20px rgba(255,107,53,0.5)' }}>B</div>
          <div style={{ fontSize: '22px', fontWeight: 900, background: 'linear-gradient(90deg, #ff6b35, #ffd700, #ff0080)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Babala</div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 10px #00ff88' }}></div>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginRight: '8px' }}>Live</span>
          <button style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '8px 16px', borderRadius: '50px', cursor: 'pointer', fontSize: '13px' }}>Login</button>
          <button style={{ background: 'linear-gradient(90deg, #ff6b35, #ff0080)', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '50px', cursor: 'pointer', fontWeight: 700, fontSize: '13px', boxShadow: '0 0 25px rgba(255,107,53,0.5)' }}>Sign Up</button>
        </div>
      </header>

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Hero */}
        <section style={{ padding: '60px 20px 40px', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.3)', borderRadius: '50px', padding: '6px 16px', fontSize: '11px', fontWeight: 700, letterSpacing: '3px', color: '#ff6b35', marginBottom: '24px', textTransform: 'uppercase' }}>
            🇲🇺 Mauritius People to People Marketplace
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 7vw, 58px)', fontWeight: 900, lineHeight: 1.05, marginBottom: '20px', letterSpacing: '-1.5px' }}>
            <span style={{ display: 'block', background: 'linear-gradient(90deg, #fff 0%, #a0c4ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Your neighbour is selling</span>
            <span style={{ display: 'block', background: 'linear-gradient(90deg, #ff6b35 0%, #ffd700 50%, #ff0080 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>something you need.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', maxWidth: '420px', margin: '0 auto 36px', lineHeight: 1.7 }}>
            Real people. Real homes. Real deals. Find second-hand treasures from families across Mauritius — furniture, appliances, clothes and more.
          </p>

          {/* Search */}
          <div style={{ maxWidth: '520px', margin: '0 auto', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: '-1px', borderRadius: '50px', background: 'linear-gradient(90deg, #ff6b35, #ff0080, #00d4ff)', opacity: 0.6, zIndex: 0 }}></div>
            <div style={{ position: 'relative', zIndex: 1, background: '#0d0d1f', borderRadius: '50px', padding: '2px' }}>
              <input type="text" placeholder="What are you looking for?" value={search} onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', padding: '16px 60px 16px 24px', borderRadius: '50px', border: 'none', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
              <button style={{ position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)', background: 'linear-gradient(90deg, #ff6b35, #ff0080)', border: 'none', color: 'white', width: '42px', height: '42px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px', boxShadow: '0 0 20px rgba(255,107,53,0.5)' }}>🔍</button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '0 20px 40px', maxWidth: '500px', margin: '0 auto' }}>
          {[
            { value: '2,400+', label: 'Items Listed', color: '#ff6b35' },
            { value: '1,800+', label: 'Local Sellers', color: '#00d4ff' },
            { value: '4,200+', label: 'Happy Buyers', color: '#ff0080' }
          ].map((stat, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center', padding: '16px', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
              <div style={{ fontSize: '26px', fontWeight: 900, color: stat.color, textShadow: `0 0 30px ${stat.color}` }}>{stat.value}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Fresh From Local Homes */}
        <section style={{ padding: '0 20px 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, margin: 0 }}>🏠 Fresh From Local Homes</h2>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', margin: '4px 0 0' }}>Posted today by people near you</p>
            </div>
            <Link href="/listings" style={{ color: '#00d4ff', fontSize: '13px', fontWeight: 600, textDecoration: 'none', background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)', padding: '6px 14px', borderRadius: '50px' }}>See All</Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {hotItems.map((item) => (
              <Link key={item.id} href={`/listings/${item.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                <div
                  style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', border: `1px solid ${item.color}33`, borderRadius: '20px', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: `0 8px 32px ${item.glow}` }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)'; e.currentTarget.style.borderColor = item.color }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = `${item.color}33` }}>
                  <div style={{ height: '130px', position: 'relative', overflow: 'hidden' }}>
                    <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(5,5,16,0.9))' }}></div>
                    <div style={{ position: 'absolute', top: '10px', left: '10px', background: item.color, padding: '3px 10px', borderRadius: '20px', fontSize: '9px', fontWeight: 800, color: '#000', boxShadow: `0 0 15px ${item.color}` }}>{item.badge}</div>
                    <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', padding: '3px 8px', borderRadius: '20px', fontSize: '9px', color: 'rgba(255,255,255,0.7)' }}>{item.time}</div>
                  </div>
                  <div style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '6px', lineHeight: 1.3 }}>{item.title}</div>
                    <div style={{ fontWeight: 900, fontSize: '17px', color: item.color, textShadow: `0 0 20px ${item.color}` }}>{item.price}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '6px' }}>📍 {item.location}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section style={{ padding: '0 20px 32px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '6px' }}>Browse by Category</h2>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '20px' }}>What are you looking for today?</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {categories.map((cat, i) => (
              <Link key={cat.name} href="/listings" style={{ textDecoration: 'none', color: 'white', gridColumn: i === 0 ? 'span 2' : 'span 1' }}>
                <div
                  style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', border: `1px solid ${cat.color}22`, borderRadius: '18px', padding: '18px 10px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s ease', height: '100%' }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${cat.color}15`; e.currentTarget.style.borderColor = cat.color; e.currentTarget.style.boxShadow = `0 0 30px ${cat.glow}`; e.currentTarget.style.transform = 'translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = `${cat.color}22`; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}>
                  <div style={{ fontSize: i === 0 ? '34px' : '24px' }}>{cat.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: '11px', marginTop: '8px', color: cat.color, lineHeight: 1.3 }}>{cat.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', marginTop: '3px' }}>{cat.count} items</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section style={{ padding: '0 20px 32px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '6px' }}>How Babala Works</h2>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '20px' }}>Simple, safe and local</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {[
              { icon: '📸', title: 'Snap & Post', desc: 'Take a photo and list your item in 60 seconds', color: '#ff6b35' },
              { icon: '💬', title: 'Chat & Agree', desc: 'Buyers contact you directly via WhatsApp', color: '#00d4ff' },
              { icon: '🤝', title: 'Meet & Sell', desc: 'Meet safely and hand over your item', color: '#00ff88' },
            ].map((step, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${step.color}22`, borderRadius: '18px', padding: '20px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{step.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '12px', color: step.color, marginBottom: '6px' }}>{step.title}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.4 }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Sell CTA */}
        <section style={{ padding: '0 20px 32px' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(255,107,53,0.15), rgba(255,0,128,0.15))', border: '1px solid rgba(255,107,53,0.3)', borderRadius: '24px', padding: '28px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(255,107,53,0.2), transparent)', borderRadius: '50%' }}></div>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🏠</div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>Got things at home collecting dust?</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginBottom: '20px', lineHeight: 1.6 }}>Turn your unused items into cash. List anything from your home — furniture, clothes, appliances and more. Free to post, always.</p>
            <Link href="/sell" style={{ textDecoration: 'none' }}>
              <button style={{ background: 'linear-gradient(90deg, #ff6b35, #ff0080)', border: 'none', color: 'white', padding: '14px 32px', borderRadius: '50px', fontWeight: 800, fontSize: '15px', cursor: 'pointer', boxShadow: '0 0 40px rgba(255,107,53,0.5)' }}>
                Post Your Item Free
              </button>
            </Link>
          </div>
        </section>

      </div>

      {/* Bottom Nav */}
      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'rgba(5,5,16,0.97)', backdropFilter: 'blur(30px)', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-around', padding: '10px 0 14px', zIndex: 100 }}>
        {[
          { icon: '🏠', label: 'Home', href: '/', color: '#ff6b35' },
          { icon: '🔍', label: 'Browse', href: '/listings', color: '#00d4ff' },
          { icon: '➕', label: 'Sell', href: '/sell', color: '#ffd700' },
          { icon: '💬', label: 'Chats', href: '/chats', color: '#ff0080' },
          { icon: '👤', label: 'Profile', href: '/profile', color: '#00ff88' },
        ].map((nav) => (
          <Link key={nav.label} href={nav.href} style={{ textDecoration: 'none', color: 'white', textAlign: 'center', flex: 1 }} onClick={() => setActiveNav(nav.label)}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{ fontSize: '22px', filter: activeNav === nav.label ? `drop-shadow(0 0 8px ${nav.color})` : 'none', transition: 'filter 0.3s' }}>{nav.icon}</div>
              <div style={{ fontSize: '10px', color: activeNav === nav.label ? nav.color : 'rgba(255,255,255,0.3)', fontWeight: activeNav === nav.label ? 700 : 400 }}>{nav.label}</div>
              {activeNav === nav.label && <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: nav.color, boxShadow: `0 0 8px ${nav.color}` }}></div>}
            </div>
          </Link>
        ))}
      </nav>

      <style>{`* { margin: 0; padding: 0; box-sizing: border-box; } input::placeholder { color: rgba(255,255,255,0.3); } ::-webkit-scrollbar { width: 0; }`}</style>
    </main>
  )
}
