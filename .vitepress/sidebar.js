import contents from "../utils/genContents";

function genSideBar() {
  const sidebarMap = {};

  contents.forEach((item) => {
    if (!sidebarMap[item.year]) {
      sidebarMap[item.year] = {
        text: `${item.year} 年`,
        collapsed: false,
        items: [],
      };
    }

    sidebarMap[item.year].items.push({
      text: getPrefix(item.fileName),
      link: "/docs/" + item.filePath,
    });
  });

  const sidebar = Object.values(sidebarMap).sort((a, b) =>
    b.text.localeCompare(a.text)
  );

  return sidebar;
}

function getPrefix(fileName) {
  // 移除文件扩展名，但保留文件名中的其他点号
  return fileName.replace(/\.md$/, "");
}

const sidebar = genSideBar();

export default sidebar;
