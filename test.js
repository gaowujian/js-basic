var refTypes = [function () {}, new Date(), new RegExp()];

refTypes.forEach((item) => {
  console.log('');
  console.log('item:', item);
  var prototype = Object.getPrototypeOf(item);
  console.log('prototype:', Object.prototype.toString.call(item));

  var tmp1 = prototype.valueOf;

  prototype.valueOf = function () {
    console.log('新增valueOf');
    return tmp1();
  };
  var tmp2 = prototype.toString;

  prototype.toString = function () {
    console.log('新增toString');
    return tmp2();
  };

  try {
    console.log(item + ''); //强转字符串
    console.log(+item); //强转数字
  } catch (error) {
    console.log('error:', error);
  }

  console.log('');
});
