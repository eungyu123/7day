const {
  getUser,
  updateUser,
  createUser,
} = require("../db/controllers/UserController");

module.exports = {
  getUser: async (req, res) => {
    try {
      const user = await getUser(req, res);
      res.status(200).json({
        type: "success",
        message: "User found",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        type: "error",
        message: "fetching user failed",
      });
    }
  },
  updateUser: async (req, res) => {
    try {
      const user = await updateUser(req, res);
      res.status(200).json({
        type: "success",
        message: "User updated",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        type: "error",
        message: "fetching update failed",
      });
    }
  },

  getFriends: async (req, res) => {
    try {
      const user = await getUser(req, res);
      const friends = user.friends;
      const friendDataList = await Promise.all(
        friends.map(async (friendId) => {
          const friend = await getUser({ params: { userId: friendId } });
          return {
            friendId: friend._id,
            friendName: friend.name,
            steps: friend.steps,
          };
        })
      );
      res.status(200).json({
        type: "success",
        message: "Friends found",
        data: friendDataList,
      });
    } catch (error) {
      res.status(500).json({
        type: "error",
        message: "fetching friends failed",
      });
    }
  },
};
