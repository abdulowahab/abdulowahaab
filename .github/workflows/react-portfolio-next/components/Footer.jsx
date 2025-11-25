
export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800">
      <div className="container py-8 text-sm text-slate-500">
        © {new Date().getFullYear()} Your Name. Built with Next.js & Supabase.
      </div>
    </footer>
  )
}
