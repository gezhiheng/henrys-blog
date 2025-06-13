---
Last updated: 2024/04/21 14:01
---
# JavaScript函数防抖
函数防抖是指 一个函数只能在t时间后才能被调用，如果该函数在t时间内被调用就会取消这次函数的调用，打断施法(doge，下面是一个精简实现

```
/**
 * 函数防抖
 * @param {Function} fn
 * @param {number} t milliseconds
 * @return {Function}
 */
var debounce = function(fn, t) {
  let timer
  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
    }, t)
  }
};
```

---

<div align="right">2024/04/21</div>