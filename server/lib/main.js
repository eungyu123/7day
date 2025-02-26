const User = require("../db/models/User"); // require로 가져오기

module.exports = {
  test: async (req, res) => {
    console.log("test");
    return res.status(200).json({
      type: "success",
    });
  },
};
