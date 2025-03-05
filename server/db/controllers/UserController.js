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
    const user = await User.findById(req.params.id);
    return user;
  },
  updateUser: async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return user;
  },
  deleteUser: async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return { message: "User deleted" };
  },
};