//  eg 761 => 14 > 5
//  eg 7261 => 16 > 7
function getSum(arr) {
  let result = 0;
  arr.forEach((element) => {
    result += Number(element);
  });
  return result;
}
function fn(arg) {
  if (arg < 10) {
    return arg;
  }
  const arr = arg.toString().split("");
  const sum = getSum(arr);
  const result = fn(sum);
  if (result < 10) {
    return result;
  } else {
    fn(result);
  }
}

const result = fn(493193);
console.log(result);
