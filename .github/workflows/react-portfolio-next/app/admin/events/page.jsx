
'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'

export default function AdminEvents() {
  const [list, setList] = useState([])
  const [model, setModel] = useState({ name:'', description:'', start_date:'', end_date:'', location:'', link:'' })
  const [msg, setMsg] = useState('')

  const load = async () => {
    if (!supabase) return
    const { data } = await supabase.from('events').select('*').order('start_date', { ascending: true })
    setList(data || [])
  }
  useEffect(() => { load() }, [])

  const save = async (e) => {
    e.preventDefault()
    if (!supabase) { setMsg('Supabase not configured.'); return }
    const res = await supabase.from('events').insert(model)
    setMsg(res.error ? res.error.message : 'Event added!')
    if (!res.error) { setModel({ name:'', description:'', start_date:'', end_date:'', location:'', link:'' }); load() }
  }

  const remove = async (id) => {
    if (!supabase) return
    await supabase.from('events').delete().eq('id', id)
    load()
  }

  return (
    <section className="section">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <form onSubmit={save} className="card grid gap-3 mb-6">
        <input className="border rounded px-3 py-2" placeholder="Name" value={model.name} onChange={e=>setModel({...model,name:e.target.value})} />
        <textarea className="border rounded px-3 py-2" placeholder="Description" value={model.description} onChange={e=>setModel({...model,description:e.target.value})} />
        <input className="border rounded px-3 py-2" type="date" placeholder="Start date" value={model.start_date} onChange={e=>setModel({...model,start_date:e.target.value})} />
        <input className="border rounded px-3 py-2" type="date" placeholder="End date" value={model.end_date} onChange={e=>setModel({...model,end_date:e.target.value})} />
        <input className="border rounded px-3 py-2" placeholder="Location" value={model.location} onChange={e=>setModel({...model,location:e.target.value})} />
        <input className="border rounded px-3 py-2" placeholder="Link" value={model.link} onChange={e=>setModel({...model,link:e.target.value})} />
        <button className="px-4 py-2 bg-slate-900 text-white rounded">Add Event</button>
        {msg && <p className="text-sm">{msg}</p>}
      </form>

      <div className="grid md:grid-cols-2 gap-4">
        {list.map(e => (
          <div className="card" key={e.id}>
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{e.name}</h3>
              <button onClick={()=>remove(e.id)} className="text-sm text-red-600">Delete</button>
            </div>
            <p className="mt-2 text-sm">{e.description}</p>
            <div className="text-xs text-slate-500 mt-1">{e.start_date} - {e.end_date}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
