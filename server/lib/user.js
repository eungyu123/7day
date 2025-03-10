const User = require("../db/models/User");
const UserEgg = require("../db/models/Egg");
const {
  getUser,
  updateUser,
  createUser,
  updateFriends,
} = require("../db/controllers/UserController");
const { generateRandomGifts } = require("../utils/kakaomap");
const { get } = require("http");

module.exports = {
  getUser: async (req, res) => {
    try {
      const user = await getUser(req, res);
      res.status(200).json({
        type: "success",
        message: "User found",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        type: "error",
        message: "fetching user failed",
      });
    }
  },
  updateUser: async (req, res) => {
    try {
      const user = await updateUser(req, res);
      res.status(200).json({
        type: "success",
        message: "User updated",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        type: "error",
        message: "fetching update failed",
      });
    }
  },

  getFriends: async (req, res) => {
    try {
      const user = await getUser(req, res);

      // friendlist에서 friendid 추출
      const friends = user.friendList.map((f) => f.friend_id);
      const friendDataList = await Promise.all(
        friends.map(async (friendId) => {
          //각각의 friend 정보 찾는 함수
          const friend = await getUser({ params: { userId: friendId } });
          return {
            friendId: friend._id,
            friendName: friend.name,
            steps: friend.steps,
          };
        })
      );
      res.status(200).json({
        type: "success",
        message: "Friends found",
        data: friendDataList,
      });
    } catch (error) {
      res.status(500).json({
        type: "error",
        message: "fetching friends failed",
      });
    }
  },

  updateFriends: async (req, res) => {
    try {
      const { friendid } = req.body; // friendid 값만 추출
      console.log("추가할 친구 ID:", friendid);

      const user = await User.findById(req.params.userId);

      if (!user) {
        return res.status(404).json({
          type: "error",
          message: "User not found",
        });
      }
      console.log("User found:", user); // 사용자 확인

      if (user.friendList.some((friend) => friend.friend_id === friendid)) {
        console.log("이미 존재하는 친구");

        return res.status(400).json({
          type: "error",
          message: "Friend already added",
        });
      }
      const friend = await updateFriends(req, res);

      return res.status(200).json({
        type: "success",
        message: "Friend updated",
        data: friend,
      });
    } catch (error) {
      console.log("catch error", error);

      res.status(500).json({
        type: "error",
        message: "fetching update failed",
      });
    }
  },

  generateGift: async (req, res) => {
    try {
      const user = await getUser(req, res);

      // 마지막 생성시간이 4시간보다 클때 생성
      const lastGeneratedAt = user.lastGiftsGeneratedAt || 0;
      if (
        Date.now() - new Date(lastGeneratedAt).getTime() > 1000 * 60 * 10 ||
        true
      ) {
        if (!user?.location?.coordinates) {
          return res.status(400).json({ type: "error" });
        }

        const [lng, lat] = user.location.coordinates; // [lng,lat] 순서 지키기
        console.log("lng", lng, "lat", lat);
        const gifts = generateRandomGifts({ lat, lng });
        user.gifts = gifts;
        user.lastGiftsGeneratedAt = new Date();
        await user.save();

        return res.status(200).json({
          type: "success",
          message: "",
          data: gifts,
        });
      } else {
        return res.status(200).json({ type: "success", message: "" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        type: "error",
        message: " generateGift failed",
      });
    }
  },

  removeGift: async (req, res) => {
    try {
      const { giftId } = req.body;
      const user = await getUser(req, res);

      const gift = user.gifts.find((v) => v._id == giftId);

      if (gift.gift == "포인트") {
        user.userPoint += gift.reward; // number
      } else if (gift.gift == "알") {
        const newEgg = new UserEgg({
          userId: user._id,
          eggId: new mongoose.Types.ObjectId(), // 고유 ID 생성
          eggType: gift.reward, // 보상 값이 eggType
          currentStep: 0,
          goalWalk: 10000, // 기본 목표 걸음 수 (필요 시 수정)
          state: "unhatched", // 초기 상태 설정
          petLink: null,
        });

        await newEgg.save();
      }
      user.gifts = user.gifts.filter((v) => v.id != giftId);

      await user.save();

      return res.status(200).json({ type: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        type: "error",
        message: " generateGift failed",
      });
    }
  },
};
