// 数组去重的方法

const arr = [10, 20, 20, 20, 20, 10, 70];

// 1. 使用foreach 和 includes

const newArr1 = [];
arr.forEach((item) => {
  if (newArr1.includes(item)) {
    return;
  }
  newArr1.push(item);
});
console.log(newArr1);

// 2. 使用splice
// 注意数组塌陷的问题，如果一遍循环，一遍使用修改原数组长度的操作，在遍历的时候会漏掉一些元素，
// 数组塌陷后，我们需要用i--，之后可以和遍历的step条件i++相互抵消

for (let i = 0; i < arr.length; i++) {
  const a = arr[i];
  for (let j = i + 1; j < arr.length; j++) {
    const b = arr[j];
    if (a === b) {
      arr.splice(j, 1);
      // 解决塌陷
      j--;
    }
  }
}
console.log(arr);

// 3. 使用对象属性进行去重

const obj = {};

for (let i = 0; i < arr.length; i++) {
  const element = arr[i];
  // 判断对象中该属性是否存在，如果存在，说明数组中出现重复项
  if (obj[element] !== undefined) {
    // arr.splice(i, 1);  使用splice 进行删除性能很差
    arr[i] = arr[arr.length - 1];
    arr.length--;
    // 解决塌陷
    i--;
    continue;
  }
  obj[element] = element;
}
console.log(arr);

// 4:  基于es6中的去重复

const newArr = [...new Set(arr)];
console.log(newArr);
