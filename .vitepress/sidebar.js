import contents from '../utils/genContents'

function genSideBar() {

  const sidebar = [
    {
      text: '经验分享',
      collapsed: false,
      items: []
    },
    {
      text: '踩坑记录',
      collapsed: false,
      items: []
    },
    {
      text: '学习笔记',
      collapsed: false,
      items: []
    },
    {
      text: '其他',
      collapsed: false,
      items: []
    }
  ]

  const sectionIndexes = {
    experience: 0,
    bugs: 1,
    study: 2,
    other: 3,
  }
  
  contents.forEach(item => {
    sidebar[sectionIndexes[item.dir]].items.push({
      text: getPrefix(item.fileName),
      link: item.filePath
    })
  })

  return sidebar
}

function getPrefix(fileName) {
  const parts = fileName.split('.')
  if (parts.length > 1) {
    return parts[0]
  } else {
    return fileName
  }
}

const sidebar = genSideBar()

export default sidebar
