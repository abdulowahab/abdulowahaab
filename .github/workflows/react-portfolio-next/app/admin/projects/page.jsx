
'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'

export default function AdminProjects() {
  const [list, setList] = useState([])
  const [model, setModel] = useState({ title:'', description:'', image_url:'', tech_stack:'', demo_url:'', repo_url:'' })
  const [msg, setMsg] = useState('')

  const load = async () => {
    if (!supabase) return
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
    setList(data || [])
  }
  useEffect(() => { load() }, [])

  const save = async (e) => {
    e.preventDefault()
    if (!supabase) { setMsg('Supabase not configured.'); return }
    const res = await supabase.from('projects').insert(model)
    setMsg(res.error ? res.error.message : 'Project added!')
    if (!res.error) { setModel({ title:'', description:'', image_url:'', tech_stack:'', demo_url:'', repo_url:'' }); load() }
  }

  const remove = async (id) => {
    if (!supabase) return
    await supabase.from('projects').delete().eq('id', id)
    load()
  }

  return (
    <section className="section">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <form onSubmit={save} className="card grid gap-3 mb-6">
        <input className="border rounded px-3 py-2" placeholder="Title" value={model.title} onChange={e=>setModel({...model,title:e.target.value})} />
        <textarea className="border rounded px-3 py-2" placeholder="Description" value={model.description} onChange={e=>setModel({...model,description:e.target.value})} />
        <input className="border rounded px-3 py-2" placeholder="Image URL" value={model.image_url} onChange={e=>setModel({...model,image_url:e.target.value})} />
        <input className="border rounded px-3 py-2" placeholder="Tech Stack" value={model.tech_stack} onChange={e=>setModel({...model,tech_stack:e.target.value})} />
        <input className="border rounded px-3 py-2" placeholder="Demo URL" value={model.demo_url} onChange={e=>setModel({...model,demo_url:e.target.value})} />
        <input className="border rounded px-3 py-2" placeholder="Repo URL" value={model.repo_url} onChange={e=>setModel({...model,repo_url:e.target.value})} />
        <button className="px-4 py-2 bg-slate-900 text-white rounded">Add Project</button>
        {msg && <p className="text-sm">{msg}</p>}
      </form>

      <div className="grid md:grid-cols-2 gap-4">
        {list.map(p => (
          <div className="card" key={p.id}>
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{p.title}</h3>
              <button onClick={()=>remove(p.id)} className="text-sm text-red-600">Delete</button>
            </div>
            <p className="mt-2 text-sm">{p.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
