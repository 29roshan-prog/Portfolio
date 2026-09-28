import { AnimatePresence, motion, MotionConfig } from 'motion/react'
import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const ProjectDetails = lazy(() => import('./pages/ProjectDetails'))

function ScrollReset() {
  const { pathname, state } = useLocation() as { pathname: string; state: { scrollTo?: string } | null }
  useEffect(() => {
    if (!state?.scrollTo) window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" onClick={(e) => { e.preventDefault(); const m = document.getElementById('main'); m?.focus(); m?.scrollIntoView() }} className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-volt focus:text-black focus:px-4 focus:py-2">Skip to content</a>
      <ScrollReset />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <Suspense fallback={<div className="min-h-screen" />}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/projects/:slug" element={<ProjectDetails />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </MotionConfig>
  )
}
