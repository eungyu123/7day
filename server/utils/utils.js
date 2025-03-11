const handleDatabaseError = (req, res) => {
  return res.status(400).json({ type: "error" });
};
const handleServerError = (req, res) => {
  return res.status(500).json({ type: "error" });
};

module.exports = { handleDatabaseError, handleServerError };
