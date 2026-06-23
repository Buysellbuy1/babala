'use client'
import Link from 'next/link'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    setSuccess('')
    if (mode === 'signup') {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) { setError(error.message); setLoading(false); return }
      if (data.user) {
        await supabase.from('profiles').insert({ id: data.user.id, name, location: '', whatsapp: '', bio: '' })
        setSuccess('Account created! Check your email to confirm then log in.')
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) { setError(error.message); setLoading(false); return }
      router.push('/')
    }
    setLoading(false)
  }

  return (
    <main style={{ minHeight:'100vh', background:'#050510', color:'white', fontFamily:'system-ui,sans-serif', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'20px' }}>
      <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden' }}>
        <div style={{ position:'absolute', left:'10%', top:'5%', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle,rgba(255,107,53,0.1),transparent 70%)' }} />
        <div style={{ position:'absolute', right:'5%', bottom:'10%', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle,rgba(0,212,255,0.08),transparent 70%)' }} />
      </div>

      <div style={{ position:'relative', zIndex:1, width:'100%', maxWidth:'400px' }}>
        <Link href="/" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:'10px', justifyContent:'center', marginBottom:'32px' }}>
          <div style={{ width:'40px', height:'40px', borderRadius:'12px', background:'linear-gradient(135deg,#ff6b35,#ff0080)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', fontWeight:900, boxShadow:'0 0 20px rgba(255,107,53,0.5)' }}>B</div>
          <div style={{ fontSize:'26px', fontWeight:900, background:'linear-gradient(90deg,#ff6b35,#ffd700,#ff0080)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Babala</div>
        </Link>

        <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'24px', padding:'28px' }}>
          <div style={{ display:'flex', background:'rgba(255,255,255,0.04)', borderRadius:'50px', padding:'4px', marginBottom:'24px' }}>
            {(['login', 'signup'] as const).map(m => (
              <button key={m} onClick={() => { setMode(m); setError(''); setSuccess('') }}
                style={{ flex:1, padding:'10px', borderRadius:'50px', border:'none', background: mode === m ? 'linear-gradient(90deg,#ff6b35,#ff0080)' : 'transparent', color: mode === m ? 'white' : 'rgba(255,255,255,0.4)', fontWeight: mode === m ? 700 : 400, fontSize:'14px', cursor:'pointer', textTransform:'capitalize', transition:'all 0.2s' }}>
                {m === 'login' ? 'Log In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
            {mode === 'signup' && (
              <div>
                <label style={{ display:'block', fontSize:'11px', fontWeight:700, color:'rgba(255,255,255,0.4)', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'8px' }}>Your Name</label>
                <input placeholder="e.g. Priya, Dev, Marie..." value={name} onChange={e => setName(e.target.value)}
                  style={{ width:'100%', padding:'14px 16px', borderRadius:'12px', border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.05)', color:'white', fontSize:'14px', outline:'none', boxSizing:'border-box' }} />
              </div>
            )}
            <div>
              <label style={{ display:'block', fontSize:'11px', fontWeight:700, color:'rgba(255,255,255,0.4)', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'8px' }}>Email</label>
              <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}
                style={{ width:'100%', padding:'14px 16px', borderRadius:'12px', border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.05)', color:'white', fontSize:'14px', outline:'none', boxSizing:'border-box' }} />
            </div>
            <div>
              <label style={{ display:'block', fontSize:'11px', fontWeight:700, color:'rgba(255,255,255,0.4)', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'8px' }}>Password</label>
              <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}
                style={{ width:'100%', padding:'14px 16px', borderRadius:'12px', border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.05)', color:'white', fontSize:'14px', outline:'none', boxSizing:'border-box' }} />
            </div>

            {error && <div style={{ background:'rgba(255,0,0,0.1)', border:'1px solid rgba(255,0,0,0.2)', borderRadius:'10px', padding:'10px 14px', fontSize:'13px', color:'#ff6b6b' }}>{error}</div>}
            {success && <div style={{ background:'rgba(0,255,136,0.1)', border:'1px solid rgba(0,255,136,0.2)', borderRadius:'10px', padding:'10px 14px', fontSize:'13px', color:'#00ff88' }}>{success}</div>}

            <button onClick={handleSubmit} disabled={loading}
              style={{ width:'100%', padding:'16px', borderRadius:'50px', border:'none', background: loading ? 'rgba(255,255,255,0.1)' : 'linear-gradient(90deg,#ff6b35,#ff0080)', color:'white', fontWeight:800, fontSize:'16px', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: loading ? 'none' : '0 0 30px rgba(255,107,53,0.4)', transition:'all 0.3s', marginTop:'4px' }}>
              {loading ? 'Please wait...' : mode === 'login' ? 'Log In' : 'Create Account'}
            </button>
          </div>
        </div>

        <p style={{ textAlign:'center', color:'rgba(255,255,255,0.3)', fontSize:'12px', marginTop:'20px', lineHeight:1.6 }}>
          By signing up you agree to our Terms of Service.
        </p>
      </div>

      <style>{`* { margin:0; padding:0; box-sizing:border-box; } input::placeholder { color:rgba(255,255,255,0.25); }`}</style>
    </main>
  )
}