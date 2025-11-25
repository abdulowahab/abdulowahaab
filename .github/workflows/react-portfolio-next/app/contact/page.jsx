
'use client'
import { useState } from 'react'

export default function ContactPage() {
  const [status, setStatus] = useState('')
  const submit = async (e) => {
    e.preventDefault()
    setStatus('Thanks! Your message was captured locally. Connect EmailJS or a backend to send.')
  }
  return (
    <section className="section">
      <h1 className="text-2xl font-bold mb-4">Contact</h1>
      <form onSubmit={submit} className="card grid gap-4 max-w-xl">
        <input className="border rounded px-3 py-2" placeholder="Name" required />
        <input className="border rounded px-3 py-2" type="email" placeholder="Email" required />
        <textarea className="border rounded px-3 py-2" placeholder="Your message" rows={5} required />
        <button className="px-4 py-2 bg-slate-900 text-white rounded">Send</button>
        {status && <p className="text-sm text-slate-600 dark:text-slate-300">{status}</p>}
      </form>
    </section>
  )}
