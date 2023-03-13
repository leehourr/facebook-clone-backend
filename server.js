const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

let allow = [
  "http://localhost:3000",
  "https://facebook-clone-side-project.web.app",
];
function options(req, res) {
  let temp;
  let origin = req.header("Origin");
  if (allow.indexOf(origin) > -1) {
    temp = { origin: true, optionSuccessStatus: 200 };
    return res(null, temp);
  }
  temp = {
    origin: "nope",
  };
  return res(null, temp);
}
// options();
app.use(cors(options));

// console.log(readdirSync("./routes"));

//routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

//database
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABASE_ENDPOINT, {
    useNewUrlParser: true,
  })
  .then(() => console.log("succesfully connected to database"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("server is runninng on port" + port);
});
