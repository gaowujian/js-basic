// 转化为false的几种情况
// 1. null;
// 2. NaN;
// 3. 0;
// 4. empty string ("" or '' or ``);
// 5. undefined.
// 其余的情况都转化为true

// && 和 || 逻辑与  和逻辑或

// !!!  注意 && 的 优先级高于 ||
// !!!  所以 代码 a && b || c && d 完全跟 && 表达式加了括号一样：(a && b) || (c && d)

// expr1 && expr2 返回第一个假值 全是真的 返回最后一个真的
// 从左到右依次计算操作数。
// 将处理每一个操作数时，都将其转化为布尔值。如果结果是 false，就停止计算，并返回这个操作数的初始值。
// 如果所有的操作数都被计算过（也就是，转换结果都是 true），则返回最后一个操作数。
console.log(null && NaN && "string");

// expr1 || expr2  返回第一个真值，全是假的返回最后一个假的
// 从左到右依次计算操作数。
// 处理每一个操作数时，都将其转化为布尔值。如果结果是 true，就停止计算，返回这个操作数的初始值。
// 如果所有的操作数都被计算过（也就是，转换结果都是 false），则返回最后一个操作数。
console.log(undefined || "dd");

// 短路求值(short circuit evaluation)问题和 实用场景
// 短路求值指的是 当第一个运算数的值无法确定逻辑运算的结果时，才对第二个运算数进行求值

// && 可以用来确定第一个真值 用来避免调用undefined参数的属性时报错
var dog = {
  bark: function() {
    console.log("barking");
  }
};
dog.bark(); //若dog未定义，该行出错
dog && dog.bark(); //dog未定义 则返回undefined

//  ||可以用来确定第一个假值  用来给变量设置默认值
function theSameOldFoo(name){
  name = name || 'Bar' ;
  console.log("My best friend's name is " + name);
}
theSameOldFoo();  // My best friend's name is Bar
theSameOldFoo('Bhaskar');  // My best friend's name is Bhaskar
