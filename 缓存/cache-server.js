const fs = require("fs");
const path = require("path");
const http = require("http");
const { URL } = require("url");
const mime = require("mime");
const crypto = require("crypto");

const server = http.createServer(function (req, res) {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);
  // console.log(pathname);
  const requestUrl = path.join(__dirname, pathname);
  fs.stat(requestUrl, (err, stateObj) => {
    if (err) {
      res.statusCode = 404;
      return res.end();
    }
    if (stateObj.isFile()) {
      console.log(mime.getType(req.url));
      res.setHeader("Content-Type", `${mime.getType(req.url)};charset:utf-8`);
      // 使用强制缓存
      res.setHeader("Cache-Control", "max-age=10");
      res.setHeader("Expires", new Date(Date.now() + 10 * 1000).toUTCString());
      //  使用协商缓存
      const ctime = stateObj.ctime.toUTCString();
      const r = crypto
        .createHash("md5")
        .update(fs.readFileSync(requestUrl))
        .digest("base64");
      res.setHeader("Last-Modified", ctime);
      res.setHeader("Etag", r);
      // 每次都会和最新的ctime进行比较
      if (
        (req.headers["if-modified-since"] === ctime) |
        (req.headers["if-none-match"] === r)
      ) {
        res.statusCode = 304;
        res.end();
      } else {
        // 在第一次访问资源的时候会走这里

        fs.createReadStream(requestUrl).pipe(res);
      }
    } else {
      // 如果是目录的话也直接返回404错误
      res.statusCode = 404;
      res.end();
    }
  });
});

server.listen(3000, () => {
  console.log("server is running on 3000");
});
