const UserMission = require("../models/UserMission");
const Mission = require("../models/Mission");

module.exports = {
  createUserMission: async (req, res) => {
    console.log("createusermission controller 진입");

    const userId = req.params.userId;
    //미션 찾기
    const Missions = await Mission.find();
    //에러 처리
    if (!Missions) {
      return res.status(400).json({
        type: "error",
        message: "Mission searching failed",
      });
    }
    //미션들과 유저 결합하기
    const userMissions = await Promise.all(
      Missions.map(async (mission, index) => {
        const success = index === 1 || index === 2;

        const userMission = new UserMission({
          userId: userId,
          missionId: mission._id,
          success: success,
          completedAt: null,
          // rewardId: mission.rewardId,
        });
        return await userMission.save();
      })
    );

    return userMissions;
  },
  getUserMission: async (req, res) => {
    console.log("getusermission controller 진입");
    const userId = req.params.userId;
    console.log(userId);
    // const userMissions = await UserMission.find({ userId });
    // return userMissions;
    try {
      // 해당 사용자의 미션 데이터 가져오기
      const userMissions = await UserMission.find({ userId: userId.toString() })
        .populate({
          path: "missionId", // missionId 필드를 populate
          select: "missionContent rewardId", // missionId에서 missionContent와 rewardId 가져오기
          populate: {
            path: "rewardId", // missionId 안의 rewardId 필드를 populate
            select: "content", // rewardId의 content만 가져오기
          },
        })
        .exec();

      console.log(userMissions);

      // 미션 데이터를 반환
      return res.json(userMissions);
    } catch (error) {
      console.error("미션을 가져오는 데 실패:", error);
      return res
        .status(500)
        .json({ error: "미션을 가져오는 데 실패했습니다." });
    }
  },
  updateUserMission: async (req, res) => {
    console.log("update controller");

    const { missionId, success, completedAt } = req.body;

    if (!missionId) {
      return res.status(400).json({
        type: "error",
        message: "Mission ID is required to update",
      });
    }

    const userMissions = await UserMission.findOneAndUpdate(
      { userId: req.params.userId },
      { missionId, success, completedAt },
      { new: true }
    );
    return userMissions;
  },
  deleteUserMission: async (req, res) => {
    const result = await UserMission.findOneAndDelete({
      userId: req.params.userId,
    });
    if (!result) {
      return res.status(400).json({
        type: "error",
        message: "Mission searching failed",
      });
    }
    return { message: "UserMission deleted" };
  },
};
