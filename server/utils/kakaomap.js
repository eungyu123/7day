const gifts = ["포인트", "알", "쿠폰"];
const { Egg } = require("../db/models/Egg");
const Reward = require("../db/models/Reward");

module.exports = {
  generateRandomGifts: async function ({ lat, lng }) {
    const count = 100;
    const eggs = await Egg.find();
    const rewards = await Reward.find();
    const items = new Array(count).fill(0).map(() => {
      const giftType = gifts[Math.floor(Math.random() * gifts.length)];
      if (giftType === "포인트") {
        return {
          giftType,
          point: Math.floor(Math.random() * 1000) + 1,
          lat: lat + (Math.random() - 0.5) / 50,
          lng: lng + (Math.random() - 0.5) / 50,
        };
      } else if (giftType === "쿠폰") {
        const randomReward =
          rewards[Math.floor(Math.random() * rewards.length)];
        console.log(rewards, randomReward);

        return {
          giftType,
          rewardId: randomReward._id.toString(),
          lat: lat + (Math.random() - 0.5) / 50,
          lng: lng + (Math.random() - 0.5) / 50,
        };
      } else {
        const randomEgg = eggs[Math.floor(Math.random() * eggs.length)];
        return {
          giftType,
          eggId: randomEgg._id.toString(),
          lat: lat + (Math.random() - 0.5) / 50,
          lng: lng + (Math.random() - 0.5) / 50,
        };
      }
    });

    return items;
  },
};
