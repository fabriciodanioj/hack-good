const Action = require("../models/Action");

module.exports = {
  async show(req, res) {
    try {
      const action = await Action.findById(req.params.id);

      return res.status(302).send(action);
    } catch (error) {
      return res
        .status(400)
        .send({ error: "Error to show an action, try again" });
    }
  },

  async store(req, res) {
    try {
      const { title, description, longitude, latitude } = req.body;

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      const action = await Action.create({
        title,
        description,
        owner_id: req.userId,
        location
      });

      return res.status(201).send(action);
    } catch (error) {
      return res
        .status(400)
        .send({ error: "Error to create a new Action, try again" });
    }
  },

  async delete(req, res) {
    try {
      await Action.findByIdAndDelete(req.params.id);

      return res.status(204).send();
    } catch (error) {
      return res
        .status(400)
        .send({ error: "Error to delete an Action, try again" });
    }
  },

  async update(req, res) {
    try {
      await Action.findByIdAndUpdate({ _id: req.params.id }, req.body);

      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .send({ error: "Error to update an Action, try again" });
    }
  }
};
