const express = require("express");
const users = require("./userDb");
const posts = require("../posts/postDb");
const userRouter = express.Router();

function validateUserId(req, res, next) {
  console.log("Validating user");
  if (req.params.id) {
    users.getById(req.params.id).then(user => {
      if (user) {
        console.log("User Object", user);
        req.user = user;
        next();
      } else {
        res.status(404).json({ message: "User not found" });
      }
    });
  } else {
    res.status(400).json({ message: "Please provide an ID" });
  }
}

userRouter.post("/", validateUser, (req, res) => {
  const user = req.body;
  users
    .insert(user)
    .then(id => {
      //   user.id = id;
      res.status(201).json(id);
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

userRouter.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  const post = req.body;
  post.user_id = req.user.id;
  posts.insert(post).then(post => {
    res.status(201).json(post);
  });
});

userRouter.get("/", (req, res) => {
  users
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

userRouter.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
  req.params.id;
});

userRouter.get("/:id/posts", (req, res) => {});

userRouter.delete("/:id", (req, res) => {});

userRouter.put("/:id", (req, res) => {});

//custom middleware

function validateUser(req, res, next) {
  const users = req.body;
  if (users.name) {
    next();
  } else {
    res.status(400).json({ message: "Missing a name" });
  }
}

function validatePost(req, res, next) {
  const post = req.body;
  if (post.text) {
    next();
  } else {
    res.status(400).json({ message: "Post is missing text" });
  }
}

module.exports = userRouter;
