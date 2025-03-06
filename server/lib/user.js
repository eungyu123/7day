const User = require("../db/models/User");
const {
  getUser,
  updateUser,
  createUser,
} = require("../db/controllers/UserController");
const {
  generateRandomGifts,
  generateRandomEggs,
} = require("../utils/kakaomap");

module.exports = {
  getUser: async (req, res) => {
    try {
      const user = await getUser(req, res);
      // console.log(user);
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
      const friends = user.friends;
      const friendDataList = await Promise.all(
        friends.map(async (friendId) => {
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

  generateGift: async (req, res) => {
    try {
      const user = await getUser(req, res);

      // 마지막 생성시간이 4시간보다 클때 생성

      const lastGeneratedAt = user.lastGiftsGeneratedAt || 0;
      if (
        Date.now() - new Date(lastGeneratedAt).getTime() >
        1000 * 60 * 10
        // 4 * 60 * 60 * 1000
      ) {
        if (!user?.location?.coordinates) {
          return res.status(400).json({ type: "error" });
        }

        const [lng, lat] = user.location.coordinates; // [lng,lat] 순서 지키기
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

      user.userPoint += gift.reward; // number
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
