const express = require("express");
const cors = require("cors");

const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.use((req, res) => {
  console.log("no routes match");
  res.status(404).json({ message: "Not found" });
});

app.use(async (err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
