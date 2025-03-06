module.exports = {
  generateRandomGifts: function ({ lat, lng }) {
    const count = 20; // 생성 개수
    const items = new Array(count).fill(0).map(() => ({
      gift: "상자", // [ 상자 || 룰렛 ] 두가지타입을 가지고 애니메이션 진행
      reward: Math.floor(Math.random() * 5) + 1, // 1~5원 사이의 보상
      lat: lat + (Math.random() - 0.5) / 100, // -0.0005 ~ +0.0005 근처 1000M
      lng: lng + (Math.random() - 0.5) / 100, // -0.0005 ~ +0.0005 근처 1000M
    }));

    return items;
  },
  generateRandomEggs: function ({ lat, lng }) {
    const count = 20; // 생성 개수
    const items = new Array(count).fill(0).map(() => ({
      goalWalk: 5000, // [ 상자 || 룰렛 ] 두가지타입을 가지고 애니메이션 진행
      state: "봉인", // 1~5원 사이의 보상
      petLink: "",
      currentStep: 0,
      lat: lat + (Math.random() - 0.5) / 100, // -0.0005 ~ +0.0005 근처 1000M
      lng: lng + (Math.random() - 0.5) / 100, // -0.0005 ~ +0.0005 근처 1000M
    }));

    return items;
  },
};
