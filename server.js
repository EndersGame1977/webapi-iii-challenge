const express = require("express");
const server = express();
const users = require("./users/userDb");
const userRouter = require("./users/userRouter");

//custom middleware
server.use(express.json());
server.use(logger);
server.use("/user", userRouter);

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
