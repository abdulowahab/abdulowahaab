
'use client'
import { useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const signIn = async (e) => {
    e.preventDefault()
    if (!supabase) { setError('Supabase not configured.'); return }
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else router.push('/admin/dashboard')
  }

  return (
    <section className="section">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <form onSubmit={signIn} className="card grid gap-3 max-w-md">
        <input className="border rounded px-3 py-2" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="border rounded px-3 py-2" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="px-4 py-2 bg-slate-900 text-white rounded">Sign In</button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>
    </section>
  )
}
