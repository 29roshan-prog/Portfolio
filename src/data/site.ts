/**
 * Personal details. Anything left as null is hidden.
 * draftMode shows "needs input" markers — keep false for the live site.
 */
export const site = {
  name: 'Roshan Prabhu',
  role: 'AI/ML Engineer & Full-Stack Developer',

  draftMode: false,

  email: 'roshanprabhu05@gmail.com' as string | null,
  linkedin: 'https://www.linkedin.com/in/roshan-prabhu-54717522a' as string | null,
  github: 'https://github.com/29roshan-prog' as string | null,
  /** public/resume.pdf */
  resumeUrl: '/resume.pdf' as string | null,

  /** Small status pill in the hero. Keep false unless it's true right now. */
  availability: { show: false, label: 'Open to AI/ML and full-stack roles' },

  location: 'Bengaluru, India' as string | null,
}

export const education = [
  {
    school: 'Impact College of Engineering and Applied Science',
    credential: 'B.E., Artificial Intelligence & Machine Learning',
    detail: '2021 – 2025 · Best Outgoing Student' as string | null,
  },
]

export const experience: { org: string; title: string | null; period: string | null; summary: string }[] = [
  {
    org: 'Skyup Digital Solutions LLP',
    title: 'AI/ML Developer & Team Lead',
    period: null,
    summary:
      'AI/ML Developer and Team Lead at a Bengaluru digital marketing and AI automation agency. Lead AI development, work with clients directly, and build and deploy software end to end.',
  },
  {
    org: 'Aixplora Technologies Pvt. Ltd.',
    title: 'AI Engineer Intern',
    period: 'Jul 2025 – Nov 2025',
    summary: 'Built an AI-driven financial planning system for personalised term-insurance recommendations, with explainable, profile-based decision logic.',
  },
  {
    org: 'Freelance',
    title: 'AI-Powered Application Developer',
    period: '2023 – present',
    summary: 'AI web applications, automation tools, dashboards and backend services, delivered end to end from requirements to deployment.',
  },
]
