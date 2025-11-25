
'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'

export default function AdminProfile() {
  const [profile, setProfile] = useState({})
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (!supabase) return
    supabase.from('profiles').select('*').limit(1).single().then(({ data }) => {
      setProfile(data || {})
    })
  }, [])

  const save = async (e) => {
    e.preventDefault()
    if (!supabase) { setMsg('Supabase not configured.'); return }
    const payload = { ...profile }
    let res
    if (profile.id) res = await supabase.from('profiles').update(payload).eq('id', profile.id)
    else res = await supabase.from('profiles').insert(payload)
    setMsg(res.error ? res.error.message : 'Saved!')
  }

  const set = (k, v) => setProfile(prev => ({ ...prev, [k]: v }))

  const fields = ['full_name','title','bio','avatar_url','location','email','phone','website','github','linkedin','twitter']

  return (
    <section className="section">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <form onSubmit={save} className="card grid gap-3">
        {fields.map(f => (
          <label key={f} className="grid gap-1 text-sm">
            <span className="font-medium">{f}</span>
            <input className="border rounded px-3 py-2" value={profile?.[f]||''} onChange={e=>set(f, e.target.value)} />
          </label>
        ))}
        <button className="px-4 py-2 bg-slate-900 text-white rounded">Save</button>
        {msg && <p className="text-sm">{msg}</p>}
      </form>
    </section>
  )
}
