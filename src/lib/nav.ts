import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const sections = [
  { id: 'top', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof sections)[number]['id']

export function scrollToSection(id: string) {
  const el = id === 'top' ? null : document.getElementById(id)
  const top = el ? el.getBoundingClientRect().top + window.scrollY - 72 : 0
  window.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
}

/** Scroll to a home-page section from anywhere, without relying on URL hashes (works with hash routing too). */
export function useSectionNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  return useCallback(
    (id: string) => {
      if (pathname === '/') scrollToSection(id)
      else navigate('/', { state: { scrollTo: id } })
    },
    [navigate, pathname],
  )
}
