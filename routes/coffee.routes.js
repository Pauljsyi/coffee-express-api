const CoffeeController = require("../controllers/coffee.controller");

module.exports = (app) => {
  app.get("/coffee", CoffeeController.findAllCoffee);
  // app.post("/api/coffee/upload", CoffeeController.uploadNewcoffee);
};
