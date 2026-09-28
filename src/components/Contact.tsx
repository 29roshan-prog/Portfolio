import { ArrowUpRight, FileText, Mail, Send } from 'lucide-react'
import { useState } from 'react'
import { site } from '../data/site'
import { DraftNote } from './Draft'

/** No backend: the form composes an email in the visitor's mail app. */
export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const ready = !!site.email
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!site.email) return
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ''}`)
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
  }

  const links = [
    site.email && { label: 'Email', value: site.email, href: `mailto:${site.email}`, icon: Mail },
    site.linkedin && { label: 'LinkedIn', value: site.linkedin.replace(/^https?:\/\/(www\.)?/, ''), href: site.linkedin, icon: ArrowUpRight },
    site.github && { label: 'GitHub', value: site.github.replace(/^https?:\/\/(www\.)?/, ''), href: site.github, icon: ArrowUpRight },
    site.resumeUrl && { label: 'Resume', value: 'Download PDF', href: site.resumeUrl, icon: FileText },
  ].filter(Boolean) as { label: string; value: string; href: string; icon: typeof Mail }[]

  const missing = [!site.email && 'email', !site.linkedin && 'LinkedIn', !site.github && 'GitHub', !site.resumeUrl && 'resume'].filter(Boolean)
  const field = 'mt-2 w-full rounded-xl border border-line bg-coal px-4 py-3 text-snow placeholder:text-mist/60 transition-colors focus:border-volt focus:outline-none disabled:opacity-50'

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line py-24 sm:py-32" aria-labelledby="contact-title">
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 id="contact-title" className="balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl">Have an Idea? Let's Build Something Intelligent.</h2>
          <p className="mt-6 max-w-md text-lg text-fog">Get in touch about roles, collaborations or a development project.</p>
          {links.length > 0 && <ul className="mt-10 divide-y divide-line border-y border-line">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})} className="group flex items-center justify-between gap-4 py-4">
                  <span className="text-sm text-mist">{l.label}</span>
                  <span className="flex min-w-0 items-center gap-2 truncate text-snow group-hover:text-white">
                    <span className="truncate">{l.value}</span>
                    <l.icon aria-hidden className="size-4 shrink-0 text-volt transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              </li>
            ))}
          </ul>}
          {missing.length > 0 && <DraftNote className="mt-4">Add your {missing.join(', ')} in src/data/site.ts</DraftNote>}
        </div>

        <form onSubmit={submit} className="rounded-2xl border border-line bg-ink/80 p-6 sm:p-8 lg:col-span-5 lg:col-start-8" aria-label="Contact form">
          <label className="block text-sm text-fog">Your name
            <input required value={form.name} onChange={set('name')} className={field} autoComplete="name" disabled={!ready} />
          </label>
          <label className="mt-5 block text-sm text-fog">Your email
            <input type="email" value={form.email} onChange={set('email')} className={field} autoComplete="email" disabled={!ready} />
          </label>
          <label className="mt-5 block text-sm text-fog">What are you working on?
            <textarea required rows={5} value={form.message} onChange={set('message')} className={`${field} resize-y`} disabled={!ready} />
          </label>
          <button type="submit" disabled={!ready} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-volt px-6 py-3 text-sm font-semibold text-black neon-btn transition-colors hover:bg-[#6bff4f] disabled:cursor-not-allowed disabled:opacity-40">
            <Send aria-hidden className="size-4" /> Open in email app
          </button>
          <p className="mt-3 text-center text-xs text-mist">{ready ? 'Opens your mail app with the message filled in.' : 'The form turns on once an email address is configured.'}</p>
        </form>
      </div>
    </section>
  )
}
