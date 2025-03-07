const { Trail, UserTrail } = require("../db/models/Trail");

module.exports = {
  getTrails: async (req, res) => {
    try {
      const trails = await Trail.find();
      if (!trails) return res.status(404).json({ message: "Trail not found" });

      res.json({ type: "success", data: trails });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", error });
    }
  },

  getUserTrail: async (req, res) => {
    try {
      const { userId } = req.params; // URL에서 userId 가져오기
      const userTrail = await UserTrail.findOne({ userId });
      if (!userTrail)
        return res.status(404).json({ message: "User trail not found" });

      res.json({ type: "success", data: userTrail });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", error });
    }
  },

  updateUserTrail: async (req, res) => {
    try {
      const { userId } = req.params;
      const { landmarkId } = req.body; // 요청 바디에서 가져오기
      const userTrail = await UserTrail.findOne({ userId });

      if (!userTrail)
        return res.status(404).json({ message: "User trail not found" });
      console.log(userTrail);
      // 방문한 명소 업데이트
      const updatedLandmarks = userTrail.visitedLandmarks.map((landmark) => {
        console.log(landmark.landmarkId.toString() === landmarkId.toString());
        return landmark.landmarkId.toString() === landmarkId.toString() // .toString()을 추가해서 비교
          ? { ...landmark, visited: true }
          : landmark;
      });

      console.log(updatedLandmarks);
      userTrail.visitedLandmarks = updatedLandmarks;
      await userTrail.save();

      res.json({
        type: "success",
        message: "User trail updated",
        data: userTrail,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },
};
