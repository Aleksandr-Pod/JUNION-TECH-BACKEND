const mongoose = require("mongoose");
const server = require('./app')
require("dotenv").config();
const { DB_HOST, PORT = 3030 } = process.env;

interface ErrorInt {
  message: string;
  status: number;
}
mongoose.connect(DB_HOST)
  .then(() => server.listen(PORT, () => {
    console.log("Database connection successful, port:", PORT);
  }))
  .catch((error: ErrorInt) => {
    console.log(error.message);
    process.exit(1);
  })