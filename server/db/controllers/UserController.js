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
    const user = await User.findById(req.params.userId);
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
};
