const User = require("../models/User");

module.exports = {
  createUser: async (req, res) => {
    const user = new User(req.body);
    await user.save();
    return user;
  },
  getUsers: async (req, res) => {
    const users = await User.find();
    if (!users) {
      return res.status(400).json({
        type: "error",
        message: "user searching failed",
      });
    }
    return users;
  },
  getUser: async (req, res) => {
    console.log("get user controller 진입");
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(400).json({
        type: "error",
        message: "user searching failed",
      });
    }

    return user;
  },
  updateUser: async (userId, { newCharacter, newPet }) => {
    try {
      const user = await User.findById(userId);
      if (!user) throw new Error("User not found");

      if (newCharacter) user.characterList.push(newCharacter);
      if (newPet) user.petList.push(newPet);

      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  },
  deleteUser: async (req, res) => {
    const result = await User.findByIdAndDelete(req.params.userId);
    if (!result) {
      return res.status(400).json({
        type: "error",
        message: "Mission searching failed",
      });
    }
    return { message: "User deleted" };
  },

  updateFriends: async (req, res) => {
    const { friendid } = req.body;
    const friend = await User.findByIdAndUpdate(
      req.params.userId,
      { $push: { friendList: { friend_id: friendid } } }, // friendList 배열에 친구id 추가
      { new: true } // 업데이트 후 최신 문서를 반환
    );
    console.log("친구추가성공!");

    return friend;
  },
};
