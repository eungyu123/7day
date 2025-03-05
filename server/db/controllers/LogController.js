const Log = require("../models/Log");

module.exports = {
  createLog: async (req, res) => {
    const log = new Log(req.body);
    await log.save();
    return log;
  },
  getLogs: async (req, res) => {
    const logs = await Log.find();
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
    return log;
  },
  deleteLog: async (req, res) => {
    await Log.findOneAndDelete({ _id: req.params.userId });
    return { message: "Log deleted" };
  },
};
