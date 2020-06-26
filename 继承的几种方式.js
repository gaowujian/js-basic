// 1. 构造函数继承
// function Parent(name = "daddy") {
//   this.name = name;
// }

// Parent.prototype.getName = function () {
//   return this.name;
// };

// function Child(name) {
//   //导致父类里的属性都可以由子类生成的实例继承
//   Parent.call(this, name);
// }

// var child1 = new Child("tony");
// console.log(child1);
// child1.name = "tony";
// var child2 = new Child();
// console.log(child2);

// ! 缺点 无法继承父亲的原型对象，有缺陷

// 2. 原型链式继承
// function Parent1() {
//   this.name = "parent1";
//   this.colors = ["red", "blue", "yellow"];
// }

// function Child1() {
//   this.name = "child1";
// }

// Child1.prototype = new Parent1();

// Parent1.prototype.sex = "男";
// Parent1.prototype.say = function() {
//   console.log(" Oh,My God! ");
// };

// new Child1().sex; //  男
// // console.log("Person -> new Child1().sex", new Child1().sex);
// new Child1().say(); // Oh,My God!

// // Turbo Console Log

// console.log(new Child1().__proto__);

// // //  * 解决了继承父亲原型对象的问题
// var s1 = new Child1();
// s1.colors.push("black");
// var s2 = new Child1();
// s1.colors; // (4) ["red", "blue", "yellow", "balck"]
// console.log("s1.colors;", s1.colors);
// s2.colors; // (4) ["red", "blue", "yellow", "balck"]
// // console.log("s2.colors;", s2.colors);
// ! 缺点，但是多个实例共享一份父亲的对象

// 3. 组合式继承（借用构造器和原型链两种方式）
// function Parent2() {
//   this.name = "parent2";
//   this.colors = ["red", "blue", "yellow"];
// }

// function Child2() {
//   Parent2.call(this); //构造器继承
//   this.type = "child2";
// }

// Child2.prototype = new Parent2(); //原型链继承

// var s1 = new Child2();

// s1.colors.push("black");

// var s2 = new Child2();

// s1.colors; // (4) ["red", "blue", "yellow", "balck"]
// console.log("s1.colors", s1.colors);

// s2.colors; // (3) ["red", "blue", "yellow"]
// console.log("s2.colors", s2.colors);

// * 实现了父亲对象的隔离
// ! 缺点是父类的构造函数被执行了两次，第一次是Child2.prototype = new Parent2()，
// ! 第二次是在实例化的时候，子类的constructor直接call了父亲的constructor，这是没有必要的

// 4. 组合继承方式优化 1
// function Parent3() {
//   this.name = "parent3";
//   this.colors = ["red", "blue", "yellow"];
// }

// Parent3.prototype.sex = "男";
// Parent3.prototype.say = function () {
//   console.log("Oh, My God！");
// };

// function Child3() {
//   Parent3.call(this);
//   this.type = "child3";
// }

// // * 优化，直接把父类的原型对象赋链接给给子类的原型对象
// Child3.prototype.__proto__ = Parent3.prototype;
// var s1 = new Child3();
// var s2 = new Child3();

// console.log(s1, s2);

// // !缺点： 无法识别是被哪个类进行实例化的
// console.log(s1 instanceof Child3); // true
// console.log(s1 instanceof Parent3); // true
// // ! s1的构造函数是父而不是子类，这是不能接受的 继续优化
// console.log(s1.constructor.name);

// 5. 组合继承方式优化2

// 这是继承的最完美方式;

function Parent4() {
  this.name = "parent4";
  this.colors = ["red", "blue", "yellow"];
}

Parent4.prototype.sex = "男";
Parent4.prototype.say = function () {
  console.log("Oh, My God！");
};

function Child4() {
  Parent4.call(this);
  this.type = "child4";
}
// Object.create 创建一个新的对象，使用已经存在的对象作为该对象的原型
// 使用 Child4.prototype.__proto__ = Parent4.prototype; 也是可以实现功能的
// ! 缺陷是如果子类在prototype傻姑娘添加了方法，父类也有这个方法，是不可以接受的，需要拷贝
// 但是指向的是同一个引用而不是一个新的引用，实际上就是拷贝了prototype对象，给了子类
Child4.prototype = Object.create(Parent4.prototype);

// 等价于;
// function Temp() {}
// Temp.prototype = Parent4.prototype;
// Child4.prototype = new Temp();

// 等价于;
// Child4.prototype = new Parent4();

// 结果就是;
// Child4.prototype.__proto__ = Parent4.prototype;

// Child4.prototype.__proto__ = Parent4.prototype;
// * 修改constructor的指向，因为初始化的时候是call的父亲的构造函数
// Child4.prototype.constructor = Child4;
// Child4.prototype.getType = function () {
//   console.log(this.type);
// };

// var s1 = new Child4();
// var s2 = new Child4();
// console.log(s1, s2);
// // !缺点： 无法识别是被哪个类进行实例化的
// console.log(s1 instanceof Child4); // true
// console.log(s1 instanceof Parent4); // true
// // ! s1的构造函数是父而不是子类，这是不能接受的 继续优化
// console.log(s1.constructor.name);

// 6. ES6中继承
// Class 可以通过extends关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。

// ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。
// ES6 的继承机制完全不同，实质是先创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改this
