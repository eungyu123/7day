const models = require("../models/index");
const { Log } = models;

module.exports = {
  createLog: async (req, res) => {
    const log = new Log(req.body);
    if (!log) {
      return res.status(400).json({
        type: "error",
        message: "Log searching failed",
      });
    }
    await log.save();
    return log;
  },
  getLogs: async (req, res) => {
    const logs = await Log.find();
    if (!logs) {
      return res.status(400).json({
        type: "error",
        message: "Log searching failed",
      });
    }
    return logs;
  },
  updateLog: async (req, res) => {
    const log = await Log.findOneAndUpdate(
      { _id: req.params.userId },
      req.body,
      {
        new: true,
      }
    );
    if (!log) {
      return res.status(400).json({
        type: "error",
        message: "Log searching failed",
      });
    }
    return log;
  },
  deleteLog: async (req, res) => {
    const result = await Log.findOneAndDelete({ _id: req.params.userId });
    if (!result) {
      return res.status(400).json({
        type: "error",
        message: "Log searching failed",
      });
    }
    return { message: "Log deleted" };
  },
};
