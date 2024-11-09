---
Last updated: 2022/12/12 12:26
---
# JavaScript使用生成器时不写分号出现的问题
<a name="Ad8vE"></a>
## 问题
下面是一段斐波那契数列的生成器代码
```javascript
function* fibonacciSequence() {
  let x = 0, y = 1;
  for(;;) {
    yield y;
    [x, y] = [y, x + y];
  }
}
```
由于我平时写js的习惯是不写分号，所以我在敲上面那段代码时去掉了分号
```javascript
function* fibonacciSequence() {
  let x = 0, y = 1
  for(;;) {
    yield y
    [x, y] = [y, x + y]
  }
}
```
此时我想要知道第20个斐波那契数，于是写下这段代码
```javascript
function fibonacci(n) {
  for(let f of fibonacciSequence()) {
    if(n-- <= 0) {
      return f
    }
  }
}
```
此时调用方法发现结果是
```javascript
fibonacci(20) // => [ 1, 1 ] 与预想的结果不符合
```
而正常的第20个斐波那契数应该是10946<br />要知道JavaScript解释器是有ASI（Automatic Semicolon Insertion）机制的，即自动插入分号，那两段代码只有分号的区别，初步判断是ASI没有照着期望的方向添加分号<br />于是通过[Esprima Parser](https://esprima.org/demo/parse.html#)将js的语法树解析出来看看之后发现<br />不加分号的yield语句后面跟的是赋值表达式<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/29584666/1708240933782-9781162f-4056-416a-9cd1-724c36b10c4a.png#averageHue=%23323227&clientId=u86e1010b-176d-4&from=paste&height=307&id=u9d6aa140&originHeight=307&originWidth=512&originalType=binary&ratio=1&rotation=0&showTitle=false&size=32256&status=done&style=none&taskId=u1246dc8e-ccb5-4369-8132-d92288a3a84&title=&width=512)<br />而加分号之后的yield语句后面是标识符<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/29584666/1708240971008-4a6dc592-61ed-42a9-a8c5-64f43acb3030.png#averageHue=%2333342a&clientId=u86e1010b-176d-4&from=paste&height=335&id=u3de822fc&originHeight=370&originWidth=568&originalType=binary&ratio=1&rotation=0&showTitle=false&size=32953&status=done&style=none&taskId=ufb946e2c-9584-4ca1-b59d-8871f2441e8&title=&width=514)
<a name="ta1vc"></a>
## ASI规则
ECMAScript 标准定义的 ASI 包括**三条规定**和**两条例外**。<br />**三条规则**

1. 解析器从左往右解析代码（读入 `token`），当碰到一个不能构成合法语句的 `token` 时，他会在以下几种情况中，在该 `token` 之前插入分号，此时不合群的 `token` 被称为`违规 token` （`offending token`）
   - 1.1 如果这个 `token` 跟上一个 `token` 之间有至少一个换行。
   - 1.2 如果这个 `token` 是 `}`。
   - 1.3 如果前一个 `token` 是 `)` 它会试图把签名的 `token` 理解成 `do-while` 语句并插入分号。
2. 当解析到文件末尾发现语法还是无法构成合法的语句，就会在文件末尾插入分号。
3. 当解析碰到 `restricted production` 的语法（比如 `return`），并且在 `restricted production`规定的 `[no LineTerminator here]` 的地方发现换行，那么换行的地方就会被插入分号。

**两条例外**

1. 分号不能被解析成空语句。
2. 分号不能被解析成 `for` 语句的两个分号之一。
<a name="bjcLN"></a>
## 分析
根据ASI规则可知JavaScript解释器解析到yield语句时<br />第一个token是“y”第二个token是“[”不满足添加分号的条件<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/29584666/1708242059305-aafa6e11-307c-4b8d-a597-10d10cd66ff2.png#averageHue=%23282b38&clientId=u86e1010b-176d-4&from=paste&height=176&id=u92156280&originHeight=176&originWidth=375&originalType=binary&ratio=1&rotation=0&showTitle=false&size=10333&status=done&style=none&taskId=uae9dca51-6c42-4eb4-8501-7053e6e0e7e&title=&width=375)<br />于是上面不加分号的代码就会被解析为
```javascript
function* fibonacciSequence() {
  let x = 0, y = 1;
  for(;;) {
    yield y[x, y] = [y, x + y];
  }
}
```
所以和预想的不符合
