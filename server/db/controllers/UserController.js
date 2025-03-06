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
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(400).json({
        type: "error",
        message: "user searching failed",
      });
    }
    return user;
  },
  updateUser: async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(400).json({
        type: "error",
        message: "user searching failed",
      });
    }
    return user;
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
};
