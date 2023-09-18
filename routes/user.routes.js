const UserController = require("../controllers/user.controller");

module.exports = (app) => {
  app.get("/api/users/", UserController.findAllUsers);
  app.get("/api/users/:id", UserController.findOneUser);
  app.post("/api/users/login", UserController.loginUser);
  app.post("/api/users/register", UserController.createNewUser);

  app.put("/api/users/update/:id", UserController.updateExistingUser);
  app.delete("/api/users/delete/:id", UserController.deleteAnExistingUser);
};
