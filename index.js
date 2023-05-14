const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Post = require("./models/Post");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
const port = 4000;

const salt = bcrypt.genSaltSync(10);
const secret = "lowejskvnkgwrjgwqwff4fdfd5y63";

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(
  "mongodb+srv://ibtihajamin18:Px0ZoswfBXMcPWH6@cluster0.fnc9ngh.mongodb.net/?retryWrites=true&w=majority"
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userdoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userdoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.get("/login", (req, res) => {
  res.send("Got it");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username: username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { title, summary, content } = req.body;
  const postDoc = await Post.create({
    title,
    summary,
    content,
    cover: newPath,
  });
  res.json(postDoc);
});

app.get("/post", async (req, res) => {
  res.json(await Post.find());
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//mongodb+srv://ibtihajamin18:Px0ZoswfBXMcPWH6@cluster0.fnc9ngh.mongodb.net/?retryWrites=true&w=majority
//mongodb+srv://ibtihajamin18:<password>@cluster0.fnc9ngh.mongodb.net/?retryWrites=true&w=majority
