
import Image from 'next/image'

export default function ProjectCard({ p }) {
  return (
    <div className="card">
      {p.image_url && (
        <div className="mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image_url} alt={p.title} className="w-full h-48 object-cover rounded" />
        </div>
      )}
      <h3 className="text-lg font-semibold">{p.title}</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{p.description}</p>
      <div className="mt-2 text-xs text-slate-500">{p.tech_stack}</div>
      <div className="mt-4 flex gap-3 text-sm">
        {p.demo_url && <a className="underline" href={p.demo_url} target="_blank">Live Demo</a>}
        {p.repo_url && <a className="underline" href={p.repo_url} target="_blank">Source</a>}
      </div>
    </div>
  )
}
