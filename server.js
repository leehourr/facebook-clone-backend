const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());

const currentDate = new Date();
const pickedDate = new Date(2009, 2 - 1, 11);
const startDate = new Date(1970, 0, 1);
const underage = new Date(1984, 0, 1);

let age = currentDate - pickedDate;

console.log(age);
console.log(underage - startDate);

console.log(age > underage ? true : false);

let allow = ["http://localhost:3000", "future deployed frontend"];
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
app.use(cors());

// console.log(readdirSync("./routes"));

//routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

//database
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABASE_ENDPOINT, { useNewUrlParser: true })
  .then(() => console.log("succesfully connected to database"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("server is runninng on port" + port);
});
