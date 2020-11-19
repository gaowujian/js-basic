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
  ".json": function () {},
};

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

function req(filename) {
  const absPath = resolveFileName(filename);
  //   根据路径创建模块
  const module = new Module(absPath);
  //   加载模块, 核心内容
  tryModuleLoad(module);
  // 返回模块内容
  return module.exports;
}

function tryModuleLoad(module) {
  //获取文件后缀名字
  let extname = path.extname(module.id);
  //对不同的后缀找到处理函数，并执行加载逻辑
  Module._extensions[extname](module);
}

let str = req("./test");

console.log(str);
