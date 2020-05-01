const express = require("express");
const app = express();
const port = 8000;
var path = require("path");
// var session = require("express-session");

// Use the session middleware
// app.use(session({ secret: "keyboard cat", cookie: { maxAge: 6000 } }));

// Access the session as req.session
// app.get("/", function(req, res, next) {
//   if (req.session.views) {
//     req.session.views++;
//     // console.log(Object.getOwnPropertyNames(req.session));
//     // console.log(Object.keys(req.session));
//     console.log(req.session);
//     console.log(req.sessionID);

//     res.setHeader("Content-Type", "text/html");
//     res.write("<p>views: " + req.session.views + "</p>");
//     res.write("<p>expires in: " + req.session.cookie.maxAge / 1000 + "s</p>");
//     res.end();
//   } else {
//     req.session.views = 1;
//     res.end("welcome to the session demo. refresh!");
//   }
// });

app.use(
  express.static(path.join(__dirname, "note-img"), { maxAge: 1000 * 60 * 60 })
);
var cookieParser = require("cookie-parser");
app.use(cookieParser());
app.get("/", function(req, res) {
  // Cookies that have not been signed
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.cookie("name", "tony", {
  //   maxAge: 20000
  //   // httpOnly: true,
  // });

  // Cookies that have been signed
  res.setHeader("Cache-Control", "public,max-age:60000");
  res.end("hello world");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
