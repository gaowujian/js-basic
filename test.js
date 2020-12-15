// const http = require("http");
// const server = http.createServer();
// server.on("request", (req, res) => {
//   console.log(req.constructor);

//   // 请求行
//   console.log("req.method:", req.method);
//   console.log("req.url:", req.url);
//   console.log("req.httpVersion:", req.httpVersion);
//   // 请求头
//   // console.log("req.headers:", req.headers);
//   // 请求体
//   res.write("hello ");
//   res.end("world");
// });

// const port = 3000;
// server.listen(port, () => {
//   console.log("server is listening on ", port);
// });

// fib(5) = 8
function fib(n) {
  if (n === 1) {
    return 1;
  }
  if (n === 2) {
    return 2;
  }
  return fib(n - 1) + fib(n - 2);
}

function fib(n) {
  let first = 1;
  let second = 2;
  if (n === 1) {
    return first;
  } else if (n === 2) {
    return second;
  } else {
    let result;
    let index = 3;
    while (index <= n) {
      result = first + second;
      index++;
      first = second;
      second = result;
    }
    return result;
  }
}

console.log(fib(10));

// 1 2 3 5 8
