const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(bodyParser.json());

routes(app);

mongoose
  .connect(
    "mongodb+srv://mauthanhdat:giahan1607@cluster0.n1ttw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("success");
  })
  .catch(() => {
    console.log("error");
  });

app.listen(port, () => {
  console.log("listening on port", +port);
});
