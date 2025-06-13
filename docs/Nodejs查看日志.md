---
Last updated: 2024/05/21 09:05
---
# Nodejs查看日志
假如现有一个名为test01.js的文件
```javascript
let num = 0;
for (var i = 0; i < 1000000; i++) {
  num += i;
  var a = {};
}
```
想要查看该文件执行的GC日志等，可以在终端中输入
```
node --prof test01.js
```
然后会得到一个名称类似于`isolate-000002D298AC58E0-30216-v8.log`的文件，此时会发现这个log文件的可读性不好<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/29584666/1713856115995-0fbfc62f-c2c5-4cd8-ac9d-0c5f082ddbbd.png#averageHue=%232e2b29&clientId=u3c4fa9ac-cc17-4&from=paste&height=800&id=ud272a364&originHeight=800&originWidth=926&originalType=binary&ratio=1&rotation=0&showTitle=false&size=216675&status=done&style=none&taskId=u9151c2eb-e296-43bf-969d-fde7d0dbac4&title=&width=926)<br />为了得到一个可读性更好的log，接着在终端输入
```
node --prof-process isolate-000002D298AC58E0-30216-v8.log > log.txt
```
然后再`log.txt`中查看会得到可读性更好的log<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/29584666/1713856278746-575ad110-1c4f-4f6a-8ee8-4f6d82b7ffc5.png#averageHue=%23232221&clientId=u3c4fa9ac-cc17-4&from=paste&height=665&id=ud951aa6f&originHeight=665&originWidth=991&originalType=binary&ratio=1&rotation=0&showTitle=false&size=62947&status=done&style=none&taskId=u24137756-930c-4ec7-bcfd-782a2f9d18e&title=&width=991)

---

<div align="right">2024/05/21</div>