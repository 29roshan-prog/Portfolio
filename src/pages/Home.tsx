import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { About } from '../components/About'
import { Contact } from '../components/Contact'
import { Hero } from '../components/Hero'
import { ProjectsSection } from '../components/ProjectsSection'
import { Skills } from '../components/Skills'
import { site } from '../data/site'
import { scrollToSection } from '../lib/nav'
import { useSeo } from '../lib/seo'

export default function Home() {
  useSeo(`${site.name} — AI/ML Engineer & Full-Stack Developer`, 'AI agents for marketing ops, multilingual voice AI, ML for environmental monitoring and full-stack business software — with detailed case studies.')
  const { state } = useLocation() as { state: { scrollTo?: string } | null }
  const navigate = useNavigate()
  useEffect(() => {
    if (state?.scrollTo) {
      const id = state.scrollTo
      requestAnimationFrame(() => setTimeout(() => scrollToSection(id), 60))
      navigate('.', { replace: true, state: null })
    }
  }, [state, navigate])
  return (
    <>
      <Hero />
      <ProjectsSection />
      <About />
      <Skills />
      <Contact />
    </>
  )
}
