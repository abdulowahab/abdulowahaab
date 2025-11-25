
import { supabase } from '../../lib/supabaseClient'

async function getProfile() {
  if (!supabase) {
    return (await import('../../data/sample/profile.json')).default
  }
  const { data } = await supabase.from('profiles').select('*').limit(1).single()
  return data
}

export default async function AboutPage() {
  const profile = await getProfile()
  return (
    <section className="section">
      <h1 className="text-2xl font-bold mb-4">About Me</h1>
      <p className="leading-relaxed">{profile?.bio || 'Tell your story, experience, and goals here.'}</p>
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="font-semibold">Contact</h2>
          <ul className="mt-2 text-sm">
            <li>Email: {profile?.email}</li>
            <li>Phone: {profile?.phone}</li>
            <li>Website: {profile?.website}</li>
            <li>GitHub: {profile?.github}</li>
            <li>LinkedIn: {profile?.linkedin}</li>
            <li>Twitter: {profile?.twitter}</li>
          </ul>
        </div>
        <div className="card">
          <h2 className="font-semibold">Location</h2>
          <p className="mt-2">{profile?.location}</p>
        </div>
      </div>
    </section>
  )
}
