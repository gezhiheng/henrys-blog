import fs from 'fs'
import path from 'path'

const docsDir = path.resolve(__dirname, '../docs')

function getContents() {
  const files = fs.readdirSync(docsDir)
  const contents = []

  files.forEach(file => {
    if (!file.endsWith('.md')) return

    const fullPath = path.join(docsDir, file)
    const content = fs.readFileSync(fullPath, 'utf-8')

    const match = content.match(/Last updated:\s*(\d{4})\/(\d{2})\/(\d{2})/)
    if (!match) return

    const [_, year, month, day] = match
    const timestamp = new Date(`${year}-${month}-${day}`).getTime()

    contents.push({
      year,
      fileName: file,
      filePath: `/${file.replace(/\.md$/, '')}`,
      timestamp,
    })
  })

  contents.sort((a, b) => b.timestamp - a.timestamp)

  return contents
}

export default getContents()
