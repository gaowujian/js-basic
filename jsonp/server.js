const express = require("express");

const app = express();
const port = 8000;
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello world!");
});
app.get("/jsonp", function(req, res) {
  const obj = { name: "tony" };
  var str = `${req.query.callback}(${JSON.stringify(obj)})`;
  res.send(str);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
