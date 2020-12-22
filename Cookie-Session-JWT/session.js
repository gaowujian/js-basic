const http = require("http");
const querystring = require("querystring");
const crypto = require("crypto");
const uuid = require("uuid");
const key = "zf";

function signed(value) {
  return crypto
    .createHmac("sha256", key)
    .update(value.toString())
    .digest("base64");
}
const session = {};
const CardName = "connect.sid"; // 卡的名字

const server = http.createServer((req, res) => {
  console.dir(session);
  req.getCookie = function (key, options = {}) {
    let cookieObj = querystring.parse(req.headers["cookie"], "; ");

    // 如果签名了，那么使用签名算法，对比.前后的值，验证签名正确性
    // 如果没有签名，直接按.切割，并返回第一个元素
    if (options.signed) {
      let [value, sign] = cookieObj[key].split(".");
      if (signed(value) == sign) {
        // jwt 也是这个原理
        console.log("签名验证成功");
        return value;
      } else {
        console.log("签名验证失败");
        return "";
      }
    } else {
      if (cookieObj[key]) {
        return cookieObj[key].split(".")[0];
      } else {
        return "";
      }
    }
  };

  let cookies = [];
  res.setCookie = function (key, value, options = {}) {
    let optArgs = [];

    if (options.maxAge) {
      optArgs.push(`max-age=${options.maxAge}`);
    }
    if (options.path) {
      optArgs.push(`path=${options.path}`);
    }
    if (options.httpOnly) {
      optArgs.push(`httpOnly=${options.httpOnly}`);
    }
    // console.log("options.signed:", options.signed);
    if (options.signed) {
      value = value + "." + signed(value);
    }
    let cookieValue = `${key}=${value}`;
    // cookie的分隔符是; name=zf; max-age=10; expires= ;
    cookies.push(`${cookieValue}; ${optArgs.join("; ")}`);
    res.setHeader("Set-Cookie", cookies);
  };
  // 第一次访问我 ， 办一张卡  卡里存着你的钱
  // 把卡发给你，你下次来别忘记带卡

  // 之后你就带着卡来了 ， 我就可以扣钱 （不需要重新发卡）
  if (req.url === "/cut") {
    let cardId = req.getCookie(CardName);
    console.log(cardId);
    if (cardId && session[cardId]) {
      // 服务器一旦重启 session就被清空了
      session[cardId].mny -= 20;
      res.end(session[cardId].mny + ` money`);
    } else {
      // 第一次来  uuid
      let cardId = uuid.v4(); // MathRandom + date
      session[cardId] = { mny: 100 };
      res.setCookie(CardName, cardId, { httpOnly: true });
      res.end(`100 money`);
    }
  } else {
    res.end();
  }
});
server.listen(3000, function () {
  console.log("server is running on 3000");
});
