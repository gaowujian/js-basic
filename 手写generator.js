// 浏览器端解决异步问题
// 回调 ==> promise ==> generator ==> async await

function co(generator) {
  const it = generator();
  function next(value) {
    const result = it.next(value);
    if (!result.done) {
      next(result.value);
    }
  }
  next();
}

function* gen() {
  const a = yield 1;
  console.log(a);
  const b = yield 2;
  console.log(b);
  const c = yield 3;
  console.log(c);
}
const it = gen();
console.log(it.next());
co(gen);
