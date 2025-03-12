const { Trail, UserTrail } = require("../db/models/Trail");

module.exports = {
  getTrails: async (req, res) => {
    try {
      const { userId } = req.params; // 요청에서 userId 가져오기

      // 모든 산책로 가져오기
      const trails = await Trail.find();
      if (!trails) return res.status(404).json({ message: "Trail not found" });

      // 유저의 방문 기록 가져오기 (해당 userId가 방문한 모든 기록 조회)
      const userTrails = await UserTrail.find({ userId });
      // 각 Trail에 유저 방문 기록을 추가
      const updatedTrails = trails.map((trail) => {
        console.log(trail._id);
        // 현재 산책로에 해당하는 유저의 기록 찾기
        const userTrail = userTrails.find(
          (ut) => ut.trailId === trail._id.toString()
        );

        return {
          ...trail.toObject(), // 기존 산책로 정보 유지
          landmarks: userTrail?.visitedLandmarks, // 유저가 방문한 명소 목록
          image: trail.image, // 산책로 이미지 추가
          address: trail.address, // 산책로 주소 추가
        };
      });

      res.json({
        type: "success",
        data: updatedTrails,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", error });
    }
  },

  getTrail: async (req, res) => {
    try {
      const { userId } = req.params; // 요청에서 userId 가져오기
      const { trailId } = req.body;

      const trail = await Trail.findById(trailId);
      console.log("trail");

      if (!trail) return res.status(404).json({ message: "Trail not found" });

      const userTrail = await UserTrail.findOne({ userId, trailId });
      const updatedTrails = {
        ...trail.toObject(), // 기존 산책로 정보 유지
        landmarks: userTrail?.visitedLandmarks, // 유저가 방문한 명소 목록
        image: trail.image, // 산책로 이미지 추가
        address: trail.address, // 산책로 주소 추가
      };
      res.json({
        type: "success",
        data: updatedTrails,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", error });
    }
  },

  updateVisitedLandmark: async (req, res) => {
    try {
      const { userId } = req.params;
      const { trailId, landmarkId } = req.body;

      const userTrail = await UserTrail.findOne({ userId, trailId });

      const landmarkIndex = userTrail.visitedLandmarks?.findIndex(
        (landmark) => landmark.landmarkId == landmarkId
      );

      if (landmarkIndex !== -1) {
        userTrail.visitedLandmarks[landmarkIndex].visited = true;
        userTrail.visitedLandmarks[landmarkIndex].visitedAt = new Date(); // 방문 시간 기록

        // 업데이트 후 저장
        const updatedUserTrail = await userTrail.save();
        return res.json({ type: "success", data: updatedUserTrail });
      } else {
        return res.status(400).json({ type: "error" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", error });
    }
  },
};
