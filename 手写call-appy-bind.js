const obj = {
  name: "tony",
};

let fn = function fn() {
  console.log(this.name);
};

fn.myBind = function bind(context, ...outerArgs) {
  const _this = this;
  return function fn(...innerArgs) {
    _this.call(context, ...innerArgs);
  };
};

let newObj = fn.myBind(obj);
newObj();
