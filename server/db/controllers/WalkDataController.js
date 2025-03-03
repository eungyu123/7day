const WalkData = require("../models/WalkData");


module.exports = {
  createWalkData: async (req, res) => {
    const walkData = new WalkData(req.body);
    await walkData.save();
    return walkData;
  },
  getTodayWalkData: async (req, res) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayWalkData = await WalkData.findOne({
        userId: req.params.id,
        date: { $gte: today },
      });
      if (!todayWalkData) {
        return res.status(400).json({ error: "Walk data not found" });
      }
      return todayWalkData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ error: "Failed to fetch data" });
    }
  },
  getWeekWalkData: async (req, res) => {
    try {
      const today = new Date();
      const firstDayOfWeek = new Date(today);
      firstDayOfWeek.setDate(today.getDate() - today.getDay()); // 이번 주 첫째 날 (일요일)
      firstDayOfWeek.setHours(0, 0, 0, 0);
      const lastDayOfWeek = new Date(now);
      lastDayOfWeek.setDate(now.getDate() + (6 - now.getDay())); // 이번 주 마지막 날 (토요일)
      lastDayOfWeek.setHours(23, 59, 59, 999);
      const weekWalkData = await WalkData.find({
        userId: req.params.id,
        date: { $gte: weekAgo, $lte: lastDayOfWeek },
      });
      if (!weekWalkData) {
        return res.status(400).json({ error: "Walk data not found" });
      }
      return weekWalkData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ error: "Failed to fetch data" });
    }
  },
  getMonthWalkData: async (req, res) => {
    try {
      const today = new Date();
      const firstDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );
      const lastDayOfMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59
      ); // 이번 달 마지막 날

      const monthWalkData = await WalkData.find({
        userId: req.params.id,
        date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
      });
      if (!monthWalkData) {
        return res.status(400).json({ error: "Walk data not found" });
      }
      return monthWalkData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ error: "Failed to fetch data" });
    }
  },
};