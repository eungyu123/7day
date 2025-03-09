const UserMission = require("../models/UserMission");
const Mission = require("../models/Mission");

module.exports = {
  createUserMission: async (req, res) => {
    console.log("createusermission controller 진입");

    const userId = req.params.userId;
    const Missions = await Mission.find();
    const userMissions = await Promise.all(
      Missions.map(async (mission) => {
        const userMission = new UserMission({
          userId: userId,
          missionId: mission._id,
          success: false,
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
    const userMissions = await UserMission.findOneAndUpdate(
      { userId: req.params.userId },
      req.body,
      { new: true, upsert: true }
    );
    return userMissions;
  },
  deleteUserMission: async (req, res) => {
    await UserMission.findOneAndDelete({ userId: req.params.userId });
    return { message: "UserMission deleted" };
  },
};
