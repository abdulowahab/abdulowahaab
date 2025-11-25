
import { supabase } from '../lib/supabaseClient'
import Link from 'next/link'
import ProjectCard from '../components/ProjectCard'

async function getData() {
  if (!supabase) {
    const profile = (await import('../data/sample/profile.json')).default
    const projects = (await import('../data/sample/projects.json')).default
    return { profile, projects }
  }
  const { data: projects } = await supabase.from('projects').select('*').limit(6)
  const { data: profile } = await supabase.from('profiles').select('*').limit(1).single()
  return { profile, projects }
}

export default async function HomePage() {
  const { profile, projects } = await getData()
  return (
    <div className="section">
      <div className="grid md:grid-cols-3 gap-6 items-center">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold">{profile?.full_name || 'Your Name'}</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">{profile?.title || 'Your Title'}</p>
          <p className="mt-4">{profile?.bio || 'Write a compelling introduction here.'}</p>
          <div className="mt-6 flex gap-4">
            <Link href="/projects" className="px-4 py-2 bg-slate-900 text-white rounded">View Projects</Link>
            <Link href="/contact" className="px-4 py-2 border rounded">Contact Me</Link>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Featured Projects</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {projects?.map((p) => (
            <ProjectCard key={p.id || p.title} p={p} />
          ))}
        </div>
      </div>
    </div>
  )
}
