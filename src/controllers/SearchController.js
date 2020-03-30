const Action = require("../models/Action");

module.exports = {
  async index(req, res) {
    const { latitude, longitude } = req.query;
    const actions = await Action.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 5000
        }
      }
    });

    return res.json({ actions });
  }
};
