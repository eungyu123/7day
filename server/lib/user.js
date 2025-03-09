const User = require("../db/models/User");
const {
  getUser,
  updateUser,
  createUser,
  updateFriends,
} = require("../db/controllers/UserController");
const {
  generateRandomGifts,
  generateRandomEggs,
} = require("../utils/kakaomap");

module.exports = {
  getUser: async (req, res) => {
    try {
      const user = await getUser(req, res);
      console.log(user);
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
      console.log("getFriends 진입");

      const user = await getUser(req, res);

      // friendlist에서 friendid 추출
      const friends = user.friendList.map((f) => f.friend_id);
      console.log("친구 목록:", friends);
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

  updateFriends: async (req, res) => {
    try {
      console.log("updateFriends 진입 성공");

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
      console.log(1);
      const friend = await updateFriends(req, res);
      // user.friendList.push({ friend_id: friendid });
      // console.log(2);

      // await user.save();
      // console.log(3);

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
