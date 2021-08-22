const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");
const app = express();
const db = config.get("mongoURI"); // My mongoURI specified in /config/default.json
const toDoRouter = require("./routers/toDoRoute");
const cors = require("cors");

app.use(express.static(path.join(__dirname, "build")));
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build/index.html"));
});
app.use(cors());
const port = process.env.PORT || 8080;
app.listen(port, () =>
  console.log(`Server started on port: http://localhost:${port}`)
);
app.use(express.json());
app.use(express.urlencoded());
app.use("/api", toDoRouter);
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));
