//  js中一共包含了7中基本类型 可以使用typeof进行识别
// 理论上有： number string undefined boolean symbol object null
// 实际上： 没有null  因为null被认为是object 这是js的错误  同时多了function这一类型，这是因为typeof 对function 区别对待 不是很正确 但是编程方便
console.log(typeof 0);
console.log(typeof "str");
console.log(typeof undefined);
console.log(typeof true);
console.log(typeof Symbol("id"));
// Math 是一个提供数学运算的内建 object。我们会在 数字类型 一节中学习它。此处仅作为一个 object 的示例。
// typeof null 的结果是 "object"。这其实是不对的。官方也承认了这是 typeof 运算符的问题，现在只是为了兼容性而保留了下来。当然，null 不是一个 object。null 有自己的类型，它是一个特殊值。再次强调，这是 JavaScript 语言的一个错误。
// typeof Math.random 的结果是 "function"，因为 random 在 JavaScript 语言中是一个函数。在 JavaScript 语言中没有一个特别的 “function” 类型。函数隶属于 object 类型。但是 typeof 会对函数区分对待。这不是很正确的做法，但在实际编程中非常方便。

console.log(typeof Math);
console.log(typeof null);
console.log(typeof Math.random);

// 我们需要知道的最重要的三种类型转换： 转string类型  转number类型(不同类型比较时需要转number比较) 转boolean类型（if等操作符）

// 类型之间的比较   > < >= <=  ==
// 基础类型之间的比较：number string undefined null boolean 不包含object和symbol
// 同类型之间的比较
console.log("number类型比较：" + (1 > 0));

console.log("string类型比较" + ("12" > "21"));

console.log("undefined类型比较:" + (undefined > undefined));
console.log("undefined类型比较:" + (undefined == undefined));
console.log("undefined类型比较:" + (undefined >= undefined));

console.log("null类型比较:" + (null > null));
console.log("null类型比较:" + (null == null));
console.log("null类型比较:" + (null >= null));

console.log("boolean类型的比较" + (true > true));
console.log("boolean类型的比较" + (true == true));
console.log("boolean类型的比较" + (true >= true));

// 不同类型之间的比较： 将其他类型先转化为数字类型number再比较
// 注意其他类型转number的规则;
// rule1: undefined	NaN
// rule2: null	0
// rule3: true 和 false	1 and 0
// rule4: string	去掉首尾空格后的纯数字字符串中含有的数字。如果剩余字符串为空，则转换结果为 0。
//                  否则，将会从剩余字符串中“读取”数字。当类型转换出现 error 时返回 NaN。
