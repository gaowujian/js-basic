// https://juejin.im/post/5ca0a4c5f265da3094115a6d#heading-8
// this 指针的绑定有四种方式
// this 总是依托与一个实例对象
// 隐式绑定 通过给对象添加一个函数作为属性 这个函数this指针指向该对象
// 在浏览器和node环境下 我们都有一个初始的全局对象 window 和 global
let num = 10;
console.log(global.num);
global.num = 20;
console.log(this.num);
console.log(this === global);
function A() {
  console.log(this.num++);
}
let obj = {
  num: 30,
  B: function() {
    console.log(this.num++);
    return () => console.log(this.num++);
  }
};
A();
let b = obj.B;
b()();
obj.B();
b.apply(obj);
new A();
console.log(global.num);
