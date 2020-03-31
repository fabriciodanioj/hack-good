const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const authConfig = require("../config/auth");

const AuthMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({
      error: "The token is required"
    });
  }

  const [, token] = authorization.split(" ");

  const decoded = await promisify(jwt.verify)(token, authConfig.secret);
  req.userId = decoded.id;
  return next();
};

module.exports = AuthMiddleware;
