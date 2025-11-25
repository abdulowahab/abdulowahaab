
export default function EventCard({ e }) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold">{e.name}</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{e.description}</p>
      <div className="mt-2 text-sm">
        <span className="font-medium">When:</span> {e.start_date} {e.end_date ? ` - ${e.end_date}` : ''}
      </div>
      <div className="mt-1 text-sm">
        <span className="font-medium">Where:</span> {e.location}
      </div>
      {e.link && <a href={e.link} target="_blank" className="mt-3 inline-block underline">Details</a>}
    </div>
  )
}
