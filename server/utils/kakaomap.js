const gifts = ["포인트", "알", "쿠폰"];
const { Egg } = require("../db/models/Egg");
const Reward = require("../db/models/Reward");

module.exports = {
  generateRandomGifts: async function ({ lat, lng }) {
    const count = 20;
    const eggs = await Egg.find();
    const rewards = await Reward.find();

    const items = new Array(count).fill(0).map(() => {
      const giftType = gifts[Math.floor(Math.random() * gifts.length)];
      if (giftType === "포인트") {
        return {
          gift: "포인트",
          reward: Math.floor(Math.random() * 5) + 1,
          lat: lat + (Math.random() - 0.5) / 10,
          lng: lng + (Math.random() - 0.5) / 10,
        };
      } else if (giftType === "쿠폰") {
        const randomReward =
          rewards[Math.floor(Math.random() * rewards.length)];
        return {
          gift: "쿠폰",
          rewardId: randomReward._id.toString(),
          lat: lat + (Math.random() - 0.5) / 10,
          lng: lng + (Math.random() - 0.5) / 10,
        };
      } else {
        const randomEgg = eggs[Math.floor(Math.random() * eggs.length)];
        return {
          gift: "알",
          eggId: randomEgg._id.toString(),
          lat: lat + (Math.random() - 0.5) / 10,
          lng: lng + (Math.random() - 0.5) / 10,
        };
      }
    });

    return items;
  },
};
