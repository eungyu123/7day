const User = require("../models/User");

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  return user;
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  return users;
};

exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  return user;
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return { message: "User deleted" };
};
