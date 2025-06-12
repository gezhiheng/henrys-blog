---
Last updated: 2024/07/21 09:35
---
# VSCode快速打出console.log
![image.png](https://cdn.nlark.com/yuque/0/2024/png/29584666/1708304960310-a82efeaa-27d5-4a77-b5ee-a7a7d30c2656.png#averageHue=%232e303e&clientId=u3423122a-65ae-4&from=paste&height=740&id=u06f932ac&originHeight=740&originWidth=778&originalType=binary&ratio=1&rotation=0&showTitle=false&size=99356&status=done&style=none&taskId=u49a9f55d-5aa5-42ac-8ca0-70a197df79a&title=&width=778)<br />如图打开vscode的配置<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/29584666/1708305093809-0894bbc5-e392-4e35-b031-4d1dbd952b28.png#averageHue=%23262834&clientId=u3423122a-65ae-4&from=paste&height=494&id=ua4ba46d0&originHeight=494&originWidth=745&originalType=binary&ratio=1&rotation=0&showTitle=false&size=48734&status=done&style=none&taskId=u97f1f8d0-0708-4a4b-8c0f-12cb2ba3768&title=&width=745)<br />这部分如果注释取消注释并在body中设置console的格式<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/29584666/1708305075746-199ef7b6-e010-420e-84af-e879cf72003c.png#averageHue=%23292d3a&clientId=u3423122a-65ae-4&from=paste&height=320&id=u2a7f0558&originHeight=320&originWidth=607&originalType=binary&ratio=1&rotation=0&showTitle=false&size=26822&status=done&style=none&taskId=u72d5ba40-716b-4d01-8b27-c483c80d276&title=&width=607)<br />我的用户代码片段的配置
```json
{
  // Place your snippets for javascript here. Each snippet is defined under a snippet name and has a prefix, body and 
  // description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
  // $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the 
  // same ids are connected.
  // Example:
  "Print to console": {
    "prefix": "csl",
    "body": [
      "console.log($1)",
    ],
    "description": "Log output to console"
  },
  "Print to error console": {
    "prefix": "cse",
    "body": [
      "console.error($1)",
    ],
    "description": "Log error output to console"
  }
}
```

---

<div align="right">2024/07</div>