const User = require("../models/User");
const bcryptjs = require("bcryptjs");

module.exports = {
  async index(req, res) {
    try {
      const users = await User.find();

      return res.status(200).send(users);
    } catch (error) {
      return res.status(400).send({ error: "Error to show users, try again" });
    }
  },

  async show(req, res) {
    try {
      const user = await User.findById(req.params.id);

      return res.status(302).send(user);
    } catch (error) {
      return res
        .status(400)
        .send({ error: "Error to show an user, try again" });
    }
  },

  async store(req, res) {
    try {
      const { name, email, phone, password, document } = req.body;

      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).send({ error: "User already exists" });
      }

      user = await User.findOne({ phone });

      if (user) {
        return res.status(400).send({ error: "User already exists" });
      }

      const password_hash = await bcryptjs.hash(password, 10);

      const { id } = await User.create({
        name,
        email,
        phone,
        password_hash,
        document,
        phone
      });

      return res
        .status(201)
        .send({ user: { id, name, email, phone, document } });
    } catch (error) {
      return res
        .status(400)
        .send({ error: "Error to create a new user, try again" });
    }
  },

  async delete(req, res) {
    try {
      await User.findByIdAndDelete(req.params.id);

      return res.status(204).send();
    } catch (error) {
      return res
        .status(400)
        .send({ error: "Error to delete an user, try again" });
    }
  },

  async update(req, res) {
    try {
      await User.findByIdAndUpdate({ _id: req.params.id }, req.body);

      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .send({ error: "Error to update an user, try again" });
    }
  }
};
