// 普通函数和箭头函数的区别
// 1 没有this
// 箭头函数没有this  需要通过作用域链来查找this的值 this绑定的就是最近一层非箭头函数的 this
function Timer() {
  this.s1 = 0;
  this.s2 = 0;
  // 箭头函数
  setTimeout(() => {
    console.log(this);
    return this.s1++;
  }, 1000);
  // 普通函数
  setTimeout(function () {
    console.log(this);
    this.s2++;
  }, 1000);
}

var timer = new Timer();

// setTimeout(() => console.log("s1: ", timer.s1), 3100);
// setTimeout(() => console.log("s2: ", timer.s2), 3100);

// 2 没有arguments
// 3 不能使用 new （因为没有this，当然不能通过new创建新实例绑定this）
