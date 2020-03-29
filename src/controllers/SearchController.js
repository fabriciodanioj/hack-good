const User = require("../models/User");

module.exports = {
  async index(req, res) {
    const { latitude, longitude } = req.query;
    const users = await User.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    });

    return res.json({ users });
  }
};
