const express = require("express");
const cors = require("cors");
const app = express();
let allow = ["http://locgialhost:3000", "future deployed frontend"];

function options(req, res) {
  let temp;
  let origin = req.header("origin");
  if (allow.indexOf(origin) > -1) {
    temp = { origin: true, succesStatus: 200 };
    return res(null, tmp);
  }
  temp = {
    origin: "nope",
  };
  return res(null, tmp);
}
// const options = {
//   origin: "http://locgialhost:3000",
//   sucessStatus: 200,
// };

app.use(cors(options));

app.get("/", (req, res) => {
  res.send("home");
});

app.listen(8000, () => {
  console.log("server is listening...");
});
