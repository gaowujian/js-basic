// map 和object 基本是一致的，最大的区别是object键是string 而map的键可以是任何类型
//! 创建map需要传入一个键值对的数组
//! var map = new Map([ ["name","John"], ["age", 30] ])
var map = new Map();
// map.set(key,value) 设置键 可以用object作为key
var key = { name: "tony", age: 18 };
map.set(key, "good student");
console.log(map);
// map.get(key) 获取键值 不存在返回undefined
console.log(map.get(key));
// map.has(key) 判断key是否存在 返回boolean
console.log(map.has("person"));
// map.delete(key)
map.delete(key);
console.log(map);
// map.clear()  清理所有键值对
map.clear();
console.log(map);
// map.size 获取map的大小 和length一样是属性 不是方法
console.log(map.size);

// 关于map类型的迭代
let recipeMap = new Map([
  ["cucumber", 500],
  ["tomatoes", 350],
  ["onion", 50]
]);

// 迭代键（vegetables）
for (let vegetable of recipeMap.keys()) {
  console.log(vegetable); // cucumber, tomatoes, onion
}

// 迭代值 (amounts)
for (let amount of recipeMap.values()) {
  console.log(amount); // 500, 350, 50
}

// 迭代 [key, value] 对
for (let entry of recipeMap) {
  // 效果跟 recipeMap.entries() 相同
  console.log(entry); // cucumber,500 (and so on)
}

// Object.entries() 可以把对象转换为创建map所需的数据格式（键值对数组）
// var map = new Map({ name: "tony", age: 18 }); //!!! 出错，因为对象不可迭代
// * Object.fromEntries() 和Object.entries() 实现了对象和键值对列表之间的转换(map和object)（hash table 和 dictionary）
var map = new Map(Object.entries({ name: "tony", age: 18 }));

map.set({ name: "jingjing" }, 1);
console.log(map);
for (const iterator of map.keys()) {
  console.log(iterator);
}
for (const iterator of map.values()) {
  console.log(iterator);
}
for (const iterator of map.entries()) {
  console.log(iterator);
}
// Object.fromEntries() 把map转化为对象
var obj = Object.fromEntries(map);
console.log(obj);

// Set 是一个特别的类型集合 - 值的集合 （没有键），他的值一次只出现一次
var set = new Set(["apple", "pear", "banana", "apple"]);
console.log(set);
// set.add() 添加新元素
set.add("pineapple");
console.log(set);
// set.delete() 删除元素
set.delete("pear");
console.log(set);
// set.has() 判断是否存在
console.log(set.has("banana"));
// set.clear() 清除所有元素
// set.clear();
console.log(set);
// set.size 返回元素数量
console.log(set.size);

// Object对象也有自己的keys， values 和 entries方法
// 对于 map 和set 他们的返回值是 迭代器对象  而 Object返回的是真正的 数组
var map = new Map([
  ["name", "tony"],
  [{ name: "jingjing" }, 18]
]);

for (let [key, value] of map.entries()) {
  console.log(`key:${key} value:${value}`);
}

let salaries = {
  John: 100,
  Pete: 300,
  Mary: 250
};

function topSalary(salaries) {
  if (!salaries) return null;
  for (let [key, value] of Object.entries(salaries)) {
    console.log(`key:${key} value:${value}`);
  }
}
topSalary(salaries);
