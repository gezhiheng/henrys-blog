import { readdirSync, statSync, readFileSync } from 'fs'
import path from 'path'

let posts = []

function genRecentPosts(directoryPath) {
  const files = readdirSync(directoryPath)
  
  files.forEach(file => {
    const filePath = path.join(directoryPath, file)
    const fileStat = statSync(filePath)

    if (fileStat.isDirectory()) {
      genRecentPosts(filePath)
    } else {
      // 读取文件内容
      const content = readFileSync(filePath, 'utf8')
      const lines = content.split('\n')
      const secondLine = lines[1] || ''
      let date = parseDateTime(secondLine)

      posts.push({
        title: path.basename(filePath).replace(/\.md$/, ''),
        path: filePath.replace(/\.md$/, ''),
        formatDate: formatDate(date),
        date
      })
    }

  })
}

function parseDateTime(input) {
  const match = 
    input.match(/Last updated:\s*(\d{4})\/(\d{1,2})\/(\d{1,2})\s+(\d{2}):(\d{2})/)

  if (!match) {
    return 0
  }

  // 获取各个部分，并将月和日格式化为两位数
  const year = match[1]
  const month = match[2].padStart(2, '0')
  const day = match[3].padStart(2, '0')
  const hour = match[4]
  const minute = match[5]

  const result = parseInt(`${year}${month}${day}${hour}${minute}`, 10)
  return result
}

function formatDate(input) {
  if (input == 0) {
    return '-'
  }
  const str = input.toString();
  const year = str.substring(0, 4);    // 提取年份
  const month = str.substring(4, 6);   // 提取月份
  const day = str.substring(6, 8);     // 提取日期

  return `${year}/${month}/${day}`;
}

genRecentPosts('docs')

posts.sort((a, b) => b.date - a.date)

posts = posts.slice(0, 5)

// console.log(posts)

export default posts
