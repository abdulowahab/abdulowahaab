
import { supabase } from '../../lib/supabaseClient'
import ProjectCard from '../../components/ProjectCard'

async function getProjects() {
  if (!supabase) {
    return (await import('../../data/sample/projects.json')).default
  }
  const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
  return data
}

export default async function ProjectsPage() {
  const projects = await getProjects()
  return (
    <section className="section">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {projects?.map((p) => <ProjectCard key={p.id || p.title} p={p} />)}
      </div>
    </section>
  )
}
