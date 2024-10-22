const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
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
