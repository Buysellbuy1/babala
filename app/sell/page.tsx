'use client'
import Link from 'next/link'
import { useState, useRef } from 'react'
import { supabase } from '../../lib/supabase'

const categories = [
  { name: "Furniture & Home", icon: "🛋️", color: "#ff6b35" },
  { name: "Appliances", icon: "🏠", color: "#00d4ff" },
  { name: "Clothing & Shoes", icon: "👗", color: "#ff0080" },
  { name: "Electronics", icon: "📱", color: "#ffd700" },
  { name: "Books & Hobbies", icon: "📚", color: "#00ff88" },
  { name: "Baby & Kids", icon: "🧸", color: "#ff6b35" },
  { name: "Vehicles", icon: "🚗", color: "#b400ff" },
  { name: "Garden & Outdoor", icon: "🌿", color: "#00ff88" },
  { name: "Everything Else", icon: "📦", color: "#00d4ff" },
]

const conditions = [
  { label: "Brand New", desc: "Never used", icon: "✨", color: "#00ff88" },
  { label: "Like New", desc: "Barely used", icon: "⭐", color: "#00d4ff" },
  { label: "Good", desc: "Some wear", icon: "👍", color: "#ffd700" },
  { label: "Fair", desc: "Visible use", icon: "🔧", color: "#ff6b35" },
]

const locationsByDistrict: Record<string, string[]> = {
  "Port Louis": ["Port Louis", "Pailles", "Long Mountain"],
  "Plaines Wilhems": ["Beau Bassin-Rose Hill", "Curepipe", "Quatre Bornes", "Vacoas-Phoenix", "Cascavelle", "Floréal", "Midlands", "Seizième Mille"],
  "Pamplemousses": ["Arsenal", "Baie du Tombeau", "Belle Vue Maurel", "Calebasses", "Congomah", "Crève Coeur", "D'Épinay", "Fond du Sac", "Grand Baie", "Le Hochet", "Mapou", "Mont Choisy", "Montagne Longue", "Morcellement St. André", "Notre Dame", "Pamplemousses", "Péreybère", "Piton", "Plaine des Papayes", "Pointe aux Canonniers", "Pointe Aux Piments", "Ripailles", "Terre Rouge", "Triolet", "Trou aux Biches", "Ville Bague"],
  "Rivière du Rempart": ["Amaury", "Amitié-Gokhoola", "Anse La Raie", "Brisée Verdière", "Cap Malheureux", "Cottage", "Espérance Trébuchet", "Goodlands", "Grand Gaube", "Petit Raffray", "Plaine des Roches", "Poudre d'Or", "Poudre d'Or Hamlet", "Rivière du Rempart", "Roche Terre", "Roches Noires", "The Vale", "Ville Bague"],
  "Flacq": ["Bel Air Rivière Sèche", "Belle Mare", "Bon Accueil", "Bramsthan", "Brisée Verdière", "Camp de Masque", "Camp de Masque Pavé", "Camp Ithier", "Centre de Flacq", "Clémencia", "Dubreuil", "Écroignard", "Grande Retraite", "Grand River South East", "Lalmatie", "Laventure", "Mare La Chaux", "Médine (Camp de Masque)", "Montagne Blanche", "Olivia", "Plaine des Roches", "Poste de Flacq", "Quatre Cocos", "Quatre Soeurs", "Queen Victoria", "St. Julien (Haut de Flacq)", "St. Julien D'Hotman", "Sébastopol", "Trou d'Eau Douce"],
  "Moka": ["Camp Thorel", "Dagotière", "Dubreuil", "Espérance", "L'Avenir", "La Laura-Malenga", "Médine (Camp de Masque)", "Melrose", "Moka", "Montagne Blanche", "Nouvelle Découverte", "Providence", "Quartier Militaire", "Ripailles", "St. Julien D'Hotman", "St. Pierre", "Verdun"],
  "Grand Port": ["Bambous Virieux", "Bananes", "Beau Vallon", "Bois des Amourettes", "Camp Carol", "Cluny", "Grand Bel Air", "Grand Sable", "L'Escalier", "La Flora", "Mahébourg", "Mare D'Albert", "Mare Tabac", "New Grove", "Nouvelle France", "Old Grand Port", "Petit Bel Air", "Plaine Magnien", "Pointe d'Esny", "Rivière des Créoles", "Rivière du Poste", "Rose Belle", "St. Hubert", "Trois Boutiques", "Union Park"],
  "Savanne": ["Baie du Cap", "Bénarès", "Bel Ombre", "Bois Chéri", "Britannia", "Camp Diable", "Chamouny", "Chemin Grenier", "Grand Bois", "L'Escalier", "La Flora", "Rivière des Anguilles", "Rivière du Poste", "St. Aubin", "Souillac", "Surinam", "Tyack"],
  "Rivière Noire (Black River)": ["Albion", "Bambous", "Cascavelle", "Case Noyale", "Chamarel", "Flic en Flac", "Grande Rivière Noire", "Gros Cailloux", "La Gaulette", "La Preneuse", "Le Morne", "Petite Rivière", "Richelieu", "Tamarin"],
}

const allLocations = Object.entries(locationsByDistrict).flatMap(([district, places]) =>
  places.map(p => ({ place: p, district }))
).sort((a, b) => a.place.localeCompare(b.place))

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.5)',
  textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px'
}
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '15px 18px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: '15px', outline: 'none', boxSizing: 'border-box'
}

export default function SellPage() {
  const [step, setStep] = useState(1)
  const [images, setImages] = useState<string[]>([])
  const fileListRef = useRef<File[]>([])
  const [form, setForm] = useState({ title: '', category: '', condition: '', price: '', description: '', location: '', whatsapp: '', name: '' })
  const [locationSearch, setLocationSearch] = useState('')
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeNav, setActiveNav] = useState('Sell')

  const update = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }))

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const previews = files.map(f => URL.createObjectURL(f))
    setImages(prev => [...prev, ...previews].slice(0, 6))
    fileListRef.current = [...fileListRef.current, ...files].slice(0, 6)
  }

  const removeImage = (i: number) => {
    setImages(prev => prev.filter((_, idx) => idx !== i))
    fileListRef.current = fileListRef.current.filter((_, idx) => idx !== i)
  }

  const filteredLocations = locationSearch.length > 0
    ? allLocations.filter(l => l.place.toLowerCase().includes(locationSearch.toLowerCase()))
    : allLocations

  const canNext1 = images.length > 0 && form.title && form.category && form.condition
  const canNext2 = form.price && form.location && form.description
  const canSubmit = form.whatsapp && form.name

  const handleSubmit = async () => {
    if (!canSubmit) return
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const image_urls: string[] = []

      for (const file of fileListRef.current) {
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${file.name.split('.').pop()}`
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('Listings-images')
          .upload(fileName, file, { contentType: file.type })
        if (!uploadError && uploadData) {
          const { data: urlData } = supabase.storage
            .from('Listings-images')
            .getPublicUrl(uploadData.path)
          image_urls.push(urlData.publicUrl)
        }
      }

      const { error } = await supabase.from('listings').insert({
        title: form.title,
        price: Number(form.price),
        category: form.category,
        condition: form.condition,
        location: form.location,
        description: form.description,
        whatsapp: form.whatsapp,
        seller_name: form.name,
        badge: form.condition === 'Brand New' ? 'New' : form.condition === 'Like New' ? 'Like New' : 'Used',
        user_id: user?.id ?? null,
        image_url: image_urls[0] || null,
        image_urls,
      })
      if (error) console.error('Listing error:', error)
      else setSubmitted(true)
    } catch (err) {
      console.error('Error:', err)
    }
    setLoading(false)
  }

  const resetForm = () => {
    setSubmitted(false); setStep(1)
    setForm({ title: '', category: '', condition: '', price: '', description: '', location: '', whatsapp: '', name: '' })
    setImages([]); fileListRef.current = []; setLocationSearch('')
  }

  if (submitted) {
    return (
      <main style={{ minHeight:'100vh', background:'#050510', color:'white', fontFamily:'system-ui,sans-serif', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'20px', textAlign:'center' }}>
        <div style={{ fontSize:'80px', marginBottom:'24px', filter:'drop-shadow(0 0 30px #00ff88)' }}>🎉</div>
        <h1 style={{ fontSize:'32px', fontWeight:900, background:'linear-gradient(90deg,#00ff88,#00d4ff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', marginBottom:'12px' }}>Item Listed!</h1>
        <p style={{ color:'rgba(255,255,255,0.5)', fontSize:'15px', maxWidth:'300px', lineHeight:1.7, marginBottom:'32px' }}>
          Your <strong style={{ color:'white' }}>{form.title}</strong> is now live on Babala!
        </p>
        <div style={{ background:'rgba(0,255,136,0.08)', border:'1px solid rgba(0,255,136,0.3)', borderRadius:'20px', padding:'20px 28px', marginBottom:'16px' }}>
          <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.5)', marginBottom:'6px' }}>Listed for</div>
          <div style={{ fontSize:'36px', fontWeight:900, color:'#00ff88' }}>Rs {form.price}</div>
        </div>
        <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.4)', marginBottom:'32px' }}>📍 {form.location}</div>
        <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', justifyContent:'center' }}>
          <Link href="/" style={{ textDecoration:'none' }}>
            <button style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'white', padding:'14px 28px', borderRadius:'50px', cursor:'pointer', fontSize:'14px', fontWeight:600 }}>← Back Home</button>
          </Link>
          <button onClick={resetForm} style={{ background:'linear-gradient(90deg,#ff6b35,#ff0080)', border:'none', color:'white', padding:'14px 28px', borderRadius:'50px', cursor:'pointer', fontWeight:800, fontSize:'14px' }}>+ List Another</button>
        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight:'100vh', background:'#050510', color:'white', fontFamily:'system-ui,sans-serif', paddingBottom:'100px', overflowX:'hidden' }}>
      <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden' }}>
        <div style={{ position:'absolute', left:'10%', top:'5%', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle,rgba(255,107,53,0.1),transparent 70%)' }} />
        <div style={{ position:'absolute', right:'5%', top:'40%', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle,rgba(0,212,255,0.08),transparent 70%)' }} />
      </div>

      <header style={{ padding:'16px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, zIndex:100, background:'rgba(5,5,16,0.9)', backdropFilter:'blur(24px)', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:'10px' }}>
          <div style={{ width:'36px', height:'36px', borderRadius:'10px', background:'linear-gradient(135deg,#ff6b35,#ff0080)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', fontWeight:900 }}>B</div>
          <div style={{ fontSize:'22px', fontWeight:900, background:'linear-gradient(90deg,#ff6b35,#ffd700,#ff0080)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Babala</div>
        </Link>
        <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.4)' }}>Step {step} of 3</div>
      </header>

      <div style={{ position:'relative', zIndex:1, maxWidth:'520px', margin:'0 auto', padding:'24px 20px' }}>
        <div style={{ marginBottom:'32px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'10px' }}>
            {['Photos & Info','Price & Details','Contact'].map((label, i) => (
              <div key={i} style={{ display:'flex', flexDirection:'column', alignItems: i===0?'flex-start':i===2?'flex-end':'center', flex:1 }}>
                <div style={{ width:'28px', height:'28px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', fontWeight:800, background: step>=i+1?'linear-gradient(135deg,#ff6b35,#ff0080)':'rgba(255,255,255,0.08)', color: step>=i+1?'white':'rgba(255,255,255,0.3)', marginBottom:'6px' }}>{step>i+1?'✓':i+1}</div>
                <div style={{ fontSize:'10px', color: step===i+1?'#ff6b35':'rgba(255,255,255,0.3)', fontWeight: step===i+1?700:400 }}>{label}</div>
              </div>
            ))}
          </div>
          <div style={{ height:'3px', background:'rgba(255,255,255,0.08)', borderRadius:'99px', overflow:'hidden' }}>
            <div style={{ height:'100%', width:`${((step-1)/2)*100}%`, background:'linear-gradient(90deg,#ff6b35,#ff0080)', borderRadius:'99px', transition:'width 0.5s ease' }} />
          </div>
        </div>

        {step === 1 && (
          <div>
            <h2 style={{ fontSize:'24px', fontWeight:900, marginBottom:'6px' }}>📸 Add Photos</h2>
            <p style={{ color:'rgba(255,255,255,0.4)', fontSize:'13px', marginBottom:'24px' }}>Great photos get more buyers. Add up to 6.</p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'10px', marginBottom:'28px' }}>
              {images.map((src, i) => (
                <div key={i} style={{ aspectRatio:'1', borderRadius:'14px', overflow:'hidden', position:'relative', border:'1px solid rgba(255,107,53,0.3)' }}>
                  <img src={src} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <button onClick={() => removeImage(i)} style={{ position:'absolute', top:'6px', right:'6px', width:'22px', height:'22px', borderRadius:'50%', background:'rgba(0,0,0,0.7)', border:'none', color:'white', fontSize:'12px', cursor:'pointer' }}>×</button>
                  {i===0 && <div style={{ position:'absolute', bottom:'6px', left:'6px', background:'#ff6b35', borderRadius:'6px', fontSize:'9px', fontWeight:800, color:'#000', padding:'2px 6px' }}>MAIN</div>}
                </div>
              ))}
              {images.length < 6 && (
                <label style={{ aspectRatio:'1', borderRadius:'14px', border:'1.5px dashed rgba(255,107,53,0.4)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', cursor:'pointer', background:'rgba(255,107,53,0.05)' }}>
                  <input type="file" accept="image/*" multiple onChange={handleImages} style={{ display:'none' }} />
                  <div style={{ fontSize:'24px', color:'rgba(255,255,255,0.4)' }}>+</div>
                  <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.4)', marginTop:'4px' }}>Add</div>
                </label>
              )}
            </div>
            <div style={{ marginBottom:'20px' }}>
              <label style={labelStyle}>Item Title</label>
              <input placeholder="e.g. Samsung TV 43 inch" value={form.title} onChange={e => update('title', e.target.value)} style={inputStyle} />
            </div>
            <div style={{ marginBottom:'20px' }}>
              <label style={labelStyle}>Category</label>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'8px' }}>
                {categories.map(cat => (
                  <button key={cat.name} onClick={() => update('category', cat.name)}
                    style={{ background: form.category===cat.name?`${cat.color}20`:'rgba(255,255,255,0.04)', border:`1px solid ${form.category===cat.name?cat.color:'rgba(255,255,255,0.08)'}`, borderRadius:'12px', padding:'10px 6px', cursor:'pointer', textAlign:'center', transition:'all 0.2s' }}>
                    <div style={{ fontSize:'20px' }}>{cat.icon}</div>
                    <div style={{ fontSize:'9px', color: form.category===cat.name?cat.color:'rgba(255,255,255,0.4)', marginTop:'4px', fontWeight: form.category===cat.name?700:400, lineHeight:1.2 }}>{cat.name}</div>
                  </button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom:'28px' }}>
              <label style={labelStyle}>Condition</label>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'10px' }}>
                {conditions.map(c => (
                  <button key={c.label} onClick={() => update('condition', c.label)}
                    style={{ background: form.condition===c.label?`${c.color}15`:'rgba(255,255,255,0.04)', border:`1px solid ${form.condition===c.label?c.color:'rgba(255,255,255,0.08)'}`, borderRadius:'14px', padding:'14px', cursor:'pointer', textAlign:'left', transition:'all 0.2s' }}>
                    <div style={{ fontSize:'20px', marginBottom:'4px' }}>{c.icon}</div>
                    <div style={{ fontWeight:700, fontSize:'13px', color: form.condition===c.label?c.color:'white' }}>{c.label}</div>
                    <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)' }}>{c.desc}</div>
                  </button>
                ))}
              </div>
            </div>
            <button disabled={!canNext1} onClick={() => setStep(2)}
              style={{ width:'100%', padding:'16px', borderRadius:'50px', border:'none', background: canNext1?'linear-gradient(90deg,#ff6b35,#ff0080)':'rgba(255,255,255,0.08)', color: canNext1?'white':'rgba(255,255,255,0.3)', fontWeight:800, fontSize:'16px', cursor: canNext1?'pointer':'not-allowed', transition:'all 0.3s' }}>
              Continue →
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 style={{ fontSize:'24px', fontWeight:900, marginBottom:'6px' }}>💰 Price & Details</h2>
            <p style={{ color:'rgba(255,255,255,0.4)', fontSize:'13px', marginBottom:'24px' }}>Set a fair price and describe your item.</p>
            <div style={{ marginBottom:'20px' }}>
              <label style={labelStyle}>Asking Price (Rs)</label>
              <div style={{ position:'relative' }}>
                <span style={{ position:'absolute', left:'18px', top:'50%', transform:'translateY(-50%)', color:'#ff6b35', fontWeight:800, fontSize:'16px' }}>Rs</span>
                <input type="number" placeholder="0" value={form.price} onChange={e => update('price', e.target.value)} style={{ ...inputStyle, paddingLeft:'46px' }} />
              </div>
              <div style={{ display:'flex', gap:'8px', marginTop:'10px', flexWrap:'wrap' }}>
                {['500','1000','2000','5000','10000'].map(p => (
                  <button key={p} onClick={() => update('price', p)}
                    style={{ background: form.price===p?'rgba(255,107,53,0.2)':'rgba(255,255,255,0.05)', border:`1px solid ${form.price===p?'#ff6b35':'rgba(255,255,255,0.1)'}`, color: form.price===p?'#ff6b35':'rgba(255,255,255,0.5)', padding:'6px 14px', borderRadius:'50px', fontSize:'12px', cursor:'pointer', fontWeight:600 }}>
                    Rs {p}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom:'20px', position:'relative' }}>
              <label style={labelStyle}>Your Location ({allLocations.length} areas)</label>
              <div style={{ position:'relative' }}>
                <span style={{ position:'absolute', left:'16px', top:'50%', transform:'translateY(-50%)', fontSize:'14px' }}>📍</span>
                <input placeholder="Search your area..." value={locationSearch || form.location}
                  onChange={e => { setLocationSearch(e.target.value); update('location',''); setShowLocationDropdown(true) }}
                  onFocus={() => setShowLocationDropdown(true)}
                  style={{ ...inputStyle, paddingLeft:'42px' }} />
              </div>
              {showLocationDropdown && (
                <div style={{ position:'absolute', top:'100%', left:0, right:0, background:'#0d0d2a', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'16px', maxHeight:'220px', overflowY:'auto', zIndex:50, marginTop:'6px', boxShadow:'0 20px 60px rgba(0,0,0,0.6)' }}>
                  {filteredLocations.map(({ place, district }) => (
                    <button key={district+place} onClick={() => { update('location', place); setLocationSearch(''); setShowLocationDropdown(false) }}
                      style={{ width:'100%', padding:'11px 16px', background:'transparent', border:'none', color:'white', cursor:'pointer', textAlign:'left', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid rgba(255,255,255,0.04)' }}
                      onMouseEnter={e => (e.currentTarget.style.background='rgba(255,107,53,0.1)')}
                      onMouseLeave={e => (e.currentTarget.style.background='transparent')}>
                      <span style={{ fontSize:'14px' }}>{place}</span>
                      <span style={{ fontSize:'10px', color:'rgba(255,255,255,0.35)', background:'rgba(255,255,255,0.06)', padding:'2px 8px', borderRadius:'20px' }}>{district}</span>
                    </button>
                  ))}
                </div>
              )}
              {form.location && <div style={{ marginTop:'8px', fontSize:'12px', color:'#00ff88' }}>✓ {form.location} selected</div>}
            </div>
            <div style={{ marginBottom:'28px' }}>
              <label style={labelStyle}>Description</label>
              <textarea placeholder="Describe your item..." value={form.description} onChange={e => update('description', e.target.value)} rows={4}
                style={{ ...inputStyle, resize:'none', lineHeight:1.6 }} />
            </div>
            <div style={{ display:'flex', gap:'12px' }}>
              <button onClick={() => setStep(1)} style={{ flex:1, padding:'16px', borderRadius:'50px', border:'1px solid rgba(255,255,255,0.1)', background:'transparent', color:'rgba(255,255,255,0.5)', fontWeight:700, fontSize:'15px', cursor:'pointer' }}>← Back</button>
              <button disabled={!canNext2} onClick={() => setStep(3)}
                style={{ flex:2, padding:'16px', borderRadius:'50px', border:'none', background: canNext2?'linear-gradient(90deg,#ff6b35,#ff0080)':'rgba(255,255,255,0.08)', color: canNext2?'white':'rgba(255,255,255,0.3)', fontWeight:800, fontSize:'16px', cursor: canNext2?'pointer':'not-allowed', transition:'all 0.3s' }}>
                Continue →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 style={{ fontSize:'24px', fontWeight:900, marginBottom:'6px' }}>👤 Your Contact</h2>
            <p style={{ color:'rgba(255,255,255,0.4)', fontSize:'13px', marginBottom:'24px' }}>Buyers will reach you on WhatsApp.</p>
            <div style={{ marginBottom:'20px' }}>
              <label style={labelStyle}>Your Name</label>
              <input placeholder="e.g. Priya, Dev, Marie..." value={form.name} onChange={e => update('name', e.target.value)} style={inputStyle} />
            </div>
            <div style={{ marginBottom:'28px' }}>
              <label style={labelStyle}>WhatsApp Number</label>
              <div style={{ position:'relative' }}>
                <span style={{ position:'absolute', left:'18px', top:'50%', transform:'translateY(-50%)', color:'rgba(255,255,255,0.4)', fontSize:'14px' }}>🇲🇺 +230</span>
                <input type="tel" placeholder="5XXX XXXX" value={form.whatsapp} onChange={e => update('whatsapp', e.target.value)} style={{ ...inputStyle, paddingLeft:'90px' }} />
              </div>
            </div>
            <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'20px', padding:'20px', marginBottom:'28px' }}>
              <div style={{ fontSize:'13px', fontWeight:700, color:'rgba(255,255,255,0.5)', marginBottom:'14px', textTransform:'uppercase', letterSpacing:'1px' }}>Listing Summary</div>
              {[{ label:'Title', value:form.title },{ label:'Category', value:form.category },{ label:'Condition', value:form.condition },{ label:'Price', value:form.price?`Rs ${form.price}`:'' },{ label:'Location', value:form.location }].map(row => row.value ? (
                <div key={row.label} style={{ display:'flex', justifyContent:'space-between', marginBottom:'10px', fontSize:'13px' }}>
                  <span style={{ color:'rgba(255,255,255,0.4)' }}>{row.label}</span>
                  <span style={{ fontWeight:600, color:'white', maxWidth:'60%', textAlign:'right' }}>{row.value}</span>
                </div>
              ) : null)}
            </div>
            <div style={{ display:'flex', gap:'12px' }}>
              <button onClick={() => setStep(2)} style={{ flex:1, padding:'16px', borderRadius:'50px', border:'1px solid rgba(255,255,255,0.1)', background:'transparent', color:'rgba(255,255,255,0.5)', fontWeight:700, fontSize:'15px', cursor:'pointer' }}>← Back</button>
              <button disabled={!canSubmit || loading} onClick={handleSubmit}
                style={{ flex:2, padding:'16px', borderRadius:'50px', border:'none', background: canSubmit?'linear-gradient(90deg,#ff6b35,#ff0080)':'rgba(255,255,255,0.08)', color: canSubmit?'white':'rgba(255,255,255,0.3)', fontWeight:800, fontSize:'16px', cursor: canSubmit?'pointer':'not-allowed', transition:'all 0.3s' }}>
                {loading ? 'Uploading...' : '🚀 Post for Free'}
              </button>
            </div>
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
      <style>{`* { margin:0; padding:0; box-sizing:border-box; } input::placeholder,textarea::placeholder { color:rgba(255,255,255,0.25); } ::-webkit-scrollbar{width:0}`}</style>
    </main>
  )
}