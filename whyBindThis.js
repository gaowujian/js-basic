// react为什么要使用this绑定就是因为如下原因
// 主要是函数的调用方式，不是通过对象调用，而是先赋值再调用，造成了this的丢失
// 一种是直接绑定this，
// 另一种是使用箭头函数，所以在创建实例的时候，构造函数的this指针指向了实例，那么箭头函数直接绑定到了实例上
class todoList {
  constructor() {
    this.state = {
      inputValue: "",
    };
  }
  a = (value) => {
    this.state.inputValue = value;
    console.log(this.state.inputValue);
  };
  b(value) {
    this.state.inputValue = value;
    console.log(this.state.inputValue);
  }
}

var todo = new todoList();
console.log(todo);

//  注意todo实例上的a是一个箭头函数，this指向了外层function的this，因为初始化的时候，this指向了实例对象
// 所以todo.a中的this也是指向了实例对象，而且这个函数调用的时候，不会因为调用方式改变this指向
var a = todo.a;
todo.a("aa");
console.log("a:", a);
a("aa");
// console.log(Object.getOwnPropertyNames(todo.__proto__));
// 注意todo实例上的b是一个普通函数，根据不同的调用方式this会发生变化
// 注意 todo.b("bb");这种形式 b的this指向了todo  而b("bb") 这种形式 b的this指向了全局对象，
// 即window或者node下的global，而window下并没有state属性，所以抛出异常
var b = todo.b;
todo.b("bb");
console.log("b:", b);
b("bb");
