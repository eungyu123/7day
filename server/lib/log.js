const {
  createLog,
  getLog,
  updateLog,
  deleteLog,
} = require("../db/controllers/LogController");

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
      const log = await getLog(req, res);
      res.status(200).send({
        type: "success",
        message: "Log found",
        data: log,
      });
    } catch (error) {
      res.status(500).send({ type: "error", message: "fetching log failed" });
    }
  },
};
