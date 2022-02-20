require("dotenv").config();
const express = require("express");
const ConnectDB = require("./config/ConnectDB");
const User = require("./models/User");

const app = express();

app.use(express.json());

ConnectDB();

//RETURN ALL USERS

app.get("/users/", (req, res) => {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(400).json(err));
});

//ADD A NEW USER TO THE DATABASE

app.post("/", (req, res) => {
  const newUser = new User({ ...req.body });
  newUser
    .save()
    .then((user) =>
      res.status(200).json({ msg: "user added succefully", user })
    )
    .catch((err) => res.status(400).json({ msg: "Failed to add user", err }));
});

//PUT : EDIT A USER BY ID

app.put("/user/:_id", (req, res) => {
  const { _id } = req.params;
  User.findByIdAndUpdate({ _id }, { $set: { ...req.body } })
    .then(() => res.status(200).json({ msg: "User updated succefullt" }))
    .catch((err) =>
      res.status(400).json({ msg: "Failed to update user", err })
    );
});

//DELETE : REMOVE A USER BY ID

app.delete("/user/:_id", (req, res) => {
  const { _id } = req.params;
  User.findByIdAndDelete({ _id })
    .then(() => res.status(200).json({ msg: "User deleted succefullt" }))
    .catch((err) =>
      res.status(400).json({ msg: "Failed to delete user", err })
    );
});

const port = process.env.PORT || process.env.port;
app.listen(port, (err) => {
  err
    ? console.log("Failed to connect the server: ", err)
    : console.log(`http://localhost:${port}`);
});
