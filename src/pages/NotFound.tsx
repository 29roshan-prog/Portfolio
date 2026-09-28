import { Link } from 'react-router-dom'
import { useSeo } from '../lib/seo'

export default function NotFound() {
  useSeo('Page not found — Roshan Prabhu', 'This page does not exist.')
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center px-5 pt-24 sm:px-8">
      <h1 className="text-4xl font-semibold tracking-tight">This page doesn't exist.</h1>
      <p className="mt-3 text-fog">The link may be old, or the project may have been unpublished.</p>
      <Link to="/" className="mt-8 inline-flex w-fit rounded-full bg-volt px-5 py-2.5 text-sm font-semibold text-black neon-btn">Back to the portfolio</Link>
    </section>
  )
}
