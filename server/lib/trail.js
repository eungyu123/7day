const models = require("../db/models");
const { Trail, UserTrail, Landmark } = models;
const { handleDatabaseError, handleServerError } = require("../utils/utils");

module.exports = {
  getTrails: async (req, res) => {
    try {
      const { userId } = req.params;

      const trails = await Trail.find();
      if (!trails) return handleDatabaseError(req, res);

      const userTrails = await UserTrail.find({ userId }).populate({
        path: "visitedLandmarks.landmarkId",
        select: "name image description address",
      });
      if (!userTrails) return handleDatabaseError(req, res);

      const updatedTrails = trails.map((trail) => {
        const userTrail = userTrails.find((ut) => ut.trailId === trail._id);

        // const visitedLandmarks = userTrail
        //   ? userTrail.visitedLandmarks.map((landmark) => ({
        //       landmarkId: landmark.landmarkId._id,
        //       visited: landmark.visited,
        //       visitedAt: landmark.visitedAt,
        //     }))
        //   : [];

        return {
          ...trail.toObject(), // 기존 산책로 정보 유지
          landmarks: userTrail?.visitedLandmarks, // 유저가 방문한 명소 목록
          // 아래쪽 어차피 이미 있는거 같음
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
      if (!trail) return handleDatabaseError(req, res);

      const userTrail = await UserTrail.findOne({ userId, trailId }).populate({
        path: "visitedLandmarks.landmarkId",
        select: "name image description address location",
      });

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
      return handleServerError(req, res);
    }
  },

  updateVisitedLandmark: async (req, res) => {
    try {
      const { userId } = req.params;
      const { trailId, landmarkId } = req.body;

      const userTrail = await UserTrail.findOne({ userId, trailId });
      if (!userTrail) return handleDatabaseError(req, res);

      const landmarkIndex = userTrail.visitedLandmarks?.findIndex(
        (landmark) => landmark.landmarkId.toString() == landmarkId.toString()
      );

      if (landmarkIndex == -1) {
        return handleDatabaseError(req, res);
      }
      userTrail.visitedLandmarks[landmarkIndex].visited = true;
      userTrail.visitedLandmarks[landmarkIndex].visitedAt = new Date(); // 방문 시간 기록

      // 업데이트 후 저장
      const updatedUserTrail = await userTrail.save();

      return res.json({ type: "success", data: updatedUserTrail });
    } catch (error) {
      return handleServerError(req, res);
    }
  },
};
