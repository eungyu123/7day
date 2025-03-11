const models = require("../db/models");
const { User, Egg, UserEgg, Reward } = models;
const { handleDatabaseError, handleServerError } = require("../utils/utils");
const {
  getUser,
  updateUser,
  createUser,
  updateFriends,
} = require("../db/controllers/UserController");
const { generateRandomGifts } = require("../utils/kakaomap");

//prettier-ignore
module.exports = {
  getUser: async (req, res) => {
    try {
      const user = await getUser(req, res);
      res.status(200).json({type: "success", data: user });
    } catch (error) {
      return handleServerError(req,res); 
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
      const {userId} = req.params; 
      const friends = await models.Friend.find({userId}).populate("friendId", "nickname"); 

      if(!friends.length) {
        return res.res.status(404).json({ type: "error"})
      }

      const friendList = friends.map(({friendId}) => ({
        friendId: friendId._id,
        friendName: friendId.nickname,
      }))
      return res.json({type: "success", data: friendList})
      
      } catch(error) {
        return handleServerError(req,res); 
      }
    },

  insertFiend: async(req,res) => {
    try {
      const { userId } = req.params; 
      const { friendId } = req.body; 

      const user = await models.User.findById(userId); 
      const friendUser =  await User.findById(friendId); 

      if( !user || !friendUser) {
        return handleDatabaseError(req,res); 
      }

      const existingFriend = await models.Friend.findOne({userId, friendId}); 
      if(existingFriend) {
        return handleDatabaseError(req,res); 
      }

      const newFriend = await models.Friend.create({userId, friendId}); 
      const otherNewFriend = await models.Friend.create({ userId: friendId, friendId: userId });
      return res.json({
        type:"success", 
        data: [newFriend, otherNewFriend]
      })
      } catch (error) {
        return handleServerError(req,res); 
      }
    },

  getGifts: async (req,res) => {
    try {
      const { userId } = req.params; 
      const gifts = models.Gift.find({userId})
      if(!gifts) {
        return handleDatabaseError(req,res); 
      }

      return res.json({ type: "success", data: gifts }); 
    } catch(error) {
      return handleServerError(req,res); 
    }

  }, 
  generateGift: async (req, res) => {
    try {
      const {userId} = req.params; 
      const user = await getUser(req, res);
      

      const lastGeneratedAt = user.lastGiftsGeneratedAt || 0;
      if (
        Date.now() - new Date(lastGeneratedAt).getTime() > 1000 * 60 * 10
      ) {
        if (!user?.location?.coordinates) {
          return handleDatabaseError(req,res); 
        }
        const [lng, lat] = user.location.coordinates; // [lng,lat] 순서 지키기
        if (!lng || !lat) {
          return handleDatabaseError(req,res); 
        }

        const generatedgifts = await generateRandomGifts({ lat, lng });
        const giftDocs = await Promise.all(
          generatedgifts.map( (gift) => models.Gift.create({userId, ...gift}))
        )
        user.lastGeneratedAt = new Date(); 
        await user.save(); 

        return res.status(200).json({
          type: "success",
          data: giftDocs,
        });
      } else {
        return res.status(200).json({ type: "success", message: "선물 상자 생성 쿨타임" });
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
      const { userId } = req.params;
      const { giftId } = req.body;

      const user = await getUser(req, res);
      const gift = models.Gift.findById(giftId); 
      if( !gift ) return handleDatabaseError(req, res);

      if (gift.giftType == "포인트") {
        user.userPoint += Number(gift.point);
        await user.save(); 
      } else if (gift.giftType == "쿠폰") {
        // 
        const reward = await models.Reward.findById(gift.rewardId)
        if(reward) {
          const newReward = await models.UserReward({
            userId: user._id, 
            rewardId: reward._id, 
          })
          await newReward.save(); 
        }
      } else if (gift.giftType == "알") {
        const egg = await Egg.findById(gift?.eggId);
        const newEgg = new UserEgg({
          userId: user._id,
          eggId: egg._id,
          eggType: egg.eggType,
          currentStep: 0,
          goalWalk: egg.goalWalk,
          state: "unhatched",
          petLink: "",
        });

        await newEgg.save();
      }
      await gift.deleteOne();

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
