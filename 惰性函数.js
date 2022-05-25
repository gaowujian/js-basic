// js中的惰性思想，重复的事情只需要做一次
// 例如给dom添加事件的例子

function emit(el, type, fn) {
  if (el.addEventListener) {
    el.addEventListener(type, fn);
  } else if (el.attach) {
    el.attach("on" + type, fn);
  } else {
    el["on" + type] = fn;
  }
}

// 当利用了惰性思想之后，我们可以利用

function emit(el, type, fn) {
  if (el.addEventListener) {
    emit = (el, type, fn) => {
      el.addEventListener(type, fn);
    };
  } else if (el.attach) {
    emit = (el, type, fn) => {
      el.attach("on" + type, fn);
    };
  } else {
    emit = (el, type, fn) => {
      el["on" + type] = fn;
    };
  }
  return emit(el, type, fn);
}

emit("div", click, () => {
  console.log("点击事件");
});
