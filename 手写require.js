const path = require("path");
const fs = require("fs");

const vm = require("vm");
function Module(id) {
  // id就是文件的绝对路径
  this.id = id;
  this.exports = {};
}

//js文件函数执行模版
let wrapper = [
  "(function(exports,require,module,__filename,__dirname){",
  "\n})",
];
Module._extensions = {
  ".js": function (module) {
    let script = fs.readFileSync(module.id, "utf-8");
    let fnStr = wrapper[0] + script + wrapper[1];
    // 可以返回一个真实的函数，并等待执行
    let fn = vm.runInThisContext(fnStr);

    //  不能直接改变exports,他是不能修改module.exports的
    let exports = module.exports;
    fn.call(exports, exports, req, module, module.id, path.dirname(module.id));
  },
  ".json": function (module) {
    let script = fs.readFileSync(module.id, "utf-8");
    module.exports = JSON.parse(script);
  },
};

//缓存优化
Module._cache = {};

function resolveFileName(filename) {
  //解析绝对路径
  const r = path.resolve(__dirname, filename);
  // 判断存在
  const isExisted = fs.existsSync(r);
  if (isExisted) {
    return r;
  } else {
    //依次尝试添加
    const keys = Object.keys(Module._extensions);
    for (let i = 0; i < keys.length; i++) {
      const ext = keys[i];
      let tryFileName = r + ext;
      if (fs.existsSync(tryFileName)) {
        return tryFileName;
      }
    }
    //尝试了所有后缀均不可以,顺序查找
    throw new Error("module not found");
  }
}

function tryModuleLoad(module) {
  //获取文件后缀名字
  let extname = path.extname(module.id);
  //对不同的后缀找到处理函数，并执行加载逻辑
  Module._extensions[extname](module);
}

function req(filename) {
  // 成功获取到文件的路径
  const absPath = resolveFileName(filename);
  //查看缓存
  let cache = Module._cache[absPath];
  if (cache) return cache.exports;
  // 没有缓存,根据路径创建新模块
  const module = new Module(absPath);
  // 缓存模块
  Module._cache[absPath] = module;
  //   加载模块, 核心内容,
  // 加载完之后 module.exports就有了内容,再返回，这不是一个纯函数
  tryModuleLoad(module);
  // 返回模块内容
  return module.exports;
}

let str = req("./test");
//多次加载取缓存
str = req("./test");

console.log(str);
