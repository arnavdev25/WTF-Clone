const express = require("express");
const http = require("http");
const { connection } = require("./config/db");
const userRouter=require("./routes/user.route")
require("dotenv").config();
const cors = require("cors");
const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());
app.use("/",userRouter)
app.get("/", (req, res) => {
  res.send("Welcome");
});
server.listen(process.env.PORT, async () => {
  await connection;
  console.log(`Server started on ${process.env.PORT}`);
});