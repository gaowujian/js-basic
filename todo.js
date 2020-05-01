// 堆栈 stack
// 中缀表达式： 5 + 6 / 2 - 3 * 4;
// 后缀表达式：
const string = "5 + 6 / 2 - 3 * 4";
const arr = string.split("");
const operationStack = [];
const operatorStack = [];
const operationUnion = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2
};
for (let i = 0; i < arr.length; i++) {
  const element = arr[i];
  if (typeof parseInt(element) == "number") operationStack.push(element);
  else if (Object(operationUnion).hasOwnProperty()) {
  }
}

console.log(Object.getOwnPropertyNames(operationUnion));
