//  js中一共包含了7中基本类型 可以使用typeof进行识别
// 理论上有： number string undefined boolean null symbol object bigInt
// 实际上： 没有null  因为null被认为是object 这是js的错误  同时多了function这一类型，这是因为typeof 对function 区别对待 不是很正确 但是编程方便
//  基本类型

// 暂不考虑 symbol, bigInt 以及object中的error
var valueTypes = ['str', 1, true, null, undefined];
var refTypes = [{}, function () {}, new Date(), new RegExp()];
var allTypes = [...valueTypes, ...refTypes];

// ! 使用typeof 查看类型
// allTypes.forEach((item) => {
//   console.log(item, '=>', typeof item, typeof typeof item);
// });

// ! 使用 xx + "" 强转为字符串
// valueTypes.forEach((item) => {
//   console.log(item, '=>', item + '');
// });

// ! 使用 +xx 强转为数字
// valueTypes.forEach((item) => {
//   console.log(item, '=>', +item);
// });

// ! 复杂类型做强制转换
refTypes.forEach((item) => {
  console.log('');
  console.log(item, '=>', 'prototype:', Object.prototype.toString.call(item));
  console.log('valueOf值', item.valueOf());
  console.log('toString值', item.toString());
  console.log(item, '转字符串=>', item + '');
  console.log(item, '转数字=>', +item);
  console.log('');
});
