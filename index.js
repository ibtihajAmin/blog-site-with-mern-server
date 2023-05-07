const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://ibtihajamin18:Px0ZoswfBXMcPWH6@cluster0.fnc9ngh.mongodb.net/?retryWrites=true&w=majority"
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const userdoc = await User.create({ username, password });
  res.json(userdoc);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//mongodb+srv://ibtihajamin18:Px0ZoswfBXMcPWH6@cluster0.fnc9ngh.mongodb.net/?retryWrites=true&w=majority
//mongodb+srv://ibtihajamin18:<password>@cluster0.fnc9ngh.mongodb.net/?retryWrites=true&w=majority
//Px0ZoswfBXMcPWH6  (Password-DB)
