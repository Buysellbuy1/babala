'use client'
import Link from 'next/link'
import { useState, useMemo } from 'react'

const allItems = [
  { id: 1, title: "Solid Wood Dining Table", price: 4500, location: "Curepipe", category: "Furniture & Home", condition: "Good", badge: "Moving Sale", time: "2 min ago", color: "#ff6b35", img: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&q=80", seller: "Raj D." },
  { id: 2, title: "Samsung Washing Machine", price: 6000, location: "Port Louis", category: "Appliances", condition: "Like New", badge: "Gently Used", time: "20 min ago", color: "#00d4ff", img: "https://images.unsplash.com/photo-1626806787461-102c1a7f1b34?w=400&q=80", seller: "Marie C." },
  { id: 3, title: "Baby Stroller & Cot", price: 2800, location: "Rose Hill", category: "Baby & Kids", condition: "Good", badge: "Bargain", time: "1 hr ago", color: "#ff0080", img: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&q=80", seller: "Priya N." },
  { id: 4, title: "L-Shape Corner Sofa", price: 8500, location: "Quatre Bornes", category: "Furniture & Home", condition: "Good", badge: "Must Go", time: "3 hr ago", color: "#ffd700", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80", seller: "Dev R." },
  { id: 5, title: "iPhone 13 Pro 256GB", price: 12000, location: "Grand Baie", category: "Electronics", condition: "Like New", badge: "Hot Deal", time: "5 hr ago", color: "#00ff88", img: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400&q=80", seller: "Kevin B." },
  { id: 6, title: "Men's Mountain Bike", price: 3200, location: "Vacoas", category: "Garden & Outdoor", condition: "Good", badge: "Sport", time: "6 hr ago", color: "#b400ff", img: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400&q=80", seller: "Alain F." },
  { id: 7, title: "Vintage Book Collection (50+)", price: 800, location: "Moka", category: "Books & Hobbies", condition: "Fair", badge: "Rare Find", time: "8 hr ago", color: "#00ff88", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80", seller: "Sophie L." },
  { id: 8, title: "Ladies Dress Bundle (Size M)", price: 600, location: "Curepipe", category: "Clothing & Shoes", condition: "Like New", badge: "Bundle", time: "10 hr ago", color: "#ff0080", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", seller: "Nadia A." },
  { id: 9, title: "LG 43\" Smart TV", price: 7500, location: "Mahébourg", category: "Electronics", condition: "Good", badge: "Smart TV", time: "12 hr ago", color: "#ffd700", img: "https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=400&q=80", seller: "Chris M." },
  { id: 10, title: "Garden Furniture Set", price: 5000, location: "Tamarin", category: "Garden & Outdoor", condition: "Good", badge: "Outdoor", time: "1 day ago", color: "#00ff88", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=400&q=80", seller: "Paul T." },
  { id: 11, title: "Kids Toy Bundle", price: 500, location: "Triolet", category: "Baby & Kids", condition: "Good", badge: "Kids", time: "1 day ago", color: "#ff6b35", img: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80", seller: "Anita S." },
  { id: 12, title: "Toyota Vitz 2015", price: 285000, location: "Port Louis", category: "Vehicles", condition: "Good", badge: "Low KM", time: "1 day ago", color: "#b400ff", img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&q=80", seller: "Yann B." },
  { id: 13, title: "Air Fryer Philips XL", price: 2200, location: "Quatre Bornes", category: "Appliances", condition: "Like New", badge: "Kitchen", time: "2 days ago", color: "#00d4ff", img: "https://images.unsplash.com/photo-1648704985460-28c28be6f5e8?w=400&q=80", seller: "Lisa P." },
  { id: 14, title: "Wooden Wardrobe 3-Door", price: 3800, location: "Rose Hill", category: "Furniture & Home", condition: "Good", badge: "Solid Wood", time: "2 days ago", color: "#ff6b35", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80", seller: "Marc D." },
  { id: 15, title: "Nike Sneakers Size 42", price: 1200, location: "Grand Baie", category: "Clothing & Shoes", condition: "Like New", badge: "Nike", time: "2 days ago", color: "#ff0080", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80", seller: "Sam K." },
  { id: 16, title: "PlayStation 5 + 2 Controllers", price: 18000, location: "Vacoas", category: "Electronics", condition: "Like New", badge: "Gaming", time: "3 days ago", color: "#ffd700", img: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&q=80", seller: "Ronny V." },
]

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

const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low"]

const locations = [
  "All Areas", "Port Louis", "Curepipe", "Rose Hill", "Quatre Bornes",
  "Vacoas", "Grand Baie", "Moka", "Mahébourg", "Tamarin", "Triolet"
]

export default function ListingsPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeLocation, setActiveLocation] = useState('All Areas')
  const [sortBy, setSortBy] = useState('Newest')
  const [maxPrice, setMaxPrice] = useState(300000)
  const [showFilters, setShowFilters] = useState(false)
  const [activeNav, setActiveNav] = useState('Browse')

  const filtered = useMemo(() => {
    let items = [...allItems]
    if (search) items = items.filter(i => i.title.toLowerCase().includes(search.toLowerCase()))
    if (activeCategory !== 'All') items = items.filter(i => i.category === activeCategory)
    if (activeLocation !== 'All Areas') items = items.filter(i => i.location === activeLocation)
    items = items.filter(i => i.price <= maxPrice)
    if (sortBy === 'Price: Low to High') items.sort((a, b) => a.price - b.price)
    else if (sortBy === 'Price: High to Low') items.sort((a, b) => b.price - a.price)
    return items
  }, [search, activeCategory, activeLocation, sortBy, maxPrice])

  const formatPrice = (p: number) =>
    p >= 1000 ? `Rs ${(p / 1000).toFixed(p % 1000 === 0 ? 0 : 1)}k` : `Rs ${p}`

  return (
    <main style={{ minHeight: '100vh', background: '#050510', color: 'white', fontFamily: 'system-ui, sans-serif', paddingBottom: '100px', overflowX: 'hidden' }}>

      {/* Background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: '20%', top: '10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.07), transparent 70%)' }} />
        <div style={{ position: 'absolute', right: '10%', bottom: '20%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,53,0.06), transparent 70%)' }} />
      </div>

      {/* Header */}
      <header style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100, background: 'rgba(5,5,16,0.92)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #ff6b35, #ff0080)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 900, boxShadow: '0 0 20px rgba(255,107,53,0.5)' }}>B</div>
          <div style={{ fontSize: '22px', fontWeight: 900, background: 'linear-gradient(90deg, #ff6b35, #ffd700, #ff0080)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Babala</div>
        </Link>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button onClick={() => setShowFilters(f => !f)}
            style={{ background: showFilters ? 'rgba(255,107,53,0.2)' : 'rgba(255,255,255,0.06)', border: `1px solid ${showFilters ? '#ff6b35' : 'rgba(255,255,255,0.1)'}`, color: showFilters ? '#ff6b35' : 'white', padding: '8px 16px', borderRadius: '50px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
            ⚡ Filters {showFilters ? '▲' : '▼'}
          </button>
          <Link href="/sell" style={{ textDecoration: 'none' }}>
            <button style={{ background: 'linear-gradient(90deg, #ff6b35, #ff0080)', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '50px', cursor: 'pointer', fontWeight: 700, fontSize: '13px', boxShadow: '0 0 20px rgba(255,107,53,0.4)' }}>+ Sell</button>
          </Link>
        </div>
      </header>

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Search */}
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ position: 'absolute', inset: '-1px', borderRadius: '50px', background: 'linear-gradient(90deg, #ff6b35, #ff0080, #00d4ff)', opacity: 0.5, zIndex: 0 }} />
            <div style={{ position: 'relative', zIndex: 1, background: '#0d0d1f', borderRadius: '50px', padding: '2px' }}>
              <input type="text" placeholder="Search listings..." value={search} onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', padding: '14px 50px 14px 22px', borderRadius: '50px', border: 'none', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
              <span style={{ position: 'absolute', right: '18px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px' }}>🔍</span>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div style={{ margin: '16px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Sort By</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {sortOptions.map(s => (
                    <button key={s} onClick={() => setSortBy(s)}
                      style={{ background: sortBy === s ? 'rgba(255,107,53,0.15)' : 'rgba(255,255,255,0.04)', border: `1px solid ${sortBy === s ? '#ff6b35' : 'rgba(255,255,255,0.08)'}`, color: sortBy === s ? '#ff6b35' : 'rgba(255,255,255,0.6)', padding: '8px 12px', borderRadius: '10px', cursor: 'pointer', fontSize: '12px', fontWeight: sortBy === s ? 700 : 400, textAlign: 'left' }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Location</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '140px', overflowY: 'auto' }}>
                  {locations.map(l => (
                    <button key={l} onClick={() => setActiveLocation(l)}
                      style={{ background: activeLocation === l ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.04)', border: `1px solid ${activeLocation === l ? '#00d4ff' : 'rgba(255,255,255,0.08)'}`, color: activeLocation === l ? '#00d4ff' : 'rgba(255,255,255,0.6)', padding: '8px 12px', borderRadius: '10px', cursor: 'pointer', fontSize: '12px', fontWeight: activeLocation === l ? 700 : 400, textAlign: 'left' }}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ marginTop: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
                Max Price: <span style={{ color: '#ffd700' }}>Rs {maxPrice.toLocaleString()}</span>
              </div>
              <input type="range" min={500} max={300000} step={500} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#ff6b35', cursor: 'pointer' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>
                <span>Rs 500</span><span>Rs 300,000</span>
              </div>
            </div>
          </div>
        )}

        {/* Category Pills */}
        <div style={{ padding: '16px 20px 0', overflowX: 'auto', display: 'flex', gap: '8px' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{ flexShrink: 0, background: activeCategory === cat ? 'linear-gradient(90deg, #ff6b35, #ff0080)' : 'rgba(255,255,255,0.05)', border: `1px solid ${activeCategory === cat ? 'transparent' : 'rgba(255,255,255,0.08)'}`, color: 'white', padding: '8px 16px', borderRadius: '50px', cursor: 'pointer', fontSize: '12px', fontWeight: activeCategory === cat ? 700 : 400, display: 'flex', alignItems: 'center', gap: '6px', boxShadow: activeCategory === cat ? '0 0 20px rgba(255,107,53,0.4)' : 'none', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
              <span>{categoryIcons[cat]}</span> {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div style={{ padding: '16px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
            <span style={{ color: '#ff6b35', fontWeight: 700 }}>{filtered.length}</span> listings found
            {activeCategory !== 'All' && <span> in <span style={{ color: 'white' }}>{activeCategory}</span></span>}
            {activeLocation !== 'All Areas' && <span> · <span style={{ color: 'white' }}>{activeLocation}</span></span>}
          </div>
          {(activeCategory !== 'All' || activeLocation !== 'All Areas' || search) && (
            <button onClick={() => { setActiveCategory('All'); setActiveLocation('All Areas'); setSearch(''); setMaxPrice(300000) }}
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', padding: '4px 12px', borderRadius: '20px', cursor: 'pointer', fontSize: '11px' }}>
              Clear all ×
            </button>
          )}
        </div>

        {/* Grid */}
        <div style={{ padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          {filtered.length === 0 ? (
            <div style={{ gridColumn: 'span 2', textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
              <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>No listings found</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Try adjusting your filters</div>
            </div>
          ) : filtered.map((item) => (
            <Link key={item.id} href={`/listings/${item.id}`} style={{ textDecoration: 'none', color: 'white' }}>
              <div
                style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', border: `1px solid ${item.color}33`, borderRadius: '20px', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: `0 6px 24px ${item.color}22` }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)'; e.currentTarget.style.borderColor = item.color; e.currentTarget.style.boxShadow = `0 12px 40px ${item.color}44` }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = `${item.color}33`; e.currentTarget.style.boxShadow = `0 6px 24px ${item.color}22` }}>
                <div style={{ height: '140px', position: 'relative', overflow: 'hidden' }}>
                  <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(5,5,16,0.85))' }} />
                  <div style={{ position: 'absolute', top: '10px', left: '10px', background: item.color, padding: '3px 10px', borderRadius: '20px', fontSize: '9px', fontWeight: 800, color: '#000', boxShadow: `0 0 12px ${item.color}` }}>{item.badge}</div>
                  <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', padding: '3px 8px', borderRadius: '20px', fontSize: '9px', color: 'rgba(255,255,255,0.7)' }}>{item.time}</div>
                  <div style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', padding: '2px 8px', borderRadius: '10px', fontSize: '9px', color: 'rgba(255,255,255,0.6)' }}>{item.condition}</div>
                </div>
                <div style={{ padding: '12px' }}>
                  <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '6px', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</div>
                  <div style={{ fontWeight: 900, fontSize: '18px', color: item.color, textShadow: `0 0 20px ${item.color}` }}>{formatPrice(item.price)}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>📍 {item.location}</div>
                    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>👤 {item.seller}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ height: '20px' }} />
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
              {activeNav === nav.label && <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: nav.color, boxShadow: `0 0 8px ${nav.color}` }} />}
            </div>
          </Link>
        ))}
      </nav>

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        input::placeholder { color: rgba(255,255,255,0.3); }
        ::-webkit-scrollbar { width: 0; height: 0; }
      `}</style>
    </main>
  )
}
