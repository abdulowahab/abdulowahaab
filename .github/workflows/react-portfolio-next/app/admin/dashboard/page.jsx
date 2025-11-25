
'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getUser().then(({ data }) => {
      if (!data?.user) router.push('/admin/login')
      else setUser(data.user)
    })
  }, [])

  const signOut = async () => { await supabase.auth.signOut(); router.push('/') }

  return (
    <section className="section">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {!user && <p>Loading...</p>}
      {user && (
        <div className="grid gap-4">
          <div className="card">
            <h2 className="font-semibold">Manage</h2>
            <div className="mt-3 flex gap-3">
              <Link className="px-3 py-2 border rounded" href="/admin/profile">Profile</Link>
              <Link className="px-3 py-2 border rounded" href="/admin/projects">Projects</Link>
              <Link className="px-3 py-2 border rounded" href="/admin/events">Events</Link>
            </div>
          </div>
          <button onClick={signOut} className="px-3 py-2 bg-slate-900 text-white rounded w-fit">Sign Out</button>
        </div>
      )}
    </section>
  )
}
