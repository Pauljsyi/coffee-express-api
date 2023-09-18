const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.findAllUsers = (req, res) => {
  User.find()
    .then((allUsers) => res.json({ users: allUsers }))
    .catch((err) => res.json({ message: "something went wrong", error: err }));
};
module.exports.findOneUser = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((user) => res.json({ user: user }))
    .catch((err) => res.json({ message: "something went wrong", error: err }));
};

module.exports.createNewUser = (req, res) => {
  User.create(req.body)
    .then((newlyCreatedUser) => {
      res.json({ user: newlyCreatedUser });
      console.log("this is from createNewUser", newlyCreatedUser);
    })
    .catch((err) => {
      res.status(400).json({ validation_error: err });
    });
};

module.exports.loginUser = (req, res) => {
  // Authenticate User
  console.log(req.body);
  // const user = req.body;
  const userObj = {};
  User.findOne({ email: req.body.email })
    .then(async (user) => {
      // console.log("then is running");
      // userObj.email = req.body.email;
      // console.log("line 35 user:", user.password, req.body.password);
      if (user == null) {
        return res.status(400).send({
          code: "EMAIL_NOT_FOUND",
          message: "Email does not exist, please try another email",
        });
      }

      // authenticate password
      try {
        // console.log(await bcrypt.compare(req.body.password, user.password));
        if (await bcrypt.compare(req.body.password, user.password)) {
          res.send({
            message: "user authenticated",
            userInfo: {
              first_name: user.first_name,
              last_name: user.last_name,
              full_name: user.first_name + " " + user.last_name,
              email: user.email,
            },
          });

          // IMPLEMENT JWT
        } else {
          res.send({
            code: "PASSWORD_ERR",
            message: "Password is incorrect, please try again",
          });
        }
      } catch {
        console.log("wrong password");
        res.send("something went wrong");
        res.status(500).send();
      }
    })
    .catch((err) => console.log("err in catch blockkk", err));
  console.log(userObj);
};

module.exports.updateExistingUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { runValidators: true },
    function (err, user) {
      if (err) {
        // console.log("SOMETHING WENT WRONG FOOL", err);
        res.status(400).json({ validation_error: err });
      }
      return res.json(user);
    }
  );
};

module.exports.deleteAnExistingUser = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then((result) => res.json({ result: result }))
    .catch((err) => res.json({ message: "Something went wrong", error: err }));
};
