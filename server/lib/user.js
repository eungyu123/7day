const User = require("../db/models/User");
const { Egg, UserEgg } = require("../db/models/Egg");
const Reward = require("../db/models/Reward");
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
          console.log("friendid로 get user", friend);
          return {
            friendId: friend._id,
            friendName: friend.nickname,
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
      console.log("User found:"); // 사용자 확인

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
        if (!lng || !lat) {
          return res.status(400).json({
            type: "error",
          });
        }
        const gifts = await generateRandomGifts({ lat, lng });
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
      // console.log("user", user);
      const gift = user.gifts.find((v) => v._id == giftId);
      console.log("gift", gift);
      if (gift.giftType == "포인트") {
        user.userPoint += Number(gift.point);
      } else if (gift.giftType == "쿠폰") {
        user.rewardList.push(gift.rewardId.toString());
      } else if (gift.giftType == "알") {
        const egg = await Egg.findById(gift?.eggId);
        console.log(egg);
        const newEgg = new UserEgg({
          userId: user._id.toString(),
          eggId: egg._id.toString(),
          eggType: egg.eggType,
          currentStep: 0,
          goalWalk: egg.goalWalk,
          state: "unhatched",
          petLink: "",
        });

        const updatedEgg = await newEgg.save();
        // console.log(updatedEgg);
      }
      user.gifts = user.gifts.filter((v) => v.id != giftId);
      // console.log(user);

      const updatedUser = await user.save();

      return res.status(200).json({ type: "success" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        type: "error",
        message: "generateGift failed",
      });
    }
  },
};
