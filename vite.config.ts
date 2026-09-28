import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run build`         -> normal multi-file build for Vercel/Netlify (clean URLs, BrowserRouter)
// `npm run build:single`  -> one self-contained index.html with hash routing (for quick previews/sharing)
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), ...(mode === 'single' ? [viteSingleFile()] : [])],
  define: { __HASH_ROUTER__: JSON.stringify(mode === 'single') },
  build: { outDir: mode === 'single' ? 'dist-single' : 'dist' },
}))
