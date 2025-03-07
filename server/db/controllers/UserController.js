const User = require("../models/User");

module.exports = {
  createUser: async (req, res) => {
    const user = new User(req.body);
    await user.save();
    return user;
  },
  getUsers: async (req, res) => {
    const users = await User.find();
    return users;
  },
  getUser: async (req, res) => {
    console.log("getuser controller 진입");
    const user = await User.findById(req.params.userId);
    console.log(user);
    console.log("getusercontroller 내 user");
    return user;
  },
  updateUser: async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
    });
    return user;
  },
  deleteUser: async (req, res) => {
    await User.findByIdAndDelete(req.params.userId);
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
