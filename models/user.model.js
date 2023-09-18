const mongoose = require("mongoose");
// const Joi = require("joi");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "first name is required"],
    // minLength: [2, "first name must be at least 2 characters long"],
  },
  last_name: {
    type: String,
    required: [true, "last name is required"],
    // minLength: [2, "last name must be at least 2 characters long"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    // validate: {
    //   validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
    //   message: "Please enter a valid email",
    // },
    match: [/.+\@.+\..+/, "please enter a valid email"],
    unique: [true, "not unique"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minLength: [6, "password must be 6 characters"],
  },
  // .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/),
});

UserSchema.virtual("confirmPassword")
  .get(() => this.confirmPassword)
  .set((value) => (this.confirmPassword = value));

UserSchema.pre("validate", function (next) {
  // console.log(
  //   "password: ",
  //   this.password,
  //   "confirmPassword: ",
  //   this.confirmPassword
  // );
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "password must match confirm password");
  }
  next();
});

UserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, 10).then((hash) => {
      this.password = hash;
      next();
    });
  }
});

// // // goes in user models
// UserSchema.pre("save", function (next) {
//   // const user = this;

//   if (this.isModified("password")) {
//     bcrypt
//       .hash(this.password, saltRounds)
//       .then((hash) => (this.password = hash));
//     next();
//   } else {
//     next();
//   }
// });

const User = mongoose.model("User", UserSchema);

module.exports = User;
