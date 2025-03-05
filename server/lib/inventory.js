const { updateUser } = require("../db/controllers/UserController"); // require로 가져오기

module.exports = {
  updateUser: async (req, res) => {
    try {
      const user = await updateUser(req, res);
      res.status(200).json({
        type: "success",
        message: "Inventory updated",
        data: {
          characterList: user.characterList,
          petList: user.petList,
        },
      });
    } catch (error) {
      res.status(500).json({
        type: "error",
        message: "Inventory update failed",
      });
    }
  },
};
