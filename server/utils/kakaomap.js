const gifts = ["포인트", "알"];
const { Egg } = require("../db/models/Egg");

module.exports = {
  generateRandomGifts: async function ({ lat, lng }) {
    const count = 20;
    const eggs = await Egg.find();

    if (!eggs) {
      console.log("!eggs");
    } else {
      console.log;
    }

    const items = new Array(count).fill(0).map(() => {
      const giftType = gifts[Math.floor(Math.random() * gifts.length)];
      if (giftType === "포인트") {
        return {
          gift: "포인트",
          reward: Math.floor(Math.random() * 5) + 1,
          lat: lat + (Math.random() - 0.5) / 100,
          lng: lng + (Math.random() - 0.5) / 100,
        };
      }
    });

    return items;
  },
};
