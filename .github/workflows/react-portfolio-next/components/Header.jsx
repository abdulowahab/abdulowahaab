
'use client'
import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="font-semibold">Portfolio</Link>
        <nav className="flex items-center gap-4">
          <Link href="/about">About</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/events">Events</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/admin/dashboard" className="text-sm px-2 py-1 rounded bg-slate-900 text-white dark:bg-white dark:text-slate-900">Admin</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
