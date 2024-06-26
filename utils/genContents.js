import { readdirSync, statSync } from 'fs'

function genContents(path, dir = '') {
  const files = readdirSync(path)
  const contents = []

  files.forEach(file => {
    const filePath = `${path}/${file}`
    const fileStat = statSync(filePath)

    if (fileStat.isDirectory()) {
      contents.push(...genContents(filePath, file))
    } else {
      contents.push({
        dir,
        fileName: file,
        filePath: `/${filePath}`,
      })
    }
  })

  return contents
}

const contents = genContents('docs')

export default contents
