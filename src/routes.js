const { Router } = require("express");

const UserController = require("./controllers/UserController");
const SearchController = require("./controllers/SearchController");

const routes = Router();

routes.post("/user", UserController.store);
routes.get("/user", UserController.index);
routes.get("/user/:id", UserController.show);
routes.delete("/user/:id", UserController.delete);
routes.put("/user/:id", UserController.update);

routes.get("/search", SearchController.index);

module.exports = routes;
