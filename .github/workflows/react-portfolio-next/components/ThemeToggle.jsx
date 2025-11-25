
'use client'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    const pref = localStorage.getItem('theme')
    if (pref === 'dark') { setDark(true); document.documentElement.classList.add('dark') }
  }, [])
  const toggle = () => {
    const d = !dark
    setDark(d)
    if (d) { document.documentElement.classList.add('dark'); localStorage.setItem('theme','dark') }
    else { document.documentElement.classList.remove('dark'); localStorage.setItem('theme','light') }
  }
  return (
    <button onClick={toggle} className="px-2 py-1 text-sm border rounded">
      {dark ? 'Light' : 'Dark'}
    </button>
  )
}
