const http = require("http");
const { URL } = require("url");
// 封装cookie的get和set方法
const server = http.createServer(function (req, res) {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);

  res.setCookie = function (key, value, options) {
    let optArr = [];

    if (options.maxAge) {
      optArr.push(`max-age:${options.maxAge}`);
    }
    if (options.httpOnly) {
      optArr.push(`httpOnly`);
    }
    if (options.path) {
      optArr.push(`path:${options.path}`);
    }
    console.log(optArr.join("; "));
    res.setHeader("Set-Cookie", `${key}=${value}; ${optArr.join("; ")}`);
  };

  if (pathname === "/read") {
    res.end(req.headers.cookie);
  } else if (pathname === "/write") {
    // res.setHeader("Set-Cookie", "name1=zf2");
    res.setHeader("Content-Type", "text/plain;charset=utf-8");
    res.setHeader("Set-Cookie", "name=zf; Max-Age=10");
    res.setHeader(
      "Set-Cookie",
      `name=zf; expires=${new Date(Date.now() + 10 * 1000).toUTCString()}`
    );
    res.setHeader("Set-Cookie", "name=zf; httpOnly");
    res.setHeader("Set-Cookie", "name=zf; path=/");
    console.log(req.headers.host);
    console.log(pathname);
    // res.setHeader("Set-Cookie", `name=zf; domain=${req.headers.host}`);

    // res.setCookie("www", "erer", { maxAge: 10, httpOnly: true, path: "/33jj" });
    res.end("cookie 写入成功");
  }
});

server.listen(3000, () => {
  console.log("server is listening on 3000!");
});
