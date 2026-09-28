import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'ghost'
const styles: Record<Variant, string> = {
  primary: 'bg-volt text-black neon-btn hover:bg-[#6bff4f]',
  secondary: 'border border-line bg-white/[.02] text-snow hover:border-mist/60 hover:bg-white/[.05]',
  ghost: 'text-fog hover:text-snow',
}
const base = 'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40'

export function ButtonLink({ to, variant = 'primary', children, className = '' }: { to: string; variant?: Variant; children: ReactNode; className?: string }) {
  return <Link to={to} className={`${base} ${styles[variant]} ${className}`}>{children}</Link>
}

export function ButtonA({ variant = 'primary', children, className = '', ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }) {
  const external = rest.href?.startsWith('http')
  return (
    <a {...rest} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </a>
  )
}

export function ButtonEl({ variant = 'primary', children, className = '', ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button {...rest} className={`${base} ${styles[variant]} ${className}`}>{children}</button>
}
