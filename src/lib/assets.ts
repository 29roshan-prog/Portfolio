/**
 * Screenshots are auto-discovered from src/assets/projects/<slug>/.
 *
 *   <shot id>.png|jpg|jpeg|webp|avif          -> real screenshot
 *   <shot id>.mockup.png|jpg|jpeg|webp|avif   -> illustrative mockup (badged on the site)
 *
 * A real screenshot always wins over a mockup with the same id,
 * so dropping in chat.png automatically replaces chat.mockup.webp.
 */
const files = import.meta.glob('/src/assets/projects/*/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

export interface ShotAsset { url: string; mockup: boolean }
const index = new Map<string, ShotAsset>()

for (const [path, url] of Object.entries(files)) {
  const m = path.match(/projects\/([^/]+)\/([^/.]+)(\.mockup)?\.[a-z]+$/i)
  if (!m) continue
  const key = `${m[1]}/${m[2]}`
  const mockup = !!m[3]
  const existing = index.get(key)
  if (!existing || (existing.mockup && !mockup)) index.set(key, { url, mockup })
}

export const shotAsset = (slug: string, id: string) => index.get(`${slug}/${id}`)
export const shotUrl = (slug: string, id: string) => index.get(`${slug}/${id}`)?.url
export const shotPath = (slug: string, id: string) => `src/assets/projects/${slug}/${id}.png`
