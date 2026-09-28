import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App'
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import './index.css'

declare const __HASH_ROUTER__: boolean
const Router = __HASH_ROUTER__ ? HashRouter : BrowserRouter

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
)
