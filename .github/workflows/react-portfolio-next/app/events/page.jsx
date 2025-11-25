
import { supabase } from '../../lib/supabaseClient'
import EventCard from '../../components/EventCard'

async function getEvents() {
  if (!supabase) {
    return (await import('../../data/sample/events.json')).default
  }
  const { data } = await supabase.from('events').select('*').order('start_date', { ascending: true })
  return data
}

export default async function EventsPage() {
  const events = await getEvents()
  return (
    <section className="section">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {events?.map((e) => <EventCard key={e.id || e.name} e={e} />)}
      </div>
    </section>
  )
}
