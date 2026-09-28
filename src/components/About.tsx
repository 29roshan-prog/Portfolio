import { FileText } from 'lucide-react'
import { education, experience, site } from '../data/site'
import { DraftNote } from './Draft'

const focus = [
  ['AI & machine learning', 'Classical ML for prediction and classification, from sensor data to network flows.'],
  ['LLM agents & automation', 'Assistants that work on live business data, from ad spend to CRM leads, and draft work for people to approve.'],
  ['Voice AI', 'Real-time speech agents over telephony in Indian languages.'],
  ['Full-stack & enterprise software', 'Dashboards, CRMs and care platforms shaped around how a business actually runs.'],
  ['Strategy to deployment', 'Scoping with clients, building solo, and shipping to production on AWS.'],
  ['Mobile & document AI', 'Android apps that read handwritten documents and check the numbers.'],
]

export function About() {
  return (
    <section id="about" className="border-t border-line py-24 sm:py-32" aria-labelledby="about-title">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="about-title" className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">About</h2>
          <p className="mt-2 text-lg text-volt-soft">{site.role}</p>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-fog">
            <p className="pretty">I'm Roshan Prabhu. I work where AI meets everyday software: AI assistants that connect ad platforms to CRMs, voice agents that hold phone conversations, ML models built on sensor data, and the full-stack products that put all of it in front of people.</p>
            <p className="pretty">I also founded Skyup Digital Solutions, where I work with clients directly: advising them on where AI fits in their business, then building it. Every project on this site I built myself, from the first requirement to deployment.</p>
          </div>
          <div className="mt-8">
            {site.resumeUrl ? (
              <a href={site.resumeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm hover:border-volt">
                <FileText aria-hidden className="size-4" /> View resume
              </a>
            ) : (
              <DraftNote>Resume: add public/resume.pdf and set resumeUrl in src/data/site.ts</DraftNote>
            )}
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <dl className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {focus.map(([t, d]) => (
              <div key={t}>
                <dt className="font-medium">{t}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-mist">{d}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="text-sm text-mist">Education</h3>
              {education.map((e) => (
                <div key={e.school} className="mt-3">
                  <p className="font-medium">{e.school}</p>
                  <p className="text-sm text-fog">{e.credential}{e.detail ? `, ${e.detail}` : ''}</p>
                  {!e.detail && <DraftNote className="mt-2">Add degree, branch and year</DraftNote>}
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-sm text-mist">Experience</h3>
              {experience.map((x) => (
                <div key={x.org} className="mt-5 first:mt-3">
                  <p className="font-medium">{x.org}</p>
                  {(x.title || x.period) && <p className="text-sm text-fog">{[x.title, x.period].filter(Boolean).join(' · ')}</p>}
                  <p className="mt-1.5 text-sm leading-relaxed text-mist">{x.summary}</p>
                  {!x.title && <DraftNote className="mt-2">Add your title</DraftNote>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
