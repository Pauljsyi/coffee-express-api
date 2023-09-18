const Coffee = require("../models/coffee.model");
const fs = require("fs");
const path = require("path");

module.exports.findAllCoffee = (req, res) => {
  Coffee.find()
    .then((items) => {
      console.log("res in findAllCoffee: ", items);
      res.status(200).json(items);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("AN ERROR OCCURED", err);
    });
};

// module.exports.uploadNewCoffee = (req, res, next) => {
//   console.log("this is coming from product.controller req: ", req.body);
//   const obj = {
//     product_name: req.body.product_name,
//     price: req.body.price,
//     description: req.body.description,
//     image: {
//       data: fs.readFileSync(
//         path.join(__dirname + "/uploads/" + req.body.product_name)
//       ),
//       contentType: "image/jpeg",
//     },
//   };
//   Coffee.create(obj)
//     .then((item) => {
//       res.redirect("/");
//     })
//     .catch((err) => console.log(err));
// };
