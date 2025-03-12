const {
  createLog,
  getLogs,
  updateLog,
  deleteLog,
} = require("../db/controllers/LogController");

const Log = require("../db/models/Log")

module.exports = {
  createLog: async (req, res) => {
    try {
      req.body.date = new Date().toISOString();
      const log = await createLog(req, res);
      res.status(200).send({
        type: "success",
        message: "Log created",
        data: log,
      });
    } catch (error) {
      res.status(500).send({ type: "error", message: "Log creation failed" });
    }
  },
  getLog: async (req, res) => {
    try {
      const {userId} = req.params; 
      const logs = await Log.find({userId});
      res.status(200).send({
        type: "success",
        message: "Log found",
        data: logs,
      });
    } catch (error) {
      res.status(500).send({ type: "error", message: "fetching log failed" });
    }
  },
};
