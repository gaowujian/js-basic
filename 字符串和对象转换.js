// 1. 使用url （内置模块）
// 只能用于url格式的字符串解析
const url = require("url");
console.log(
  url.parse("https://tieba.baidu.com/p/3551358746?red_tag=2314917163")
);
// {
//     protocol: "https:",
//     slashes: true,
//     auth: null,
//     host: "tieba.baidu.com",
//     port: null,
//     hostname: "tieba.baidu.com",
//     hash: null,
//     search: "?red_tag=2314917163",
//     query: "red_tag=2314917163",
//     pathname: "/p/3551358746",
//     path: "/p/3551358746?red_tag=2314917163",
//     href: "https://tieba.baidu.com/p/3551358746?red_tag=2314917163",
//   }
const urlObj = new URL(
  "https://tieba.baidu.com/p/3551358746?red_tag=2314917163"
);

// 使用url字符串创建一个URL类的对象，可以通过searchParams属性获取到查询字符串的部分
// 这部分可以就可以看作是一个querystring
console.log(urlObj.search);
console.log(urlObj.searchParams.toString());

// 2. JSON
// 只能用于json格式的字符串解析和字符串化

const jsonString = JSON.stringify([{ name: "tony" }, 2, 3]);
console.log(jsonString);
const jsonObj = JSON.parse('{"name":"tony","age":18}');
console.log(jsonObj);

// 3.querystring（内置模块）
// http://nodejs.cn/api/querystring.html#querystring_querystring_parse_str_sep_eq_options
// 用于querystring查询字符串格式的字符串解析和字符串化
// 支持配置基本的分隔符，key-value分隔符，编码方式
const querystring = require("querystring");
const obj = querystring.parse("w=%E7%8F%A0%E5%B3%B0&foo=bar", "&", "=");
console.log(obj);

const str = querystring.stringify(obj, "&&", "==");
console.log(str);

// 4. qs (第三方模块)
// 用于解析querystring 查询字符串，可以算是querystring的拓展
// 支持配置基本的分隔符，key-value分隔符，编码方式
// 支持嵌套
// comma?: boolean;
// delimiter?: string | RegExp;  分隔符，默认为&
// depth?: number | false;   嵌套的层数，默认五层 a[b][c][d][e][f][g][h][i]=j
// decoder?: (str: string, defaultDecoder: defaultDecoder, charset: string, type: 'key' | 'value') => any;
// arrayLimit?: number;
// parseArrays?: boolean;
// allowDots?: boolean;  用于支持点操作符，默认支持[], e.g 'a.b=c', { allowDots: true }
// plainObjects?: boolean;   使用Object.create(null)创建纯净对象
// allowPrototypes?: boolean; 用于覆盖原型链上的属性，例如hasOwnProperty 默认为false不覆盖,出现hasOwnProperty就返回{}
// parameterLimit?: number;  用于限制解析key-value对的个数,默认支持1000对
// strictNullHandling?: boolean; "a"==> {a:null}
// ignoreQueryPrefix?: boolean; 用于省略querystring开始的?
// charset?: 'utf-8' | 'iso-8859-1'; 默认utf-8
// charsetSentinel?: boolean;
// interpretNumericEntities?: boolean;
(function () {
  const qs = require("qs");
  //   const obj = qs.parse("a[1]=b");
  //   console.log(obj);
  console.log(qs.stringify({ a: { b: "c" } }, { encode: false }));
})();
