const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("../models/User");
const authConfig = require("../config/auth");

module.exports = {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).send({ error: "User not exists" });
      }

      const { password_hash } = user;

      const match = await bcryptjs.compare(password, password_hash);

      if (match) {
        return res.status(200).send({
          user: {
            email
          },
          token: jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: authConfig.expiresIn
          })
        });
      }

      return res.status(401).send({ error: "Authentication failed" });
    } catch (err) {
      return res.send(err);
    }
  }
};
