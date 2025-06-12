import contents from '../utils/genContents'

function genSideBar() {
  const sidebarMap = {}

  contents.forEach(item => {
    if (!sidebarMap[item.year]) {
      sidebarMap[item.year] = {
        text: `${item.year} 年`,
        collapsed: false,
        items: []
      }
    }

    sidebarMap[item.year].items.push({
      text: getPrefix(item.fileName),
      link: '/docs/' + item.filePath
    })
  })

  const sidebar = Object.values(sidebarMap).sort((a, b) => b.text.localeCompare(a.text))

  return sidebar
}

function getPrefix(fileName) {
  const parts = fileName.split('.')
  return parts.length > 1 ? parts[0] : fileName
}

const sidebar = genSideBar()

export default sidebar
