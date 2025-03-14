const { Trail, UserTrail } = require("../db/models/Trail");
const User = require("../db/models/User")

module.exports = {
  getTrails: async (req, res) => {
    try {
      const { userId } = req.params; // 요청에서 userId 가져오기

      // 모든 산책로 가져오기
      const trails = await Trail.find();
      if (!trails || trails.length === 0) return res.status(404).json({ message: "Trail not found" });

      // 유저의 방문 기록 가져오기 (해당 userId가 방문한 모든 기록 조회)
      let userTrails = await UserTrail.find({ userId });
      if(!userTrails || userTrails.length === 0) {
        const userTrailPromises = trails.map(async (trail) => {
          const newUserTrail = new UserTrail({
            userId,
            trailId: trail._id.toString(),
            getReward: false, 
            visitedLandmarks: trail.landmarks.map((landmark) => ({
              landmarkId: landmark._id,
              name: landmark.name,
              image: landmark.image,
              description: landmark.description,
              location: landmark.location,
              visited: false,
            })),
          });
      
          return newUserTrail.save();
        });
        await Promise.all(userTrailPromises);
        userTrails = await UserTrail.find({ userId });
      }


      const updatedTrails = trails.map((trail) => {
        const userTrail = userTrails.find(
          (ut) => ut.trailId.toString() === trail._id.toString()
        );
        
        return {
          ...trail.toObject(), // 기존 산책로 정보 유지
          getReward: userTrail.getReward, 
          landmarks: userTrail?.visitedLandmarks , // 유저가 방문한 명소 목록
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

      if (!trail) return res.status(404).json({ message: "Trail not found" });

      const userTrail = await UserTrail.findOne({ userId, trailId });
      // console.log(userTrail)

      const updatedTrails = {
        ...trail.toObject(), // 기존 산책로 정보 유지
        
        landmarks: userTrail?.visitedLandmarks, // 유저가 방문한 명소 목록
        getReward: userTrail.getReward,
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

  getRewardByTrail: async (req,res) => {
    try {
      const { userId } = req.params; 
      const { trailId } = req.body; 
      console.log(userId, trailId); 
      const user = await User.findById(userId); 
      const userTrail = await UserTrail.findOne({ userId, trailId }); 
      console.log("userTrail", userTrail); 

      if (userTrail.getReward) {
        return res.status(400).json({ type: "error", message: "이미 보상을 받았습니다." });
      }

      const allVisited  = userTrail.visitedLandmarks.every((landmark) => landmark.visited === true);
      console.log(allVisited )
      if (allVisited ) {
        const randomPoint = Math.floor(Math.random() * 100) + 1
        user.userPoint = (user.userPoint || 0) + randomPoint;
        const savedUser = await user.save(); 
        userTrail.getReward = true;
        await userTrail.save();
        
        return res.status(200).json({type: "success", user:savedUser, reward: randomPoint}); 
      } else {
        return res.status(400).json({type: "error", message: "아직 스탬프를 찍지 않은 랜드마크가 있습니다."})
      }

    } catch (error) {
      return res.status(500).json({type: "error"}); 
    }
  }
};
