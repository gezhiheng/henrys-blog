import fs from 'fs'
import path from 'path'

const docsDir = path.resolve('./docs')
const outputFile = path.resolve('./data/recentPosts.js') // 根据你项目结构调整

const now = new Date()

const oneYearAgo = new Date(now)
oneYearAgo.setFullYear(now.getFullYear() - 1)

const files = fs.readdirSync(docsDir).filter(file => file.endsWith('.md'))

const recentPosts = []

files.forEach(file => {
  const fullPath = path.join(docsDir, file)
  const content = fs.readFileSync(fullPath, 'utf-8')

  const updatedMatch = content.match(/Last updated:\s*(\d{4})\/(\d{2})\/(\d{2})/)
  const titleMatch = content.match(/^#\s+(.*)$/m)

  if (!updatedMatch || !titleMatch) return

  const [_, y, m, d] = updatedMatch
  const dateObj = new Date(`${y}-${m}-${d}T00:00:00`)
  if (dateObj < oneYearAgo) return

  const dateNumber = getDateNumber(dateObj)
  const formatDate = `${y}/${m}/${d}`

  recentPosts.push({
    title: titleMatch[1].trim(),
    path: `docs/${file.replace(/\.md$/, '')}`,
    formatDate,
    date: dateNumber
  })
})

recentPosts.sort((a, b) => b.date - a.date)

const output = `export const recentPosts = ${JSON.stringify(recentPosts, null, 2)}\n`

fs.writeFileSync(outputFile, output, 'utf-8')
console.log(`✅ Generated ${recentPosts.length} recent posts to ${outputFile}`)

function getDateNumber(date) {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const hh = String(date.getHours()).padStart(2, '0')
  const mi = String(date.getMinutes()).padStart(2, '0')
  return parseInt(`${yyyy}${mm}${dd}${hh}${mi}`)
}
