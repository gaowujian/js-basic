window.onload = function () {
  // const xhr = new XMLHttpRequest();
  // xhr.open("GET", "https://jsonplaceholder.typicode.com/todos/1");
  // // xhr.onload = function (...args) {
  // //   console.log(args);
  // // };
  // // xhr.responseType = "application/json";
  // xhr.onreadystatechange = function (e) {
  //   if (e.target.readyState === 4) {
  //     const target = e.target;
  //     console.log("target.response:", target.response);
  //     console.log("target.responseText:", target.responseText);
  //     console.log("target.responseType:", target.responseType);
  //     console.log("target.responseURL:", target.responseURL);
  //     console.log("target.responseXML:", target.responseXML);
  //   }
  // };
  // xhr.send();
  const section = document.querySelector("section");
  function offsetTL(obj) {
    //获取到body的offsetTop和offsetLeft
    var t = 0,
      l = 0;
    while (obj) {
      t = t + obj.offsetTop;
      l = l + obj.offsetLeft;
      obj = obj.offsetParent;
    }
    return { top: t, left: l };
  }
  console.log(offsetTL(section));

  console.log(section.getBoundingClientRect());
  const div = document.querySelector(".content");
  const clientWidth = `clientWidth:${div.clientWidth}\r\n`;
  const clientHeight = `clientHeight:${div.clientHeight}\r\n`;
  const clientTop = `clientTop:${div.clientTop}\r\n`;
  const clientLeft = `clientLeft:${div.clientLeft}\r\n`;

  const offsetWidth = `offsetWidth:${div.offsetWidth}\r\n`;
  const offsetHeight = `offsetHeight:${div.offsetHeight}\r\n`;
  const scrollWidth = `scrollWidth:${div.scrollWidth}\r\n`;
  const scrollHeight = `scrollHeight:${div.scrollHeight}\r\n`;
  const parentElement = `scrollHeight:${div.offsetParent}\r\n`;

  console.log("div.offsetParent", div.offsetParent); // div是绝对定位 body
  //如果取消绝对定位 20 + 10 + 20 + 30 + 40 = 120px
  //如果有绝对定位 100 + 40 margin = 140px
  console.log("div.offsetTop", div.offsetTop);

  console.log("div.offsetLeft", div.offsetLeft);

  console.log("div.clientWidth", div.clientWidth);
  console.log("div.clientHeight", div.clientHeight);
  console.log("div.scrollWidth", div.scrollWidth);
  console.log("div.scrollHeight", div.scrollHeight);
  console.log("div.offsetWidth", div.offsetWidth);
  console.log("div.offsetHeight", div.offsetHeight);

  console.log("width差", div.offsetWidth - div.clientWidth);

  console.log(div.getBoundingClientRect());
  div.innerHTML +=
    clientWidth +
    clientHeight +
    clientTop +
    clientLeft +
    offsetWidth +
    offsetHeight +
    scrollWidth +
    scrollHeight +
    parentElement;

  function offset(curEle) {
    let totalLeft = 0;
    let totalTop = 0;
    par = curEle.offsetParent;
    // 首先把自己本身的进行累加：
    totalLeft += curEle.offsetLeft;
    totalTop += curEle.offsetTop;

    // 只要没有找到body，我们就把父级参照物的边框和偏移进行累加
    while (par) {
      if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
        //不是标准ie8浏览器才累加边框
        // 累加父级参照物的边框
        totalLeft += par.clientLeft;
        totalTop += par.clientTop;
      }
      // 累加父级参照物的偏移
      totalLeft += par.offsetLeft;
      totalTop += par.offsetTop;

      par = par.offsetParent;
    }
    return { left: totalLeft, top: totalTop };
  }
  //   console.log("距离body", offset(div));
  //   console.log("距离body left", offset(div).left);
  //   console.log("福利父级参照物left", div.offsetLeft);
};

// 我们以border为边界，border的内侧称为内边框，border的外层称为外边框

// box-sizing: content-box 表示 width只用来定义content box区域的宽度

// clientWidth表示内边框的距离, 在mac下，即使内容溢出，scrollbar也在clientWidth返回内
// clientWidth = width + padding-left + padding-right
// clientHeight = height + padding-top + padding-bottom
// clientTop = border-top
// clientLeft = border-left

// offsetWidth表示外边框的距离, 如果有滚动的时候, 需要包含scroll bar
// offsetWidth = clientWidth + border-left + border-right
// offsetHeight = clientHeight + border-top + border-bottom

// 如果设置了box-sizing:border-box 那么
// oldWidth = newWidth - padding-left - padding-right - border-left - border-right
// oldHeight = newHeight - padding-top - padding-bottom - border-top - border-bottom

// clientWidth = width - border-left - border-right
// clientHeight = height - border-top - border-bottom
// offsetWidth = width
// offsetHeight = height

// 真实项目中，如果想要得到盒子的宽度和高度一般都用offsetWidth和offsetHeight，
// 这样就包含了盒子的边框;

// offsetTop&& offsetLeft当前元素外边框距离父级参照物的内边框的偏移量
// 假设最简单的情况, 父级参照物就是父元素， 一般来说父级参照物和父元素不是必须关系，默认所有的元素父级参照物都是body
// 想要改变父级参照物需要通过position定位来进行改变:absolute,relative,fixed中任意一个值都可以把父级参照物进行修改
// offsetTop = 父元素padding-top + 子元素 margin-top
// offsetLeft = 父元素padding-left + 子元素 margin-left
// 一个元素距离父级参照物的的左偏移 等于 自己的margin-left 加上父元素的 padding-left

// 在计算一个元素距离body的左偏移的时候，要不停的去递归累计和父元素的左偏移 + 父元素的border-left/client-left
// 如果在一个元素和body之间没有插入父级参照物，那么直接 element.offsetLeft就是偏移量

// 在内容没有溢出的时候, scrollWidth = clientWidth
// 在内容溢出之后, scrollWidth/scrollHeight表示内容的真实宽度/长度
