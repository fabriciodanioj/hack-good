const { Router } = require("express");

const UserController = require("./controllers/UserController");
const ActionController = require("./controllers/ActionController");
const SessionController = require("./controllers/SessionController");

const AuthMiddleware = require("./middlewares/authMiddleware");

const SearchController = require("./controllers/SearchController");

const routes = Router();

routes.post("/session", SessionController.store);

routes.post("/user", UserController.store);
routes.get("/user", UserController.index);
routes.get("/user/:id", UserController.show);
routes.delete("/user/:id", UserController.delete);
routes.put("/user/:id", UserController.update);

routes.post("/action", AuthMiddleware, ActionController.store);
routes.get("/action/:id", AuthMiddleware, ActionController.show);
routes.delete("/action/:id", AuthMiddleware, ActionController.delete);
routes.put("/action/:id", AuthMiddleware, ActionController.update);

routes.get("/search", AuthMiddleware, SearchController.index);

module.exports = routes;
