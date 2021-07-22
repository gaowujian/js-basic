const express = require("express");
const cors = require("cors");
const cookieParse = require("cookie-parser");
const app = express();

app.use(cors());
app.use(cookieParse());
app.get("/", (req, res) => {
  console.log("req.cookies:", req.cookies);
  res.cookie("author", "tony", { maxAge: 900000 });
  res.send("hello world");
});

app.listen("3000", () => {
  console.log("server is running on 3000 !");
});
