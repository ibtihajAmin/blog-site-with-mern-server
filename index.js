const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const app = express();
const port = 4000;

const salt = bcrypt.genSaltSync(10);

app.use(cors());
app.use(express.json());

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
  res.json(userDoc);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//mongodb+srv://ibtihajamin18:Px0ZoswfBXMcPWH6@cluster0.fnc9ngh.mongodb.net/?retryWrites=true&w=majority
//mongodb+srv://ibtihajamin18:<password>@cluster0.fnc9ngh.mongodb.net/?retryWrites=true&w=majority
//Px0ZoswfBXMcPWH6  (Password-DB)
