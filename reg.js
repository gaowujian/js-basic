// function case1() {
//   const str = "09_zhuan.mov 10_zhuan_Denoise.mov 1_zhuan.mov 12_zhuan_Denoise.mov 13_zhuan.mov";
//   console.log(str.match(/\d_zhuan\.mov/g));
//   // [ '09_zhuan.mov', '1_zhuan.mov', '13_zhuan.mov' ]
//   // 为什么不是 [ '9_zhuan.mov', '1_zhuan.mov', '3_zhuan.mov' ]
// }
// case1();
console.log(/^(abc|def)/.test("abc"));

// // 模拟字符串trim的操作

// const str = "my name is tony";
// function capitalize(str) {
//   return str.toLowerCase().replace(/(^|\s)\w/g, (content) => {
//     // 匹配到的是空格和一个有效字符,然后直接变成大写字母
//     return content.toUpperCase();
//   });
// }
// const result = capitalize(str);
// console.log("result:", result);

// // console.log(/?=.*[0-9]^/.test("222"));
// // /?=.*[0-9]/.test

// // var regex = /(?=.*[0-9])/;
// // console.log(regex.test("9ff"));

// // function dasherize(str) {
// //   return str.replace(/([A-Z])/g, "-$1").toLowerCase();
// // }
// // console.log(dasherize("MozTransform"));
// var string = "12345";
// var regex = /^(\d{1,3}?)(\d{1,3})$/;
// console.log(string.match(regex));
