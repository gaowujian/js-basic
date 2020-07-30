// 求 1 - 10 的和

// 使用循环

let result = 0;
for (let index = 1; index <= 10; index++) {
  result += index;
}
console.log(result);

// 使用递归

function sum(start, end, result) {
  if (start > end) return result;
  else {
    return sum(start + 1, end, result + start);
  }
}

const result = sum(1, 10, 0);
console.log(result);
