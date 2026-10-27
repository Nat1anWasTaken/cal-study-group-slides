// Builds every `week-*.md` deck into `dist/week-*/` and writes an index page
// linking to them. Usage: node scripts/build.mjs [--base /repo/]
import { execFileSync } from 'node:child_process'
import { readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const args = process.argv.slice(2)
const baseIndex = args.indexOf('--base')
let base = baseIndex === -1 ? '/' : args[baseIndex + 1]
if (!base.endsWith('/'))
  base += '/'

const outDir = 'dist'
const weekNumber = file => Number(file.match(/^week-(\d+)/)?.[1] ?? Infinity)

const decks = readdirSync('.')
  .filter(file => /^week-.+\.md$/.test(file))
  .sort((a, b) => weekNumber(a) - weekNumber(b) || a.localeCompare(b))
  .map((file) => {
    const name = path.basename(file, '.md')
    const heading = readFileSync(file, 'utf-8').match(/^#\s+(.+)$/m)?.[1]
    return { file, name, title: heading ?? name }
  })

if (decks.length === 0)
  throw new Error('No week-*.md decks found')

rmSync(outDir, { recursive: true, force: true })

for (const deck of decks) {
  // Hash routing: GitHub Pages serves a single root 404.html, so history-mode
  // deep links like /week-6/3 can't fall back to the right deck on refresh
  execFileSync('slidev', [
    'build',
    deck.file,
    '--base', `${base}${deck.name}/`,
    '--out', path.join(outDir, deck.name),
    '--router-mode', 'hash',
  ], { stdio: 'inherit' })
}

const escapeHtml = text => text.replace(/[&<>"]/g, c => `&#${c.charCodeAt(0)};`)

writeFileSync(path.join(outDir, 'index.html'), `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>cal-study-group-slides</title>
  <style>
    body { margin: 0; padding: 3rem 1rem; font-family: system-ui, sans-serif; background: #fff; color: #1a1a1a; }
    main { max-width: 40rem; margin: 0 auto; }
    h1 { font-size: 1.75rem; margin: 0 0 1.5rem; }
    ul { list-style: none; margin: 0; padding: 0; }
    li + li { margin-top: 0.5rem; }
    a { display: block; padding: 0.875rem 1rem; border: 1px solid #ddd; border-radius: 0.5rem; color: inherit; text-decoration: none; }
    a:hover { border-color: #888; }
  </style>
</head>
<body>
  <main>
    <h1>cal-study-group-slides</h1>
    <ul>
${decks.map(deck => `      <li><a href="${base}${deck.name}/">${escapeHtml(deck.title)}</a></li>`).join('\n')}
    </ul>
  </main>
</body>
</html>
`)
